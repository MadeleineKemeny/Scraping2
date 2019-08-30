# Scraping2

"Scraping" is a technique by which a server grabs data from another website to dynamically populate information on the native site it is serving. 

Scraping2 shows this technique by calling news from The Chicago Sun-Times by the language in which it is written (HTML), and as well as using Axios and Cheerio, a library that makes jQuery readable by servers.

The news is scraped and held in a MongoDB database; Mongoose assists in creating that database and curating that information on the fly.


## The Totality of Tech

The following languages, libraries, dependencies, databases and frameworks make this application possible:
- [Axios](https://www.npmjs.com/package/axios)
- [Bootstrap](https://getbootstrap.com/)
- [Cheerio](https://cheerio.js.org/)
- [CSS](https://en.wikipedia.org/wiki/Cascading_Style_Sheets)
- [Express](http://expressjs.com/)
- [Handlebars](http://handlebarsjs.com/)
- [HTML](https://en.wikipedia.org/wiki/HTML)
- [JavaScript](https://developer.mozilla.org/en-US/docs/Web/javascript)
- [jQuery](https://jquery.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://github.com/cesanta/mongoose)
- all the goodies that [Node.js](https://nodejs.org/en/) and those [npms](https://www.npmjs.com/) offer


## Test Drive It

1. Clone the repo to your computer.
2. Have all the bits and pieces listed above; some are actual downloads, some are simply accessed by running "npm install" in your terminal command line.
3. Next, either use the Heroku deployed site, or run it from your browser using 'http://localhost:3000'.
4. Hit the SCRAPE button
5. Click on the items you'd like to read, and you'll be directed to The Chicago Sun-Times for the full story. Additionally, under the article, there is a link to leave your personal take on the article. Hit "Submit" to leave your comment. And if you write something naughty, you can delete it! 


## Acknowledgements

Much gratitude to Phil Loy for dropping my cohort into the deep end of these projects AND helping us dog-paddle our way out. Isabel Arcones, #1 Tutor of the Digital Age, has had many helpful comments and corrections. Adarsh Bhat is a flat-out boss when it comes to writing code. Stackflow: you confuse and beguile me... sometimes helpful, sometimes not so much? Those crazy kids who developed Bootstrap get all the cake!

