const express = require('express');
let books = require("./booksdb.js");
const { restart } = require('nodemon');
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
  
    if (username && password) {
      if (!isValid(username)) { 
        users.push({"username":username,"password":password});
        return res.status(200).json({message: "User successfully registred. Now you can login"});
      } else {
        return res.status(404).json({message: "User already exists!"});    
      }
    } 
    return res.status(404).json({message: "Unable to register user."});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  res.send(JSON.stringify(users,null,4))
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', async function (req, res) {
  //Write your code here
  try {
    const isbn = req.params.isbn;
    return res.send(books[isbn])
  } catch (error) {
    console.log(error)
  }

 });
  
// Get book details based on author
public_users.get('/author/:author',async function (req, res) {
      try {
        const author = req.params.author;
        for (const [key, value] of Object.entries(books)) {
            if(value.author === author) {
                return res.send(value)
            } 
          }
      } catch (error) {
        console.log(error)
      }
    
});

// Get all books based on title
public_users.get('/title/:title',async function (req, res) {
  //Write your code here

    try {
        const title = req.params.title;
        for (const [key, value] of Object.entries(books)) {
            if(value.title === title) {
                return res.send(value)
            } 
          }
      } catch (error) {
        console.log(error)
      }
});

//  Get book review
public_users.get('/review/:isbn',async function (req, res) {
  //Write your code here

  try {
    const isbn = req.params.isbn;
    return res.send(books[isbn].reviews)
  } catch (error) {
    console.log(error)
  }
  
});

module.exports.general = public_users;
