// dependencies
const axios = require("axios");
const cheerio = require("cheerio");

function scrape(callback) {
    console.log("Scraping The Onion...");
    axios.get("https://www.theonion.com/")
        .then((response) => {
            console.log("Received " + response.status + " " + response.statusText);
            const html = response.data;

            // cheerio parses html
            const $ = cheerio.load(html);
            const news = $("");
            console.log("Found " + news.length + " items you might enjoy!");

            var newsArticles = [];

            // details from each news item
            for (var i=0; i<news.length; i++) {
                var news = $(news.get(i));
                var headline = news.find("h1").text();
                var description = news.find("p").text();
                var date = news.find(".js_meta-time").text();
                var img_url = article.find("img").attr("srcset");
                var url = news.find("js_link").attr("href");

                

                var localNews = {
                    headline: headline,
                    description: description,
                    date: date,
                    url: url,
                    img_url: img_url,
                    comments: []
                };
                localNews.push(localNews);
            }

            callback(localNews);

        });
}

module.exports = {
    scrape: scrape
};
