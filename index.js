const Koa = require('koa');
const views = require('koa-views');
const path = require('path');
const app = new Koa();
const router = require('./router');
const service = require('./service');

service.runJuejinSpider(100, 60000);

app.use(views(path.join(__dirname, './view'), {
    extension: 'ejs'
}));

app.use(router.routes()).use(router.allowedMethods());

app.listen(3000);