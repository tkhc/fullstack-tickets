# Basic Ticket Tracker CRUD App 
## Using Node, Express, and MongoDB + jQuery Datatables

Note that this app uses Fetch to make requests, but you could easily use Axios, jQuery, or any other request tools.  You could also easily integrate React.

## To install:
```npm install```

## To configure:
1. You must create a .env file.  See env.txt for info about what goes in .env, then delete env.txt

## To run:
```nodemon server.js```

## File/folder structure:

```/server.js``` contains the API endpoints and webserver

```/.env``` hidden configuration file

```/views/index.ejs``` renders the one and only HTML file in this application and allows us to easily insert variables, loop through tickets, etc.

```/public/main.js``` contains all the functions needed for the front-end (the rendered EJS file), mainly functions that make requests to the API and handle responses

```/public/styles.css``` custom CSS styles for the front-end