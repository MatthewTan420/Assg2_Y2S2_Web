// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBEuX8LWqGjeWRUaMd8ibsfnizkpi-1TIk",
  authDomain: "assg2-782a9.firebaseapp.com",
  databaseURL: "https://assg2-782a9-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "assg2-782a9",
  storageBucket: "assg2-782a9.appspot.com",
  messagingSenderId: "907672642024",
  appId: "1:907672642024:web:1e3c7e049416672907045d",
  measurementId: "G-27CS9GFK57"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getDatabase();

import {
    getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut
    } from 'https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js';
    const auth = getAuth();
    var frmCreateUser = document.getElementById("frmCreateUser");
    frmCreateUser.addEventListener("submit", function(e){
        e.preventDefault();
        var email = document.getElementById("email").value;
        var password = document.getElementById("password").value;
        createUser(email, password);
        console.log("email" + email + "password" + password);
    });
    function createUser(email, password){
        console.log("creating the user");
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential)=>{
        const user = userCredential.user;
        console.log("created user ... " + JSON.stringify(userCredential));
        console.log("User is now signed in ");
    }).catch((error)=>{
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(`ErrorCode: ${errorCode} -> Message: ${errorMessage}`);
    });
}

import {
getDatabase, ref, child, get,set,onValue,push,update,remove
} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-database.js";

var addUserToDatabase = document.getElementById("frmCreateData");
addUserToDatabase.addEventListener("submit", function(e){
    e.preventDefault();
    var username = document.getElementById("username").value;
    var country = document.getElementById("country").value;
    var age = document.getElementById("age").value;
    createData(username, country, age,)
})

function createData(username, country, age){
    const userRef = ref(db, `players/${username}`);
    const newUserRef = push(userRef);
    set(newUserRef, {
        username: username,
        country: country,
        age: age,
    });
}