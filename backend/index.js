const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const Routes = require('./src/routes/routes')
const app = express()

require('./src/database/index')

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.urlencoded({ limit: '50mb' }));

app.use(express.json({ limit: '50mb' }));

app.use(bodyParser.json());

app.listen(3003);

app.use(cors({
  origin: '*'
}));

app.use(Routes);