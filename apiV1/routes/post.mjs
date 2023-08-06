import express from 'express'
// import { nanoid } from 'nanoid'; // Generates random post ID
import { customAlphabet } from 'nanoid'; //Custom ID
const nanoid = customAlphabet('123456789', 7); //parameters Id include , Numbers Id Contain
// Importing client from mongoDb.mjs 
import { client } from './../../mongoDb.mjs'

// name of Database 
const db = client.db("CurdDb");
// we can create as many as we want collection in one Database
const col = db.collection('posts'); /// Name of Collection




let router = express.Router();

let posts = [
    {
        id: nanoid(),
        title: "Example Post Title",
        text: "Example Post Text"
    }
];



// To Create post url:api/v1/post request:post 
router.post('/post', async (req, res, next) => {
    if (
        !req.body.title
        || !req.body.text
    ) {
        res.status(403).send(
            `Required Parameter is missing 
        Example:
        {
            title: "Post Title",
            text: "Some POst Text"
        }`)
        return;
    }

    // inserting data to mongo Database / Creating new post 
    const insertResponse = await col.insertOne({
        id: nanoid(),
        title: req.body.title,
        text: req.body.text
    });
    console.log("insertResponse", insertResponse);

    res.send('Post Created');
})

// To get all post url:api/v1/posts request:get 
router.get('/posts', async (req, res, next) => {
    const cursor = col.find({});
    let result = await cursor.toArray();
    console.log("result", result);
    res.send(result);
})

// To get post with iD url:api/v1/post/:postID request:get 
router.get('/post/:postId', (req, res, next) => {
    if (!req.params.postId) {
        res.status(403).send(`Post Id must be a Number`);
        return;
    }
    for (let i = 0; i < posts.length; i++) {
        if (posts[i].id === req.params.postId) {
            res.send(posts[i]);
            return;
        }
    }

    res.send(`Can't Get Post With Id: ${req.params.postId}`);
})

// To Edit post with iD url:api/v1/post/:postID request:Edit 
router.put('/post/:postId', (req, res, next) => {
    if (!req.params.postId
        || !req.body.title
        || !req.body.text) {
        res.status(403).send(`
        Example:{
            title:"Updated Title"
            text:"Updated text"
        }
        `);
        return;
    }
    for (let i = 0; i < posts.length; i++) {
        if (posts[i].id === req.params.postId) {

            posts[i] = {
                id: nanoid(),
                title: req.body.title,
                text: req.body.text
            }
            res.send(`Post Updated with Id: ${req.params.postId}`);
            return;
        }
    }

    res.send(`Can't Find Post With Id: ${req.params.postId}`);
});

// To Delete post with iD url:api/v1/post/:postID request:delete 
router.delete('/post/:postId', (req, res, next) => {
    if (!req.params.postId) {
        res.status(403).send(`Post Id must be a Number`);
    }
    for (let i = 0; i < posts.length; i++) {
        if (posts[i].id === req.params.postId) {

            posts.splice(i, 1);
            res.send(`Post Deleted with Id: ${req.params.postId}`);
            return;
        }
    }
    res.send(`Can't Find Post With Id: ${req.params.postId}`);
});





















export default router