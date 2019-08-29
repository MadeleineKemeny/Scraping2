// dependencies
const express = require("express");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");
const theonion = require("./theonion");
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
const Items = models.Items;
const Comment = models.Comment;


// routes
app.get('/', (req, res) => {
    Items.find({}).sort({ date: -1 })
        .then((items) => {
            res.render('index', {
                items: items
            })
        })
});


app.get('/items/:id', (req, res) => {
    const id = req.params.id;
    News.findById(id).populate("comments").exec()
        .then((items) => {
            res.render("details", items);
        });
});


app.post('/items/:id/comments', (req, res) => {
    const itemsId = req.params.id;
    const commentText = req.body.text;

    // to leave a comment
    Comment.create({ text: commentText, date: new Date() })
        .then((comment) => {
            // if created successfully, attach to correct item with comment's id to the items' `comments` array
            // { new: true } return the updated items (returns the original by default)

            return Items.findByIdAndUpdate(itemsId, { $push: { comments: comment._id } }, { new: true })
        })
        .then((items) => {
            res.redirect("/items/" + itemsId);
        })
});

app.delete('/items/:itemsId/comments/:commentId', (req, res) => {
    const itemsId = req.params.itemsId;
    const commentId = req.params.commentId;

    Article.findByIdAndUpdate(itemsId, { $pull: { comments: commentId } })
        .then(() => {
            Comment.findByIdAndDelete(commentId)
                .then(() => res.sendStatus(200));
        })

});


app.post("/api/scrape", (req, res) => {
    theonion.scrape(function (newsItems) {

        // add all news items to db
        News.insertMany(localNews, { ordered: false }, function (err, items) {
            if (!err) {
                console.log("Articles inserted: " + items.length);
                res.json({ count: items.length });
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
