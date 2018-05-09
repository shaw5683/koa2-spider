const getList = require('../stats').getList;

module.exports = async ctx => {
    let list = getList();
    await ctx.render('list', {
        list,
        title: '前端'
    });
}