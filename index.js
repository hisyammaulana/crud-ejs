const express = require('express')
const mysql = require('mysql')
const app = express()

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'noobs',
    password: 'noobs',
    database: 'ejs-crud'
});

app.get('/', (req, res) => {
    res.render('home.ejs');
})

app.get('/index', (req, res) => {
    connection.query(
        'SELECT * FROM list',
        (error, results) => {
            res.render('index.ejs', { items: results });
        }
    );
})

app.get('/new', (req, res) => {
    res.render('tambah.ejs')
})

app.post('/create', (req, res) => {
    connection.query(
        'INSERT INTO list (name) VALUES (?)',
        [req.body.itemName],
        (error, results) => {
            res.redirect('/index')
        }
    )
})

app.post('/delete/:id', (req, res) => {
    connection.query(
        'DELETE FROM list WHERE id = ?',
        [req.params.id],
        (error, results) => {
            res.redirect('/index')
        }
    )
})

app.get('/edit/:id', (req, res) => {
    connection.query(
        'SELECT * FROM list WHERE id = ?',
        [req.params.id],
        (error, results) => {
            res.render('edit.ejs', { item: results[0] });
        }
    )
})

app.post('/update/:id', (req, res) => {
    connection.query(
        'UPDATE list SET name = ? WHERE id = ?',
        [req.body.itemName, req.params.id],
        (error, results) => {
            res.redirect('/index')
        }
    )
})

app.listen(3000, console.log('server is running!'));