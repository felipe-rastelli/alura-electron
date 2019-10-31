const express = require('express');

module.exports = port => {
  const app = express();
  const linearApp = express();
  const controlIdApp = express();

  const defaultPort = port || 8080;
  
  linearApp.get('/', (req, res) => res.send('oi linear! :3'));
  linearApp.get('/bio', (req, res) => res.send('oi linear bio! :3'));

  controlIdApp.get('/', (req, res) => res.send('oi control id! :3'));

  app.use('/linear', linearApp);
  app.use('/controlid', controlIdApp);
  app.get('/', (req, res) => res.send('oi @! :3'));
  
  app.listen(defaultPort, () => console.log(`Server started listening at port: ${defaultPort}`));
};