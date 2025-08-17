const express = require("express");
const router = express.Router();
let db = require('../../data/models');
let timeago = require('timeago.js');


//MAIN ROUTE
router.get('/', function(req, res){
    res.render("index");
});


//LINKS ROUTE
router.get('/links', async function(req, res){
    try {
        const links = await db.Link.findAll();
        res.render("links", {link: links, timeago: timeago});
    } catch (error) {
        console.log(error);
    }
});


//LINK ID ROUTE
router.get('/links/:id', async function(req, res){
    let link = await db.Link.findByPk(req.params.id);
    res.render('linkDetail', {link: link, timeago: timeago});
})


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
    res.redirect('/links');
});


//EDIT ROUTE
router.get('/links/edit/:id', async function(req, res){
    let linkToEdit = await db.Link.findByPk(req.params.id);
    res.render("editLink", {link: linkToEdit});
})

router.post('/links/edit/:id', async function(req, res){
    let linkToEdit = await db.Link.findByPk(req.params.id);
    if (linkToEdit){
        try{
            await db.Link.update({
                title: req.body.title,
                url: req.body.link,
                description: req.body.description
            }, {
                where: {
                    id: req.params.id
                }
            });

            res.redirect('/links');

        } catch(error){
            console.log(error);
            res.redirect(`/links/edit/${req.params.id}`);
        }
        
    } else {
        res.send("Producto no encontrado");
    }
    
});


//DELETE ROUTE
router.get('/links/delete/:id', async function(req, res){
    let linkToDelete = await db.Link.findByPk(req.params.id);
    if (linkToDelete) {
        linkToDelete.destroy();
        res.redirect("/links");
    } else {
        res.send("Producto no encontrado");
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