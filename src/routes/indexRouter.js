const express = require("express");
const router = express.Router();

router.get('/', function(req, res){
    res.render("index");
});

router.get('/add', function(req, res){
    res.render("addLink");
});

module.exports = router;