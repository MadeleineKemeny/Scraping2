// dependencies
const express = require("express");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");
const axios = require("axios");
const cheerio = require("cheerio");

const dB = require("./models");
const app = express();

// middleware
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// templating with handlebars
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// db
const MONGODB_ONION = process.env.MONGODB_ONION || 'mongodb://localhost/theonion';
mongoose.connect(MONGODB_ONION, {useNewUrlParser: true});

// routes
app.get('/', (req, res) => {
    dB.News.find({}).sort({ date: -1 })
        .then((items) => {
            console.log(items)

            res.render('index', {
                news: items
            })

       
        })
});


app.get('/items/:id', (req, res) => {
    const id = req.params.id;
    Item.findById(id).populate("comments").exec()
        .then((item) => {
            res.render("details", item);
        });
});


app.post('/items/:id/comments', (req, res) => {
    const itemId = req.params.id;
    const commentText = req.body.text;

    Comment.create({ text: commentText, date: new Date() })
        .then((comment) => {


            return Item.findByIdAndUpdate(itemId, { $push: { comments: comment._id } }, { new: true })
        })
        .then((item) => {
            res.redirect("/items/" + itemId);
        })
});

app.delete('/items/:itemId/comments/:commentId', (req, res) => {
    const itemId = req.params.itemId;
    const commentId = req.params.commentId;

    Article.findByIdAndUpdate(itemsId, { $pull: { comments: commentId } })
        .then(() => {
            Comment.findByIdAndDelete(commentId)
                .then(() => res.sendStatus(200));
        })

});


app.get("/api/scrape", (req, res) => {


    axios.get("https://chicago.suntimes.com/").then(function(response) {

        var $ = cheerio.load(response.data);
    
        $("div.c-compact-river__entry").each(function(i, element) {
     
          var result = {};
    
   
          result.headline = $(this)
          .find("div.c-entry-box--compact__body")
          .find("h2.c-entry-box--compact__title")
          .children("a")
          .text();
          result.url = $(this)
          .find("div.c-entry-box--compact__body")
          .find("h2.c-entry-box--compact__title")
          .children("a")
          .attr("href");
    
          result.description = $(this)
          .find("div.c-entry-box--compact__body")
          .find("p.p-dek")
          .text();

          dB.News.create(result)
            .then(function(dbArticle) {
 
              console.log(dbArticle);
            })
            .catch(function(err) {
  
              console.log(err);
            });
        });
    

        res.send("Scrape Complete");
      });

});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server listening at port " + PORT));
