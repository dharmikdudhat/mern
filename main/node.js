const express = require('express');
const bodyParser = require('body-parser');
const firebase = require('firebase-admin');
const serviceAccount = require('C:/dharmik/userauthentication-acbd4-firebase-adminsdk-6y0ki-bd0c841a14.json');

const app = express();
const port = 3000;

// Initialize Firebase Admin
firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: "https://userauthentication-acbd4-default-rtdb.firebaseio.com"
});

app.use(bodyParser.json());

// Endpoint for authenticating users
app.post('/authenticate', (req, res) => {
    const { email, password } = req.body;

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            res.json({ success: true, user: userCredential.user });
        })
        .catch((error) => {
            res.json({ success: false, error: error.message });
        });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});