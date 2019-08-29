const theonion = require("./the onion");

theonion.scrape(function (localNews) {
    console.log("Found local news at The Onion");
    console.log(localNews);
});
