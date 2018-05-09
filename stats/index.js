let list = [];
let article = {};

module.exports = {
    setList (obj) {
        let id = obj.articleId;
        if (typeof article[id] === 'undefined') {
            list.unshift(JSON.parse(JSON.stringify(obj)));
            console.log(list.length)
        }
    },
    getList () {
        return JSON.parse(JSON.stringify(list));
    },
    setArticle (id, obj) {
        if (typeof article[id] === 'undefined' && typeof obj !== 'undefined') {
            article[id] = JSON.parse(JSON.stringify(obj));
        }
    },
    getArticle (id) {
        return JSON.parse(JSON.stringify(article[id]));
    }
}