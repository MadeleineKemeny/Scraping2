const theonion = require("./suntimes");

theonion.scrape(function (newsItems) {
    console.log("Found news at Chicago Sun-Times");
    console.log(newsItems);
});
