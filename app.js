const Koa = require('koa'),
    app = new Koa(),
    views = require('koa-views'),
    json = require('koa-json'),
    onerror = require('koa-onerror'),
    mongoose = require('mongoose'),
    bodyparser = require('koa-bodyparser'),
    logger = require('koa-logger');

const index = require('./routes/index');
const users = require('./routes/users');

const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI, {useNewUrlParser: true}, function(err) {
  if(err != null) console.log('Error:\n' + err);
});

// error handler
onerror(app);

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}));
app.use(json());
app.use(logger());
app.use(require('koa-static')(__dirname + '/public'));

app.use(views(__dirname + '/views', {
  extension: 'pug'
}));

// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// routes
app.use(index.routes(), index.allowedMethods());
app.use(users.routes(), users.allowedMethods());

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx);
});

module.exports = app;
