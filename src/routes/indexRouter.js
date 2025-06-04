const express = require("express");
const router = express.Router();
let db = require('../../data/models');

//MAIN ROUTE
router.get('/', function(req, res){
    res.render("index");
});


//ADD ROUTE
router.get('/add', function(req, res){
    res.render("addLink");
});

router.post('/add', async function(req, res){
    const newLink = await db.Link.create({
        title: req.body.title,
        url: req.body.link,
        description: req.body.description
    });
    res.redirect('/');
});


//LINKS ROUTE
router.get('/links', async function(req, res){
    try {
        const links = await db.Link.findAll();
        res.render("links", {links: links});
    } catch (error) {
        console.log(error);
    }
});


//LOGIN ROUTE
router.get('/login', function(req, res){
    res.render("login");
});


//REGISTER ROUTE
router.get('/register', function(req, res){
    res.render("register");
});

module.exports = router;