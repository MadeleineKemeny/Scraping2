const suntimes = require("./suntimes");

suntimes.scrape(function (newsItems) {
    console.log("Found news at Chicago Sun-Times");
    console.log(newsItems);
});
