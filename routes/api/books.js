const express = require('express'),
	mongoose = require('mongoose'),
	jwt = require('jsonwebtoken'),
	keys = require('../../config/keys'),
	passport = require('passport'),
	Book = require('../../models/Book');

const router = express.Router();


const validateBookInput = require('../../validation/book');


// @route   GET api/books
// @desc    Get books
// @access  Public
router.get('/', (req, res, next) => {
	Book.find()
		.sort({
			date: -1
		})
		.then(books => res.json(books))
		.catch(err => res.status(404).json({
			nobooksfound: 'No books found'
		}));
});



// @route Get api/books/creatBooks
// @desc get single book..
// @access Private route..
router.get('/:id', (req, res, next) => {

	const id = req.params.id;

	Book.findById(id)
		.then(book => res.json(book))
		.catch(err => res.status(404).json({
			nobookfound: 'No book found with that ID'
		}))
});


// @route Delete api/books/creatBooks
// @desc get single book by user..
// @access Private route..
router.delete('/:id', passport.authenticate('jwt', {
	session: false
}), (req, res, next) => {
	// check to see if the user deleting is the owner of the post
	const userId = req.params.id;

	Userprofile.findOne({
			user: userId
		})
		.then(Userprofile => {
			Book.findById(req.params.id)
				.then(book => {

				})
		})
});



// @route Post api/books/creatBooks
// @desc create new book by user..
// @access Private route..
router.post('/newBook', passport.authenticate('jwt', {
	session: false
}), (req, res, next) => {

	const {
		errors,
		isValid
	} = validateBookInput(req.body);

	// Check Validation
	if (!isValid) {
		return res.status(400).json(errors);
	}

	const newBook = new Book({
		title: req.body.title,
		image: req.body.image,
		isbn: req.body.isbn,
		description: req.body.description,
		user: req.user.id
	});

	newBook.save()
		.then(book => res.json(book));
});




module.exports = router;