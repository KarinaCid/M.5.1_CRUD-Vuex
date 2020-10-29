const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

const cors = require('cors');
const express = require('express');
const app = express();

app.use(cors({
    origin: true
}));

app.get('/beers', async (req, res) => {
    const beers = await admin.firestore().collection('beers').get()
    let beerList = [];

    beers.forEach(beer => {
        beerList.push({id: beer.id, data: beer.data()});
    })

    res.send(beerList)
});

exports.api = functions.https.onRequest(app)


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
