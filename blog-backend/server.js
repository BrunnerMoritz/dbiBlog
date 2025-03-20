require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/blogDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB verbunden")).catch(err => console.log(err));

// Schema für Blog-Einträge
const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    description: String,
    creationDate: Date,
    editDates: [Date],
    impressionCount: Number,
    content: String,
    commentsAllowed: Boolean
});

const BlogEntry = mongoose.model('BlogEntry', blogSchema, 'BlogEntries');

// API-Route: Alle Blogeinträge abrufen
app.get('/api/blogs', async (req, res) => {
    const blogs = await BlogEntry.find();
    res.json(blogs);
});

// Server starten
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server läuft auf Port ${PORT}`));
