
module.exports = async ctx => {
    let title = 'galigege';
    await ctx.render('index', {
        title
    })
};