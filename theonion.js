// dependencies
const axios = require("axios");
const cheerio = require("cheerio");

module.exports = function (callback) {
    console.log("Scraping The Onion...");
    axios.get("https://www.theonion.com/")
        .then((response) => {
            console.log("Received " + response.status + " " + response.statusText);
            const html = response.data;

            // cheerio parses html
            const $ = cheerio.load(html);
            const items = $("div.content-wrapper");
            console.log("Found " + items.length + " items you might enjoy!");

            var localNews = [];

            var headline = items.find("section.content-meta__headline__wrapper").children("a").children("section").children("h3").text();
            console.log(headline);   
            if (!headline){
                    var headline = item.find("h1.sc-759qgu-0").text();
                    
                }

                var img_url = items.find("section.content-meta__headline__wrapper").children("a").attr("href");
                console.log("Link: ",img_url);  

                var summary= items.find("div.content-meta__excerpt").children("p").text();
                console.log("Link: ",summary);  

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
                console.log(newsItems);
            }

            callback(localNews);

        });
}