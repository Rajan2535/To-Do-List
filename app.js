const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');

const app = express();
app.set('view engine', 'ejs');
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

let newItems = [];

app.get('/', (req, res) => {
  let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  let today = new Date();
  let day = today.toLocaleDateString("en-US", options);
  res.render("list", { htmlDay: day, newListItems: newItems });
});

app.post('/', (req, res) => {
  let newItem = req.body.newItem;
  if (newItem.trim() !== '') {
    newItems.push(newItem);
  }
  res.redirect('/');
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
