const express = require("express");
const router = express.Router();
let db = require('../../data/models');


//MAIN ROUTE
router.get('/', function(req, res){
    res.render("index");
});


//LINKS ROUTE
router.get('/links', async function(req, res){
    try {
        const links = await db.Link.findAll();
        res.render("links", {link: links});
    } catch (error) {
        console.log(error);
    }
});


//LINK ID ROUTE
router.get('/links/:id', async function(req, res){
    let link = await db.Link.findByPk(req.params.id);
    console.log(link);
    res.render('linkDetail', {link: link});
})


//ADD ROUTE
router.get('/links/add', function(req, res){
    res.render("addLink");
});

router.post('/links/add', async function(req, res){
    const newLink = await db.Link.create({
        title: req.body.title,
        url: req.body.link,
        description: req.body.description
    });
    res.redirect('/links');
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