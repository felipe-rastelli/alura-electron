const { ipcRenderer, shell } = require('electron');

document.addEventListener('DOMContentLoaded', () => {
  const linkCloseAbout = document.querySelector('#close-about');
  const externalLink = document.querySelector('#external-link');

  linkCloseAbout.addEventListener('click', () => {
    ipcRenderer.send('close-about-window');
  });

  externalLink.addEventListener('click', () => {
    shell.openExternal('https://www.alura.com.br');
  });
});