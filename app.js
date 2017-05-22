const express = require('express')
const app = express()
const Handlebars = require('handlebars')
const bodyParser = require('body-parser')
const exphbs = require('express-handlebars')
const path = require('path')
const cors = require('cors')

app.use(cors())

app.engine('handlebars', expshbs({ defaultLayout: 'main'}))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(express.static(__dirname + '/public'));

app.set('view engine', 'handlebars')

mongoose.connect(
  process.env.MONGODB_URI ||
  process.env.MONGOHQ_URL ||
  'mongodb://localhost/mutably'
)

let Book = require('./models/book'),
    Pokemon = require('./models/pokemon'),
    Album = require('./models/album'),
    seedBooks = require('./seeds/books'),
    seedPokemon = require('./seeds/pokemon'),
    seedAlbum = require('./seeds/album');

    const getSingularResponse = (err, foundObject) => {
      if (err) {
        this.status(500).json({ error: err.message });
      } else {
        if (foundObject === null) {
          this.status(404).json({ error: "Nothing found by this ID." });
        } else {
          this.status(200).json(foundObject);
        }
      }
    }


app.get('/books', (req, res) => {
  Book.find( (err, allBooks) => {
    if (err) {
      res.status(500).json({ error: err.message })
    } else {
      res.json({ books: allBooks })
    }
  })
})

app.post('/books', (req, res) => {
  let newBook = new Book(req.body)

  newBook.save( (err, savedBook) {
    if (err) {
      res.status(500).json({ error: err.message })
    } else {
      res.status(201).json(savedBook)
    }
  })
})

app.get('/books/:id', (req, res) => {
  let bookId = req.params.// IDEA:

  Book.findOne({ _id: bookId }), getSingularResponse.bind(res))
})

app.put('/books/:id', (req, res) => {
  let bookId = req.params.id

  Book.findOne({ _id: bookId }, (err, foundBook) {
    if (err) {
      return res.status(500).json({ error: err.message })
    if (!foundBook) {
      return res.status(404).json({ error: "Nothing found by this ID"})
    }

    foundBook.title = req.body.title
    foundBook.author = req.body.author
    foundBook.image = req.body.image
    foundBook.releaseDate = req.body.releaseDate

    foundBook.save(getSingularResponse.bind(res))
    })

  })
})
app.listen()
