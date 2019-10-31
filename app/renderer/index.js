// Fora do contexto do Node, é possível executar apenas scripts locais e funções globais 
// disponibilizadas pelo script de preload da BrowserWindow.

const msg = 'Estou executando no processo renderer, mas não tenho acesso a API Node!';

for(let i = 0; i < 2; i++) {
  console.log(msg, i);
}

const test2 = text => {
  return Promise.resolve(text);
};

const test1 = async () => {
  const text = await test2('testando 123');
  console.log(text);
};

test1();

// console.log('teste de context 3', this);
// test('aaaaaaaa uhuuuuu');

const linkConnect = document.querySelector('#link-connect');
const linkDisconnect = document.querySelector('#link-disconnect');

  linkConnect.addEventListener('click', () => {
    connectNgrok();
  });

  linkDisconnect.addEventListener('click', () => {
    disconnectNgrok();
  });