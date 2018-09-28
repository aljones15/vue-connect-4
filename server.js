const express = require('express');
const path = require('path');
const port = process.env.NODE_ENV === 'production' ? 80 : 3000;
const app = express()
    app.use('/', express.static(path.join(__dirname, 'dist')));

        app.listen(port, () => {
            console.log('connect 4 is listening'); // eslint-disable-line no-console
        });


