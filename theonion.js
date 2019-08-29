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
            const items = $("");
            console.log("Found " + items.length + " items you might enjoy!");

            var newsItems = [];

            // details from each news item
            for (var i=0; i<items.length; i++) {
                var item = $(items.get(i));
                var headline = items.find("h1").text();
                var description = item.find("p").text();
                var date = item.find(".js_meta-time").text();
                var img_url = item.find("img").attr("srcset");
                var url = item.find("js_link").attr("href");

                

                var newsItems = {
                    headline: headline,
                    description: description,
                    date: date,
                    url: url,
                    img_url: img_url,
                    comments: []
                };
                localNews.push(localNews);
            }

            callback(newsItems);

        });
}

module.exports = {
    scrape: scrape
};
