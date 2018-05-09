const getArticle = require('../stats').getArticle;

module.exports = async ctx => {
    let id = ctx.params.id;
    let article = getArticle(id) || {
        title: '文章丢失了！！！'
    };
    await ctx.render('article', article);
}