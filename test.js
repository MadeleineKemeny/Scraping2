const theonion = require("./theonion");

theonion.scrape(function (newsItems) {
    console.log("Found local news at The Onion");
    console.log(newsItems);
});
