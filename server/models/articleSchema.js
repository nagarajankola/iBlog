const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
    articleTitle: {
        type: String,
        require: true,
    },
    articleBody:{
        type: String,
        require: true,
    },
    articleImage:{
        type: String,
        require: true,
    },
    uploadedBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'USER',
    },
    uploadedTime:{
        type: Date,
        default: Date.now,
    },
    readTime:{
        type: Number,
        required: true,
    },
    
});

const Article = new mongoose.model("Article", articleSchema);

module.exports = Article;