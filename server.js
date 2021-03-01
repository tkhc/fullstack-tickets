const dotenv = require('dotenv');
const express = require('express');
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const ObjectID = require('mongodb').ObjectID
const { auth } = require('express-openid-connect');
const { requiresAuth } = require('express-openid-connect');
dotenv.config();
const app = express();

// configuration vars
const port = process.env.PORT || 3000;

// configuration object for Auth0. The baseURL, clientID, and issuerBaseURL are provided by Auth0 in Application > Settings
const config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.AUTHSECRET,
    baseURL: process.env.BASE_URL,
    clientID: process.env.CLIENT_ID,
    issuerBaseURL: process.env.ISSUER_BASE_URL
};
// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

//database connection, middleware, and endpoints
MongoClient.connect(process.env.DB_CONNECT, {
        useUnifiedTopology: true
    })
    .then(client => {
        console.log('Connected to Database')
        const db = client.db(process.env.DB_NAME)
        const ticketsCollection = db.collection(process.env.DB_COLLECTION)

        app.set('view engine', 'ejs')
        app.use(bodyParser.urlencoded({ extended: true }))
        app.use(bodyParser.json())
        app.use(express.static('public'))

        app.get('/profile', requiresAuth(), (req, res) => {
            res.send(JSON.stringify(req.oidc.user));
        });
        app.get('/', requiresAuth(), (req, res) => {
            db.collection('tickets').find().toArray()
                .then(tickets => {
                    res.render('index.ejs', { tickets: tickets })
                })
                .catch(error => console.error(error))
        })

        app.post('/tickets', requiresAuth(), (req, res) => {
            ticketsCollection.insertOne(req.body)
                .then(result => {
                    res.redirect('/')
                })
                .catch(error => console.error(error))
        })

        app.put('/tickets', requiresAuth(), (req, res) => {
            ticketsCollection.findOneAndUpdate({ _id: ObjectID(req.body._id) }, {
                    $set: {
                        title: req.body.title,
                        desc: req.body.desc
                    }
                }, {
                    upsert: false
                })
                .then(result => {
                    res.json('No quote to update')
                })
                .catch(error => console.error(error))
        })

        app.delete('/tickets', requiresAuth(), (req, res) => {
            ticketsCollection.deleteOne({ _id: ObjectID(req.body._id) })
                .then(result => {
                    if (result.deletedCount === 0) {
                        return res.json('No quote to delete')
                    }
                    res.json(`Deleted Darth Vadar's quote`)
                })
                .catch(error => console.error(error))
        })

        // start the webserver
        app.listen(port, function() {
            console.log(`listening on ${port}`)
        })
    })