const express = require('express');
const path = require('path');
const port = process.env.PORT || 3080;
const app = express()

  app.use(express.static(path.join(__dirname, 'dist')));
  app.listen(port, () => {
     console.log('connect 4 is listening on ' + port + ' dir name is ' + __dirname); // eslint-disable-line no-console
  });
