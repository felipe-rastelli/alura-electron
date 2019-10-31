// Dentro do contexto do Node, para disponibilizar APIs para scripts do processo renderer,
// basta colocá-los dentro da variável global do Node ou window.

const { ipcRenderer } = require('electron');
const ngrok = require('ngrok');

document.addEventListener('DOMContentLoaded', () => {
  const linkAbout = document.querySelector('#link-sobre');

  linkAbout.addEventListener('click', () => {
    ipcRenderer.send('open-about-window');
  });
});

// console.log('teste de context 1', this);

// const test = text => {
//   console.log('teste de context 2', this);
//   console.log(text);

//   ipcRenderer.send('test');
// };

// global.test = test;
// window.test = test;


const test3 = text => {
  return Promise.resolve(text);
};

const test4 = async () => {
  const text = await test3('testando 1234');
  console.log(text);
};

test4();

const connectNgrok = async () => {
  try {
    const url = await ngrok.connect({
      addr: 8080,
      authtoken: '1StL3sIccfR624Uc3BGV36XA0qG_6cAMMYFdKtPjtWax3AHSK'
    });

    console.log('connected at:', url);
  } catch(err) {
    console.log('erro na conexão ngrok', err);
  }
};

const disconnectNgrok = async () => {
  try {
    await ngrok.disconnect();
    console.log('disconnected');
  } catch(err) {
    console.log('erro na desconexão ngrok', err);
  }
};

global.connectNgrok = connectNgrok;
global.disconnectNgrok = disconnectNgrok;