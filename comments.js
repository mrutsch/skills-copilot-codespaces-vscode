//Create web server
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var Comment = require('./comment');

//GET
router.get('/', function(req, res) {
    Comment.find().exec(function(err, comments) {
        if (err) {
            res.status(500).send({error: 'Error during find comments'});
        } else {
            res.json(comments);
        }
    });
});

//POST
router.post('/', jsonParser, function(req, res) {
    if (!req.body) {
        return res.sendStatus(400);
    }
    var comment = new Comment(req.body);
    comment.save(function(err) {
        if (err) {
            res.status(500).send({error: 'Error during create comment'});
        } else {
            res.status(201).json(comment);
        }
    });
});

//DELETE
router.delete('/:id', function(req, res) {
    Comment.findByIdAndRemove(req.params.id, function(err, comment) {
        if (err) {
            res.status(500).send({error: 'Error during delete comment'});
        } else {
            res.status(200).json(comment);
        }
    });
});

//PUT
router.put('/:id', jsonParser, function(req, res) {
    if (!req.body) {
        return res.sendStatus(400);
    }
    Comment.findByIdAndUpdate(req.params.id, req.body, function(err, comment) {
        if (err) {
            res.status(500).send({error: 'Error during update comment'});
        } else {
            res.status(200).json(comment);
        }
    });
});

module.exports = router;