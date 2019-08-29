const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
    heading: String,
    description: String,
    date: Date,
    url: {
        type: String,
        unique: true
    },
    img_url: String,
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});

const News = mongoose.model("News", articleSchema);

module.exports = News;