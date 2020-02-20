const express = require('express');
const path = require('path');
const { PORT } = require('./config');
const db = require('./userManager')

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.get('/', (req, res) => {res.render('index')})
app.post('/user', (req, res) => {
  if (req.body.button === 'edit') {
    db.editUser(req,res)
  }
  else if (req.body.button === 'delete') {
    db.deleteUser(req, res)
  }
  else if (req.body.button === 'create') {
    db.addUser(req, res)
  }
  else if (req.body.button === 'search') {
    db.searchBar(req, res)
    // return
  }
  else if (req.body.button === 'sortFirst') {
    db.sortFirstName(req, res)
    // return
  }
  else if (req.body.button === 'sortLast') {
    db.sortLastName(req, res)
    // return
  }
  // db.getUser(req, res)
})
app.get('/user', db.getUser);
app.get('/edit/:userId', db.getEdit);


app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`)
})
