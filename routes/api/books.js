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
		.catch(err =>
			res.status(404).json({
				nobooksfound: 'No books found'
			})
		);
});



// @route Get api/books/creatBooks
// @desc get single book..
// @access Private route..
router.get('/:id', (req, res, next) => {
	const id = req.params.id;

	Book.findById(id)
		.then(book => res.json(book))
		.catch(err =>
			res.status(404).json({
				nobookfound: 'No book found with that ID'
			})
		);
});



// @route Delete api/books/creatBooks
// @desc get single book by user..
// @access Private route..
router.delete(
	'/:id',
	passport.authenticate('jwt', {
		session: false
	}),
	(req, res) => {
		// check to see if the user deleting is the owner of the post
		User.findOne({
			user: req.user.id
		}).then(user => {
			Book.findById(req.params.id).then(book => {
				// Check for book owner
				// if doesnt match user that is logged in
				if (book.user.toString() !== req.user.id) {
					return res.status(401).json({
						message: 'User not authorised'
					});
				}

				// Delete
				book.remove().then(() =>
					res.json({
						success: true,
						message: 'Book deleted successfully'
					})
				);
			});
		});
	}
);




// @route put api/books/creatBooks
// @desc Update book by user..
// @access Private route..
// router.put(
// 	'/id',
// 	passport.authenticate('jwt', {
// 		session: false
// 	}),
// 	(req, res, next) => {
// 		const userId = req.params.id;
// 		// find user of thr book
// 		Userprofile.findOne({ user: userId }).then(Userprofile => {
// 			const bookData = {
// 				author: req.body.author,
// 				date: req.body.date,
// 				title: req.body.title,
// 				description: req.body.description,
// 				quantity: req.body.quantity
// 			};
// 		});
// 	}
// );




// @route Post api/books/creatBooks
// @desc create new book by user..
// @access Private route..
router.post(
	'/newBook',
	passport.authenticate('jwt', {
		session: false
	}),
	(req, res, next) => {
		const { errors, isValid } = validateBookInput(req.body);

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

		console.log(req.body);

		newBook.save().then(book =>
			res.json({
				book,
				message: 'New book added'
			})
		);
	}
);



module.exports = router;
