const { pool} = require('./config');

let sortTypeFirst = "Sort";
let sortTypeLast = "Sort";

const getUser = (req, res) => {
  pool.query('SELECT * FROM users', (error, results) => {
    if (error) {
      throw error
    }
    res.render('userListing', {
      dataSet: results.rows,
      sortFirst: sortTypeFirst,
      sortLast: sortTypeLast
    })
  })
}
const addUser = (req, res) => {
  pool.query(`INSERT INTO users (first_name, last_name, email, age) VALUES ('${req.body.firstName}', '${req.body.lastName}', '${req.body.email}', '${req.body.age}')`, (error, results) => {
    if (error) {
      throw error
    }
    getUser(req, res)
  })
}
//go to edit page
const getEdit = (req, res) => {
  pool.query(`SELECT * FROM users WHERE id = ${req.params.userId}`, (err, result) => {
    if (err) {
      throw err;
    }
    res.render('edit', {
      id: req.params.userId,
      firstName: result.rows[0].first_name,
      lastName: result.rows[0].last_name,
      email: result.rows[0].email,
      age: result.rows[0].age,
    })
  })
}
const editUser = (req, res) => {
  pool.query(`UPDATE users SET first_name = '${req.body.firstName}', last_name = '${req.body.lastName}', email = '${req.body.email}', age = ${req.body.age} WHERE id = ${req.body._id}`, (error, results) => {
    if (error) {
      throw error
    }
    getUser(req, res)
  })

}
const deleteUser = (req, res) => {
  pool.query(`DELETE FROM users WHERE id = ${req.body._id}`, (err, results) => {
    if (err) {
      throw err
    }
    getUser(req, res)
  })
}
const sortFirstName = (req, res) => {
  sortTypeLast = "Sort"
  if (sortTypeFirst === 'Ascend') {
    pool.query('SELECT * FROM users ORDER BY first_name DESC', (error, results) => {
      if (error) {
        throw error
      }
      sortTypeFirst = "Descend"
      res.render('userListing', {
        dataSet: results.rows,
        sortFirst: sortTypeFirst,
        sortLast: sortTypeLast
      })
    })
  }
  else {
    pool.query('SELECT * FROM users ORDER BY first_name ASC', (error, results) => {
      if (error) {
        throw error
      }
      sortTypeFirst = "Ascend"
      res.render('userListing', {
        dataSet: results.rows,
        sortFirst: sortTypeFirst,
        sortLast: sortTypeLast
      })
    })
  }
}
const sortLastName = (req, res) => {
  sortTypeFirst = "Sort"
  if (sortTypeLast === 'Ascend') {
    pool.query('SELECT * FROM users ORDER BY last_name DESC', (error, results) => {
      if (error) {
        throw error
      }
      sortTypeLast = "Descend"
      res.render('userListing', {
        dataSet: results.rows,
        sortFirst: sortTypeFirst,
        sortLast: sortTypeLast
      })
    })
  }
  else {
    pool.query('SELECT * FROM users ORDER BY last_name ASC', (error, results) => {
      if (error) {
        throw error
      }
      sortTypeLast = "Ascend"
      res.render('userListing', {
        dataSet: results.rows,
        sortFirst: sortTypeFirst,
        sortLast: sortTypeLast
      })
    })
  }
}
const searchBar = (req, res) => {
  if (req.body.searchBar === '') {
    getUser(req, res)
  }
  else {
    pool.query(`SELECT * FROM users WHERE first_name = '${req.body.searchBar}' OR last_name = '${req.body.searchBar}'`, (error, results) => {
      if (error) {
        throw error
      }
      res.render('userListing', {
        dataSet: results.rows,
        sortFirst: sortTypeFirst,
        sortLast: sortTypeLast
      })
    })
  }
}

module.exports = {
  getUser,
  addUser,
  getEdit,
  editUser,
  deleteUser,
  sortFirstName,
  sortLastName,
  searchBar
}
