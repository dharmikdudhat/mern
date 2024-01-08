
        const firebaseConfig = {
          apiKey: "AIzaSyDcE7zC0t41OA9qTZ93HB6g9y8nLCN1g-g",
          authDomain: "userauthentication-acbd4.firebaseapp.com",
          databaseURL: "https://userauthentication-acbd4-default-rtdb.firebaseio.com",
          projectId: "userauthentication-acbd4",
          storageBucket: "userauthentication-acbd4.appspot.com",
          messagingSenderId: "431488697228",
          appId: "1:431488697228:web:5db80fa85a3af1f37d0ca9",
          measurementId: "G-EB94VNRQGH"
        };

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const database = firebase.database();

// Login form
document.getElementById('login-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Login successful
            console.log('Login successful');
            console.log(userCredential.user);
        })
        .catch((error) => {
            console.error('Login error:', error.message);
        });
});

// Registration form
document.getElementById('register-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const regEmail = document.getElementById('reg-email').value;
    const regPassword = document.getElementById('reg-password').value;

    auth.createUserWithEmailAndPassword(regEmail, regPassword)
        .then((userCredential) => {
            // Registration successful
            console.log('Registration successful');
            console.log(userCredential.user);

            // Save additional user data to the database if needed
            const userId = userCredential.user.uid;
            database.ref('users/' + userId).set({
                email: regEmail,
                // Add more data as needed
            });
        })
        .catch((error) => {
            console.error('Registration error:', error.message);
        });
});