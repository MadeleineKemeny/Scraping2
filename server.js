// dependencies
const express = require("express");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");
const newyorker = require("./theonion");
const models = require("./models");

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
const News = models.News;
const Comment = models.Comment;


// routes
app.get('/', (req, res) => {
    News.find({}).sort({ date: -1 })
        .then((news) => {
            res.render('index', {
                news: news
            })
        })
});


app.get('/news/:id', (req, res) => {
    const id = req.params.id;
    News.findById(id).populate("comments").exec()
        .then((news) => {
            res.render("details", news);
        });
});


app.post('/news/:id/comments', (req, res) => {
    const newsId = req.params.id;
    const commentText = req.body.text;

    // to leave a comment
    Comment.create({ text: commentText, date: new Date() })
        .then((comment) => {
            // if created successfully, attach to correct item with comment's id to the news `comments` array
            // { new: true } return the updated news -- it returns the original by default

            return News.findByIdAndUpdate(newsId, { $push: { comments: comment._id } }, { new: true })
        })
        .then((news) => {
            res.redirect("/news/" + newsId);
        })
});

app.delete('/news/:newsId/comments/:commentId', (req, res) => {
    const newsId = req.params.newsId;
    const commentId = req.params.commentId;

    Article.findByIdAndUpdate(newsId, { $pull: { comments: commentId } })
        .then(() => {
            Comment.findByIdAndDelete(commentId)
                .then(() => res.sendStatus(200));
        })

});


app.post("/api/scrape", (req, res) => {
    newyorker.scrape(function (newsArticles) {

        // add all news items to db
        News.insertMany(localNews, { ordered: false }, function (err, news) {
            if (!err) {
                console.log("Articles inserted: " + news.length);
                res.json({ count: news.length });
            }
            else if (err.result.ok) {
                // avoiding duplicates
                console.log("News items inserted: " + err.result.nInserted);
                res.json({ count: err.result.nInserted });
            }
            else {
                console.log(response);
                res.staus(500).json(response.result);
            }
        })
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server listening at port " + PORT));
