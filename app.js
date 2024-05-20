require('dotenv').config();

const express = require('express');
const path = require('path');

const port = process.env.HTTP_PORT ?? 3000;

const fuckYouCondition = 25 * 25; // maximum snake length

const app = express();

app.use(express.static(path.resolve('public')));

app.listen(port, () => console.log(`app listen on ${port}`));
