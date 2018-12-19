 const express = require('express');
 const request = require('request');
 const router = express.Router();



 router.get('/', (req, res) => {
   res.json('yesssss');
 });


 router.post('/', (req, res) => {
   const {
     firseName,
     lastName,
     email
   } = req.body;

   console.log(req.body);
 })



 module.exports = router;