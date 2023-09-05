document.addEventListener('DOMContentLoaded', () => {
  const LOGIN_URL = 'https://bohr.io/login_app?redirect=https://terminal.bohr.io';
  const SOCKET_URL = location.href.indexOf('localhost') != -1 ? 'http://localhost:3000' : 'https://gateway.bohr.io';

  let projectData = null;

  const btOverview = document.getElementById('btOverview');
  btOverview.addEventListener('click', () => {
    if (!projectData) return;

    bohrPostMessage(projectData);
  });

  const BohrStatus = Object.freeze({
    DISCONNECTED: "Disconnected",
    CONNECTED: "Connected"
  });

  const GithubStatus = Object.freeze({
    DISCONNECTED: "Disconnected",
    STARTING: "Starting",
    CONNECTED: "Connected"
  });

  const SocketEvent = Object.freeze({
    INPUT: 'input',
    OUTPUT: 'output',
    GITHUB_STARTING: 'github_starting',
    GITHUB_CONNECTED: 'github_connected',
    GITHUB_DISCONNECTED: 'github_disconnected',
    CONNECT: 'connect',
    DISCONNECT: 'disconnect'
  });

  const typingSound = new Audio('/terminal/typing.mp3');
  typingSound.preload = 'auto';
  typingSound.volume = 1;

  class TerminalManager {
    constructor(id, token) {
      this.isBohrStatus = BohrStatus.DISCONNECTED;
      this.isGHStatus = GithubStatus.DISCONNECTED;
      this.id = id;
      this.token = token;
      this.setupTerminal();
    }

    setupTerminal() {
      this.terminal = new Terminal({
        cursorBlink: true,
        fontSize: 20,
        scrollback: 5000,
        rows: 20
      });
      const fitAddon = new FitAddon.FitAddon();
      const webLinksAddon = new WebLinksAddon.WebLinksAddon();
      this.terminal.loadAddon(fitAddon);
      this.terminal.loadAddon(webLinksAddon);
      /*
      const matcherId = this.terminal.registerLinkMatcher(/No/g, (event, uri) => {
        event.preventDefault();
        console.log('No');
      });
      this.terminal.deregisterLinkMatcher(matcherId);
      */
      this.terminal.open(document.getElementById('terminal'));
      fitAddon.fit();
    }

    setupSocket() {
      this.messageQueue = [];
      this.messageId = 0;          

      this.socket = io(SOCKET_URL, {
        auth: {
          type: 'client',
          room: this.id,
          token: this.token
        },
        rejectUnauthorized: false
      });

      this.terminal.onData((data) => {
        this.socketEmit(SocketEvent.INPUT, data);
      });

      this.handleSocketEvents();
    }

    handleSocketEvents() {
      this.socket.on('stats', (data) => {
        //console.log(data);
      });

      this.socket.on('set_cmd', (data) => {
        this.setCMD(data);
      });

      this.socket.on('ask_to_install', (data) => {
        document.getElementById('installBox').classList.add('show');
      });

      this.socket.on('close_install', (data) => {
        document.getElementById('installBox').classList.remove('show');
      });

      this.socket.on('show_overview', (data) => {
        projectData = data;
        btOverview.classList.remove('hide');
      });

      this.socket.on('messageReceived', (id) => {
        this.messageQueue = this.messageQueue.filter(message => message.id !== id);
      });

      this.socket.on(SocketEvent.OUTPUT, (data) => {
        this.terminal.write(data);
      });

      this.socket.on(SocketEvent.GITHUB_STARTING, () => {
        this.isGHStatus = GithubStatus.STARTING;
        this.updateStatus();
      });

      this.socket.on('server_error', (data) => {
        if (data == 401) {
          location.href = LOGIN_URL;
        }
        if (data == 500) {
          alert('Ops, we have a problem!');
        }
      });

      this.socket.on(SocketEvent.GITHUB_CONNECTED, () => {
        this.isGHStatus = GithubStatus.CONNECTED;
        this.updateStatus();
        this.terminal.focus();
      });

      this.socket.on(SocketEvent.GITHUB_DISCONNECTED, () => {
        this.isGHStatus = GithubStatus.DISCONNECTED;
        this.updateStatus();
        //this.terminal.write('\r\n');
      });

      this.socket.on(SocketEvent.CONNECT, () => {
        this.isBohrStatus = BohrStatus.CONNECTED;
        this.updateStatus();
        this.terminal.focus();
      });

      this.socket.on(SocketEvent.DISCONNECT, () => {
        this.isBohrStatus = BohrStatus.DISCONNECTED;
        this.isGHStatus = GithubStatus.DISCONNECTED;
        this.updateStatus();
        //this.terminal.write('\r\n');
      });
    }

    setCMD(cmds) {
      document.getElementById('cmdBox').innerHTML = '';
      for (let i = 0; i < cmds.length; i++) {
        const link = document.createElement('a');
        link.href = 'javascript:;';
        link.dataset.cmd = cmds[i].cmd;
        link.textContent = cmds[i].text;
        document.getElementById('cmdBox').appendChild(link);
      }
      document.getElementById('cmdBox').style.display = 'block';
  
      document.querySelectorAll('#cmdBox a[data-cmd]').forEach((item) => {
        item.addEventListener('click', (e) => {
          const command = e.target.dataset.cmd + '\n';
          let index = 0;
          typingSound.currentTime = 0;
          typingSound.volume = 0.3;
          typingSound.play();
          const typeLetter = () => {
            if (index < command.length) {
              this.socketEmit(SocketEvent.INPUT, command[index]);
              index++;
              if (command.length - index <= 5) {
                typingSound.volume -= 0.05;
              }
            }
            if (index === command.length) {
              typingSound.pause();
              this.terminal.focus();
              document.getElementById('cmdBox').style.display = 'none';
            } else {
              setTimeout(typeLetter, 50);
            }
          };
          setTimeout(typeLetter, 100);
          //typeLetter();
        });
      });
    }

    socketEmit(event, data) {
      const message = {
        id: this.messageId++,
        event,
        data
      };
      this.messageQueue.push(message);
      if (this.socket.connected) {
        this.socket.emit('message', message);
      }
    }

    updateStatus() {
      document.getElementById('bohr-status').innerHTML = this.isBohrStatus;
      document.getElementById('gh-status').innerHTML = this.isGHStatus;
    }
  }

  const urlParams = new URLSearchParams(window.location.search);      
  let token = urlParams.get('token');
  if (token) {
    localStorage.setItem('token', token);
    history.pushState(null, '', '/');
  } else {
    token = localStorage.getItem('token');
  }
  const id = crypto.randomUUID();

  const terminalManager = new TerminalManager(id, token);

  if (token) {
    terminalManager.setupSocket();

    document.getElementById('btTurnOff').addEventListener('click', function () {
      terminalManager.socketEmit('terminate');
    });

    document.getElementById('btBoost').addEventListener('click', function () {
      terminalManager.socketEmit('boost');
    });

  } else {
    let data = '';
    data += atob('G1s/MjAwNGgbWzE7OTdtYm9lbWVrZWxkG1swbRtbMTs5Mm1AG1swbRtbMTszM21ib2hyLmlvG1swbRtbMTs5NG06G1sxOzk1bS9hcHAbWzE7OTZtJCAbWzBtZWNobyAiSGVsbG8gV29ybGQiID4gaW5kZXguaHRtbA0KG1s/MjAwNGwNG1s/MjAwNGgbWzE7OTdtYm9lbWVrZWxkG1swbRtbMTs5Mm1AG1swbRtbMTszM21ib2hyLmlvG1swbRtbMTs5NG06G1sxOzk1bS9hcHAbWzE7OTZtJCAbWzBtbnB4IGJvaHIgZGVwbG95DQobWz8yMDA0bA0NChtbN20bWzFtG1szNG0gQ0hBTkdFIBtbMzltG1syMm0bWzI3bSAgIBtbMzRtVXNpbmcgQVBJIGF0OiAbWzMxbWh0dHBzOi8vYm9oci5pbxtbMzltG1szNG0bWzM5bSANCg0KG1s3bRtbMW0bWzMzbSBXRUxDT01FIBtbMzltG1syMm0bWzI3bSAgIBtbMzNtTGV0J3MgZGVwbG95IGl0IS4uLhtbMzltIA0KDQobWzdtG1sxbRtbMzJtIFNVQ0NFU1MgG1szOW0bWzIybRtbMjdtICAgG1szMm1BUEkgZnVuY3Rpb24gdXBsb2FkZWQgc3VjY2Vzc2Z1bGx5LhtbMzltIA0KDQobWzdtG1sxbRtbMzNtIFJVTk5JTkcgG1szOW0bWzIybRtbMjdtICAgG1szM21VcGxvYWRpbmcgZmlsZXMuLi4bWzM5bSANCg0KG1s3bRtbMW0bWzMybSBTVUNDRVNTIBtbMzltG1syMm0bWzI3bSAgIBtbMzJtRmlsZXMgdXBsb2FkZWQgc3VjY2Vzc2Z1bGx5LhtbMzltIA0KDQobWzdtG1sxbRtbMzNtIFJVTk5JTkcgG1szOW0bWzIybRtbMjdtICAgG1szM21EZXBsb3lpbmcgeW91ciBzaXRlLi4uG1szOW0gDQoNChtbN20bWzFtG1szMm0gIERPTkUgIBtbMzltG1syMm0bWzI3bSAgIBtbMzJtU2l0ZSBkZXBsb3llZCBzdWNjZXNzZnVsbHk6IBtbMzRtaHR0cHM6Ly9hcHAtYm9lbWVrZWxkLmJvaHIuaW8bWzM5bRtbMzJtG1szOW0gDQoNChtbPzIwMDRoG1sxOzk3bWJvZW1la2VsZBtbMG0bWzE7OTJtQBtbMG0bWzE7MzNtYm9oci5pbxtbMG0bWzE7OTRtOhtbMTs5NW0vYXBwG1sxOzk2bSQgG1swbQ==');
    terminalManager.terminal.write(data);
    document.getElementById('loginBox').classList.add('show');
    document.getElementById('btLogin').addEventListener('click', function () {
      location.href = LOGIN_URL;
    });
  }

  document.getElementById('btClose').addEventListener('click', function () {
    document.getElementById('installBox').classList.remove('show');
    terminalManager.terminal.focus();
  });

  document.querySelector('textarea').addEventListener('blur', function(event) {
    //terminalManager.terminal.focus();
  });

  terminalManager.terminal.focus();

  //if (location.href.indexOf('localhost') != -1) document.getElementById('localhost').style.display = 'block';
});

function bohrPostMessage(message) {
  const acceptedTopOrigins = [
    'http://localhost',
    'https://localhost:444',
    'https://bohr.rocks',
    'https://cl2hz21040083qsvdzokaxsko.bohr.live',
    'https://bohr.io',
  ];

  if (!acceptedTopOrigins.includes(window.top.origin)) return;

  window.top.postMessage(message, window.top.origin);
}