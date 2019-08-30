// dependencies
const axios = require("axios");
const cheerio = require("cheerio");

module.exports = function (callback) {
    console.log("Scraping Chicago Sun-Times...");

   
    axios.get("https://chicago.suntimes.com/")
        .then((response) => {
            console.log("Received " + response.status + " " + response.statusText);
            const html = response.data;

            const $ = cheerio.load(html);

            var localNews = [];
            var newsItems={};
            $("div.content-wrapper").each(function(i,element){

                newsItems.headline = $(this).find("section.content-meta__headline__wrapper").children("a").children("section").children("h3").text();
            console.log( newsItems.headline );   
         

            newsItems.url = $(this).find("section.content-meta__headline__wrapper").children("a").attr("href");
                console.log("Link: ", newsItems.url);  

                newsItems.description= $(this).find("div.content-meta__excerpt").children("p").text();
                console.log("Link: ",  newsItems.description);  
                
                localNews.push(newsItems);

           })

            callback(localNews);

        });
     
}