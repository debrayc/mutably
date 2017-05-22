// require express and other modules
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
//const  mongoose = require('mongoose')
const app = express()

// require models and seed data
const Book = require('./models/book')
const Pokemon = require('./models/pokemon')
const Album = require('./models/album')
const seedBooks = require('./seeds/books')
const seedPokemon = require('./seeds/pokemon')
const seedAlbum = require('./seeds/album')

// configure cors (for allowing cross-origin requests)
app.use(cors());

// configure bodyParser (for receiving form data)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// serve static files from public folder
app.use(express.static(__dirname + '/public'));

// set view engine to ejs
app.set('view engine', 'ejs');

// // connect to mongodb
// mongoose.connect(
//   process.env.MONGODB_URI ||
//   process.env.MONGOHQ_URL ||
//   'mongodb://localhost/mutably'
// );



/*
 * Get a single response object and 404 if it isn't found.
 * @param err {Object} Error reported from Mongo.
 * @param foundObject {Object} An Object found by Mongo.
 * @this Express Response Object
 */

function getSingularResponse (err, foundObject) {
  if (err) {
    this.status(500).json({ error: err.message });
  } else {
    if (foundObject === null) {
      this.status(404).json({ error: "Nothing found by this ID." });
    } else {
      this.status(200).json(foundObject);
      return
    }
  }
}

// API ROUTES

/*
 * BOOK API ENDPOINTS
 */

// get all books
app.get('/books', function (req, res) {
  // find all books in db
  Book.find(function (err, allBooks) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.render('books')
    }
  });
});

// create new book
app.post('/books', function (req, res) {
  // create new book with form data (`req.body`)
  var newBook = new Book(req.body);

  // save new book in db
  newBook.save(function (err, savedBook) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(201).json(savedBook);
    }
  });
  res.render('books')
});

app.get('/books/:id', function (req, res) {
  // get book id from url params (`req.params`)
  var bookId = req.params.id;

  // find book in db by id
  Book.findOne({ _id: bookId }, getSingularResponse.bind(res));
});

// update book
app.put('/books/:id', function (req, res) {
  // get book id from url params (`req.params`)
  var bookId = req.params.id;

  // find book in db by id
  Book.findOne({ _id: bookId }, function (err, foundBook) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (!foundBook){
     return res.status(404).json({ error: "Nothing found by this ID." });
    }

    // update the books's attributes
    foundBook.title = req.body.title;
    foundBook.author = req.body.author;
    foundBook.image = req.body.image;
    foundBook.releaseDate = req.body.releaseDate;

    // save updated book in db
    foundBook.save(getSingularResponse.bind(res));

  });
});

// delete book
app.delete('/books/:id', function (req, res) {
  // get book id from url params (`req.params`)
  var bookId = req.params.id;

  // find book in db by id and remove
  Book.findOneAndRemove({ _id: bookId }, getSingularResponse.bind(res));
});

/*
 * POKEMON API ENDPOINTS
 */

// get all pokemon
app.get('/pokemon', function (req, res) {
  // find all pokemon in db
  Pokemon.find(function (err, allPokemons) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ pokemon: allPokemons });
    }
  });
});

// create new pokemon
app.post('/pokemon', function (req, res) {
  // create new pokemon with form data (`req.body`)
  var newPokemon = new Pokemon(req.body);

  // save new book in db
  newPokemon.save(function (err, savedPokemon) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(201).json(savedPokemon);
    }
  });
});

// get one pokemon
app.get('/pokemon/:id', function (req, res) {
  // get pokemon id from url params (`req.params`)
  var pokemonId = req.params.id;

  // find pokemon in db by id
  Pokemon.findOne({ _id: pokemonId }, getSingularResponse.bind(res));
});

// update pokemon
app.put('/pokemon/:id', function (req, res) {
  // get pokemon id from url params (`req.params`)
  var pokemonId = req.params.id;

  // find pokemon in db by id
  Pokemon.findOne({ _id: pokemonId }, function (err, foundPokemon) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (!foundPokemon){
     return res.status(404).json({ error: "Nothing found by this ID." });
    }

    // update the pokemon's attributes
    foundPokemon.name = req.body.name;
    foundPokemon.pokedex = req.body.pokedex;
    foundPokemon.evolves_from = req.body.evolves_from;
    foundPokemon.image = req.body.image;

    // save updated pokemon in db
    foundPokemon.save(getSingularResponse.bind(res));
  });
});

// delete pokemon
app.delete('/pokemon/:id', function (req, res) {
  // get pokemon id from url params (`req.params`)
  var pokemonId = req.params.id;

  // find pokemon in db by id and remove
  Pokemon.findOneAndRemove({ _id: pokemonId }, getSingularResponse.bind(res));
});


/*
 * ALBUM API ENDPOINTS
 */

// get all albums
app.get('/albums', function (req, res) {
  // find all albums in db
  Album.find(function (err, allAlbums) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ albums: allAlbums });
    }
  });
});

// create new album
app.post('/albums', function (req, res) {
  // create new album with form data (`req.body`)
  var newAlbum = new Album(req.body);

  // save new album in db
  newAlbum.save(function (err, savedAlbum) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(201).json(savedAlbum);
    }
  });
});

app.get('/albums/:id', function (req, res) {
  // get album id from url params (`req.params`)
  var albumId = req.params.id;

  // find album in db by id
  Album.findOne({ _id: albumId }, getSingularResponse.bind(res));
});

// update album
app.put('/albums/:id', function (req, res) {
  // get album id from url params (`req.params`)
  var albumId = req.params.id;

  // find album in db by id
  Album.findOne({ _id: albumId }, function (err, foundAlbum) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (!foundAlbum){
     return res.status(404).json({ error: "Nothing found by this ID." });
    }

    // update the albums's attributes
    foundAlbum.artistName = req.body.artistName;
    foundAlbum.name = req.body.name;
    foundAlbum.releaseDate = req.body.releaseDate;
    foundAlbum.genres = req.body.genres;

    // save updated album in db
    foundAlbum.save(getSingularResponse.bind(res));

  });
});

// delete album
app.delete('/albums/:id', function (req, res) {
  // get album id from url params (`req.params`)
  var albumId = req.params.id;

  // find album in db by id and remove
  Album.findOneAndRemove({ _id: albumId }, getSingularResponse.bind(res));
});

// HOME & RESET ROUTES

app.get('/', function (req, res) {
  res.render('site/index');
});

app.get('/reset', function (req, res) {
  res.render('site/reset');
});

app.post('/reset', function (req, res) {
  Book.remove({}, function (err, removedBooks) {
    Book.create(seedBooks, function (err, createdBooks) {
      Pokemon.remove({}, function (err, removedPokemons) {
        Pokemon.create(seedPokemon, function (err, createdPokemons) {
          Album.remove({}, function (err, removedAlbums) {
            Album.create(seedAlbum, function (err, createdAlbums) {
              if (req.params.format === 'json') {
                res.status(201).json(createdBooks.concat(createdWines).concat(createdPokemons));
              } else {
                res.redirect('/');
              }
            });
          });
        });
      });
    });
  });
});


// listen on port (production or localhost)
app.listen(process.env.PORT || 3000, function() {
  console.log('server started @ 3000');
});
