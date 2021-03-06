# CRUD Mutably

# Instructions

- npm istall
- npm start

## Description

[Mutably](http://mutably.herokuapp.com/) is a mutable, RESTful, CRUD API. This means that it has endpoints that you can interact with RESTfully via a front-end.

Visit the repo page for information about the resources available and how to interact with them: [https://github.com/GuildCrafts/mutably](https://github.com/GuildCrafts/mutably)

Your goal is to build a front-end that consumes the Mutably API. You can choose any one of the 3 resources. You front-end needs to complete all of the CRUD (Create, Read, Update, Delete) functions.

For the goal, you will start with [this scaffolded template](https://github.com/GuildCrafts/mutably-starter). Fork to get started.
You will use jQuery to complete this goal.

## Context

Interacting with a third-party API is a key skill for any developer. Most APIs have extensive documentation and require a fair amount of "overhead" just to get started working with them.

Not Mutably. This API is _way_ simpler, with just a few _endpoints_ handling a few different _resources_.

This goal is designed as an introduction to working with third-party APIs so that you can familiarize yourself with the core ideas before moving on to work with bigger, more complex APIs (like GitHub or Twitter).

## Specifications

- [x] __5:__ Your repo is a fork of [mutably-starter](https://github.com/GuildCrafts/mutably-starter).
- [x] __5:__ Your repo has a README with instructions for how to run your project.
- [x] __15:__ Your app is SPA (single page app). All CRUD actions take place on the same page, preferably the root (`/`) route.
- [ ] __10:__ All interaction with the API happens with jQuery's AJAX function -- don't submit data via forms. You can use `form` html tags, but do all your form submission in your `js`. Make use of jQuery's `event.preventDefault()`.
- [ ] __15:__ A user can read and display all the data for a resource.
- [ ] __10:__ A user can create a new item via a create form. When the user creates a new item, that item should either get appended to the page or all the items should get re-retrieved in the `js`. No full page refresh.
- [ ] __10:__ A user can update an existing item. Updating happens inline. This means that there is an edit button next to each item that, when clicked, the item text gets replaced with an pre-populated editable, input field. And the edit button becomes a save button. Once the save button is clicked and success message comes back from the server, then then input gets replaced with the updated text. No page refresh.
  For example, this: <br>
  <img width="229" alt="screen shot 2017-05-11 at 3 26 09 pm" src="https://cloud.githubusercontent.com/assets/3010270/25974508/4ac57980-365e-11e7-8b1f-6cf9eefaac22.png">
  <br>
  becomes:
  <br>
  <img width="253" alt="screen shot 2017-05-11 at 3 26 18 pm" src="https://cloud.githubusercontent.com/assets/3010270/25974512/5024433e-365e-11e7-802f-c60afacddecd.png">
  <br>
  When the user clickes the edit button.
- [ ] __10:__ A user can delete an existing item via a delete button next to each item. No page refresh.
- [ ] __10:__ Use a UI library to make your site look nice.
- [ ] __5:__ The artifact produced is properly licensed, preferably with the MIT license.
- [ ] __5:__ App is deployed on Heroku.

### Stretch

- [ ] Create another version of your front-end using a front-end framework such as React or Angular.

---

***If the mutably data gets too crazy from people adding / deleting things, you can reset the data to the seed data [here](http://mutably.herokuapp.com/).***

***Insider tip: there is an example "solution" (remember, there are MANY ways to hack it!) in the [solution branch](https://github.com/GuildCrafts/mutably-starter/tree/solution) of the starter template.***

# CRUD API

## Base URL

[https://mutably.herokuapp.com](https://mutably.herokuapp.com)

## Resources
1. `books`
1. `pokemon`
1. `albums`

## Books Endpoint

| Request | URL | Action |
| :--- | :--- | :--- |
| GET | `/books` | READS all books |
| POST | `/books` | CREATES new book |
| GET | `/books/:id` | READS one book |
| PUT | `/books/:id` | UPDATES one book |
| DELETE | `/books/:id` | DELETES one book |

#### Sample Response

GET `/books`

```js
{
  books: [
    {
      _id: "563970891719c56cac83e5bb",
      title: "Around the World in 80 Days",
      author: "Jules Verne",
      image: "https://cloud.githubusercontent.com/assets/7833470/10892118/865bee3e-8156-11e5-9634-cd7bcd3d6d4f.jpg",
      releaseDate: "January 30, 1873",
      __v: 0
    },
    {
      _id: "563970891719c56cac83e5bc",
      title: "The Four Hour Workweek",
      author: "Tim Ferriss",
      image: "https://cloud.githubusercontent.com/assets/7833470/10892117/865b465a-8156-11e5-834b-9c4172d4b0fe.jpg",
      releaseDate: "April 1, 2007",
      __v: 0
    }
  ]
}
```

## Pokemon Endpoint

| Request | URL | Action |
| :--- | :--- | :--- |
| GET | `/pokemon` | READS all pokemon |
| POST | `/pokemon` | CREATES new pokemon |
| GET | `/pokemon/:id` | READS one pokemon |
| PUT | `/pokemon/:id` | UPDATES one pokemon |
| DELETE | `/pokemon/:id` | DELETES one pokemon |

> Note that the word "pokemon" is both singular and plural.

#### Sample Response

GET `/pokemon`

```js
{
  pokemon: [
    {
      "name": "Bulbasaur",
      "pokedex": "001",
      "evolves_from": "Egg",
      "image": "https://upload.wikimedia.org/wikipedia/en/2/28/Pok%C3%A9mon_Bulbasaur_art.png"
    },
    {
      "name": "Venusaur",
      "pokedex": "003",
      "evolves_from": "Ivysaur",
      "image": "https://upload.wikimedia.org/wikipedia/en/d/dd/1200px-003Venusaur.png"
    }
  ]
}
```

## Albums Endpoint

| Request | URL | Action |
| :--- | :--- | :--- |
| GET | `/albums` | READS all albums |
| POST | `/albums` | CREATES new album |
| GET | `/albums/:id` | READS one album |
| PUT | `/albums/:id` | UPDATES one album |
| DELETE | `/albums/:id` | DELETES one album |

#### Sample Response

GET `/albums`

```js
{
  albums: [
    {
      _id: "58f16c62903fce7457f5195d",
      artistName: "Ladyhawke",
      name: "Ladyhawke",
      releaseDate: "2008, November 18",
      __v: 0,
      genres: [
        "new wave",
        "indie rock",
        "synth pop"
      ]
    },
    {
      _id: "58f16c62903fce7457f51961",
      artistName: "Anderson .Paak",
      name: "Malibu",
      releaseDate: "2016, January 15",
      __v: 0,
      genres: [
        "hip hop",
        "neo soul"
      ]
    }
  ]
}
```

## Reset Seed Data

<a href="http://mutably.herokuapp.com/reset" target="_blank">http://mutably.herokuapp.com/reset</a>
