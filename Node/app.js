const Router = require('./routes');
const express = require('express');
const app = express();
const port = 3001;

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization,Content-Type,Accept');
    res.header('Access-Control-Allow-Methods', '*');
    next();
});
app.use(express.json());
app.use(Router);


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});