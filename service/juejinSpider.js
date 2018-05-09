const request = require('superagent');
const stats = require('../stats');
const cheerio = require('cheerio');

const getList = (times, rankIndex) => {
    let queryObj = {
        src: 'web',
        limit: '20',
        category: '5562b415e4b00c57d9b94ac8'
    };
    if (rankIndex) {
        queryObj.before = rankIndex;
    }
    request
        .get('https://timeline-merger-ms.juejin.im/v1/get_entry_by_rank')
        .query(queryObj)
        .end((err, res) => {
            try {
                res.text = JSON.parse(res.text);
                res.text.d.entrylist.forEach((item, index) => {
                    let authur = item.authur,
                        title = item.title,
                        summary = item.summaryInfo,
                        articleId = item.objectId,
                        url = item.originalUrl,
                        tags = item.tags;
                    request
                        .get(item.originalUrl)
                        .end((err, res) => {
                            if (res) {
                                const $ = cheerio.load(res.text);
                                let obj = {
                                    title: $('.article-title').html(),
                                    content: $('.article-content').html()
                                };
                                stats.setList({
                                    authur,
                                    articleId,
                                    title,
                                    summary,
                                    url,
                                    tags
                                });
                                stats.setArticle(item.objectId, obj);
                            }
                        });
                });
                if (times > 0) {
                    times--;
                    rankIndex = res.text.d.entrylist[res.text.d.entrylist.length - 1].rankIndex;
                    getList(times, rankIndex);
                }
            } catch (err) {
                getList(times, rankIndex);
            }
        });
};

module.exports = times => {
    getList(times);
};