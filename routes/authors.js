const express = require("express");
const Author = require("../models/author");

const router = express.Router();
// All Authors Route
router.get("/", async(req, res) => {

  let searchOptions = {}
  if(req.query.name != null && req.query.name !== ''){
    searchOptions.name = new RegExp(req.query.name,'i')
  }

try{
const authors = await Author.find(searchOptions)
res.render("authors/index",{
  authors: authors,
  searchOptions: req.query
});
}
catch{
 res.redirect('/')
}

 
});

router.get("/new", (req, res) => {
  res.render("authors/new", { author: new Author() });
});

router.post("/", async (req, res) => {
  const author = new Author({
    name: req.body.name,
  });

  try {
    const newAuthor = await author.save();
    res.redirect("authors");
  } catch {
    res.render("authors//new", {
      author: author,
      errorMessage: "error creating user",
    });
  }
  // author.save((err, newAuthor) =>{
  //     if(err){
  //         res.render('authors/new',{
  //             author: author,
  //             errorMessage: 'Error Creating Author'
  //         })
  //     }
  //     else {
  //         res.redirect('authors')
  //     }
  // })
  // res.send(req.body.name)
});

module.exports = router;
