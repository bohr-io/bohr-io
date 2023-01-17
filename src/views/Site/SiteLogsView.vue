<template>
  <main>
    <SiteContextSelector @change="changeContext" />
    <div class="actions-log__container">
      <button type="button" @click="exportLog" :disabled="logLines.length === 0">
        {{ $t('logs.exportLog') }}
      </button>
      <button type="button" @click="clearLog">
        {{ $t('logs.clearLog') }}
      </button>
    </div>
    <BohrBox class="log__table__container">
      <table class="log__table">
        <colgroup>
          <col span="1" class="message__coll">
          <col span="1" class="info__col">
        </colgroup>
        <thead>
          <tr class="log__row">
            <th class="table__cell__head">
              <BohrTypography variant="title4">
                {{ $t('common.message') }}
              </BohrTypography>
            </th>
            <th class="table__cell__head">
              <BohrTypography variant="title4">
                {{ $t('logs.fileLineTitle') }}
              </BohrTypography>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="lineData in logLines.slice().reverse()" :key="`${lineData.message} - ${lineData.time}`" class="log__row">
            <th class="table__cell__body" :class="'message--' + lineData.type">
              <BohrTypography variant="body1" :color="getMessageColor(lineData.type)">
                <pre>{{ lineData.message }}</pre>
              </BohrTypography>
            </th>
            <td class="table__cell__body">
              <BohrTypography variant="body1" color="hsla(0, 0%, 100%, 0.36)">
                {{ lineData.line }}
              </BohrTypography>
              <BohrTypography variant="body1" color="hsla(0, 0%, 100%, 0.36)">
                {{ lineData.time }}
              </BohrTypography>
            </td>
          </tr>
        </tbody>
      </table>
    </BohrBox>
  </main>
</template>

<script lang="ts">
import BohrBox from '@/components/BohrBox.vue';
import BohrTypography from '@/components/BohrTypography.vue';
import SiteContextSelector from '@/components/SiteContextSelector.vue';
import { DeployGroup } from '@/types';
import { defineComponent } from 'vue';

type LineData = {
  message: string;
  line: string;
  time: string;
  type: 'text' | 'warn' | 'error';
};

export default defineComponent({
  components: {
    BohrBox,
    BohrTypography,
    SiteContextSelector,
  },
  data() {
    return {
      ws: null as null | WebSocket,
      rejoined: false,
      startTime: 0,
      rejoinTimeout: null as null | number,
      logLines: [] as LineData[],
      selectedContext: {} as DeployGroup,
    }
  },
  beforeUnmount() {
    this.clearWebSocketListeners();
    if (this.rejoinTimeout !== null) clearTimeout(this.rejoinTimeout);
  },
  methods: {
    changeContext(newContextId: string) {
      this.selectedContext = this.$store.getters['site/deployGroup'].find((group: DeployGroup) => {
        return group.id === newContextId;
      });
      this.logLines = this.getCurrentLogLines();
      if (!this.ws) this.webSocketJoin();
      else this.webSocketSubscribe();
    },

    getMessageColor(messageType: LineData['type']) {
      const messageColorByType = {
        'text': 'hsla(0, 0%, 100%, 1)',
        'warn': 'hsla(47, 89%, 59%, 1)',
        'error': 'hsla(355, 78%, 60%, 1)',
      };

      return messageColorByType[messageType];
    },

    webSocketJoin() {
      this.initializeData();

      this.ws?.addEventListener("open", this.webSocketOpenListener);
      this.ws?.addEventListener("message", this.webSocketMessageListener);
      this.ws?.addEventListener("close", this.webSocketCloseListener);
      this.ws?.addEventListener("error", this.webSocketErrorListener);
    },

    clearWebSocketListeners() {
      this.ws?.removeEventListener("open", this.webSocketOpenListener);
      this.ws?.removeEventListener("message", this.webSocketMessageListener);
      this.ws?.removeEventListener("close", this.webSocketCloseListener);
      this.ws?.removeEventListener("error", this.webSocketErrorListener);
    },

    initializeData() {
      // const localWs = 'ws://localhost:8787/bohr_get_log';
      const devWs = 'wss://bohr.rocks/bohr_get_log';
      const prodWs = 'wss://bohr.io/bohr_get_log';

      const wsUrl = !location.hostname.includes('bohr.io') ? devWs : prodWs;
      this.ws = new WebSocket(wsUrl);
      this.rejoined = false;
      this.startTime = Date.now();
    },

    rejoin() {
      if (this.rejoined) return;

      this.rejoined = true;
      this.ws = null;
      const timeSinceLastJoin = Date.now() - this.startTime;
      const timer = timeSinceLastJoin < 10000 ? 10000 - timeSinceLastJoin : 0;
      this.rejoinTimeout = setTimeout(this.webSocketJoin, timer);
    },

    webSocketOpenListener() {
      this.webSocketSubscribe();
    },

    async webSocketSubscribe() {
      const projectData = {
        type: 'subscribe',
        message: {
          org: this.$route.params.org,
          site: this.$route.params.project,
          dgType: this.selectedContext.type.toLowerCase(),
          dgName: this.selectedContext.name,
        }
      };
      const parser = await import('engine.io-parser');
      parser.encodePacket({
        type: "message",
        data: JSON.stringify(projectData),
        options: { compress: true }
      }, true, async (encoded: any) => {
        this.ws?.send(encoded);
      });
    },

    webSocketMessageListener(e: any) {
      if (e.data && e.data != 0) {
        let wsData = JSON.parse(e.data);
        const lineData = {
          message: wsData.message,
          line: wsData.logLineNumber,
          time: this.formatDateString(wsData.timestamp),
          type: wsData.consoleType,
        };
        this.logLines.push(lineData);
        this.storeCurrentLogLines();
      }
    },

    webSocketCloseListener(e: any) {
      console.log("WebSocket closed, reconnecting:", e.code, e.reason);
      this.rejoin();
    },

    webSocketErrorListener(e: any) {
      console.log("WebSocket error:", e);
      this.rejoin();
    },

    formatDateString(timestamp: number) {
      if (!Number.isInteger(timestamp)) return '';
      const date = new Date(timestamp);
      const seconds = date.getSeconds().toString().padStart(2, '0');
      const minute = date.getMinutes().toString().padStart(2, '0');
      const hour = date.getHours().toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear().toString();
      return `${year}/${month}/${day} ${hour}:${minute}:${seconds}`;
    },

    clearLog(){
      this.logLines = [];
      localStorage.removeItem(this.getCurrentLogId());
    },

    exportLog() {
      const logTextData = this.logLines.map(lineData => `${lineData.time}  ${lineData.line}  ${lineData.message}`).join("\r\n");
      this.saveLogsAs(`bohr-${this.getCurrentLogId()}.txt`, logTextData);
    },

    saveLogsAs(filename: string, data: string) {
      const blob = new Blob([data], {type: 'text/plain'});
      const elem = window.document.createElement('a');
      elem.href = window.URL.createObjectURL(blob);
      elem.download = filename;        
      document.body.appendChild(elem);
      elem.click();
      window.URL.revokeObjectURL(elem.href);        
      document.body.removeChild(elem);
    },

    getCurrentLogId() {
      return `logs__[${this.$route.params.org}][${this.$route.params.project}][${this.selectedContext.type.toLowerCase()}][${this.selectedContext.name}]`;
    },

    getCurrentLogLines() {
      try {
        const storedItem = localStorage.getItem(this.getCurrentLogId());
        const cachedLogs = storedItem && JSON.parse(storedItem);
        return Array.isArray(cachedLogs) ? cachedLogs : [];
      } catch (ex) {
        console.error(ex);
        return [];
      }
    },

    storeCurrentLogLines() {
      localStorage.setItem(this.getCurrentLogId(), JSON.stringify(this.logLines));
    }
  }
})
</script>

<style scoped>
.log__table__container {
  width: 100%;
  margin-top: 8px;
  padding: 24px 32px 8px;
  box-sizing: border-box;
}

.log__table {
  width: 100%;
  border-collapse: collapse;
}

.info__col {
  width: 50ch;
}

.log__row {
  border-bottom: 2px solid hsl(0, 0%, 100%, 0.1);
}

tbody::before {
  content: '';
  display: table-row;
  height: 8px;
}

tbody>.log__row:last-child {
  border-bottom: none;
}

[class*="table__cell__"] {
  box-sizing: border-box;
}

[class*="table__cell__"]:first-child {
  text-align: start;
}

[class*="table__cell__"]:last-child {
  text-align: end;
}

.table__cell__head {
  padding-bottom: 10px;
  padding-inline: 8px;
}

.table__cell__body {
  position: relative;
  padding-block: 16px;
  padding-inline: 8px;
}

.log__row:first-child>.table__cell__body {
  margin-top: 24px;
}

.message--warn::before,
.message--error::before {
  --log-img: url();
  content: '';
  display: inline-block;
  position: absolute;
  top: 50%;
  left: -46px;
  transform: translateY(-50%);
  width: 24px;
  height: 24px;
  border-radius: 999px;
  background-image: var(--log-img), linear-gradient(180deg, #172026 0%, #16181F 100%);
  background-repeat: no-repeat;
  background-position: center;
  background-origin: border-box;
  border: 1px solid hsla(0, 0%, 100%, 0.1);
  box-shadow: 0px 4px 8px hsla(0, 0%, 0%, 0.24);
}

.message--warn::before {
  --log-img: url(/assets/svg/log-warn.svg);
}

.message--error::before {
  --log-img: url(/assets/svg/log-error.svg);
}

.actions-log__container{
  display: flex;
  gap: 16px;
  margin-top: 16px;
}

.actions-log__container button {
  all: unset;
  color: hsl(181, 69%, 61%);
  cursor: pointer;
}

.actions-log__container button:not(:disabled):hover {
  text-decoration: underline;
}

.actions-log__container button:disabled {
  opacity: 25%;
  cursor: not-allowed;
}
</style>
