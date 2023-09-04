<template>
  <iframe class="editor__iframe" :src="editorUrl"></iframe>
</template>

<script setup lang="ts">
import { io } from "socket.io-client";
import { ref } from "vue";
import { useRoute } from "vue-router";

const editorUrl = ref('');

class SocketManager {
  repo: string
  user: string
  token: string
  messageQueue: any[]
  messageId: number
  socket: ReturnType<typeof io> | null

  constructor(repo: string, user: string, token: string) {
    this.repo = repo;
    this.user = user;
    this.token = token;
    this.messageQueue = [];
    this.messageId = 0;
    this.socket = null
  }

  static getSocketUrl() {
    return 'https://gateway.bohr.io';
  }

  initializeApplication() {
    this.token = '857494e925c420c6db3d53ac4c36fed8be5d453577650944b85a68f9ae8a2204';
    this.repo = 'core';
    this.user = 'bohr-io';
    
    const socketOptions = {
      auth: {
        type: 'dash',
        repo: this.repo,
        user: this.user,
        token: this.token,
      },
      rejectUnauthorized: false,
    };

    this.socket = io(SocketManager.getSocketUrl(), socketOptions);
    
    this.socket.on('messageReceived', (id) => {
      this.messageQueue = this.messageQueue.filter(message => message.id !== id);
    });
    
    this.socket.on('server_starting', () => {
      console.log('server_starting');
    });

    this.socket.on('server_started', (url) => {
      console.log('server_started');
      editorUrl.value = url;
    });

    this.socket.on('server_error', (data) => {
      console.error('Server Error:', data);
    });
  }

  emitMessage(event: any, data: any) {
    const message = {
      id: this.messageId++,
      event,
      data,
    };

    this.messageQueue.push(message);
    
    if (this.socket && this.socket.connected) {
      this.socket.emit('message', message);
    }
  }
}

const route = useRoute();
const org = route.params.org as string;
const project = route.params.project as string;
const token = document.cookie.split(';').find((c) => c.trim().match(/^BohrSession/))?.split('=')[1] || '';

const editorApp = new SocketManager(project, org, token);
editorApp.initializeApplication();
</script>

<style>
.editor__iframe {
  width: 100%;
  height: 100%;
  border: none;
}
</style>