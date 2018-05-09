const Router = require('koa-router');
const router = new Router();
const hello = require('../controller/hello');
const articleList = require('../controller/articleList');
const article = require('../controller/article');

router.get('/', hello);

router.get('/frontend', articleList);

router.get('/article/:id', article);

module.exports = router;