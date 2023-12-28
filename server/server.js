const Koa = require('koa');
const app = new Koa();
const serve = require('koa-static');
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');

const { OAuth2Client } = require("google-auth-library");
const jwt = require("jsonwebtoken");

const router = require('./router.js');
const PORT = 3001; // react could be using port 3000 change if needed

app.use(serve(__dirname));
app.use(bodyParser());
app.use(cors());

app.use(router.routes()); // this will fail until router has been created

app.listen(PORT, (error) => {
  if (error) console.error(error);
  else console.log(`I am a server. I live on http://localhost:${PORT}`); // eslint-disable-line no-console
});
