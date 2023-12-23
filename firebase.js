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
const playerRef = ref(db, "players");

class userID { 
    static userID = "";
}

import {
    getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut
    } from 'https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js';
    const auth = getAuth();
    var frmCreateUser = document.getElementById("frmCreateUser");
    if (frmCreateUser != null){
        frmCreateUser.addEventListener("submit", function(e){
        e.preventDefault();
        var email = document.getElementById("email").value;
        var password = document.getElementById("password").value;
        createUser(email, password);
        console.log("email" + email + "password" + password);
    });
    }
    function createUser(email, password){
        console.log("creating the user");
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential)=>{
        const user = userCredential.user;
        console.log("created user ... " + JSON.stringify(userCredential));
        console.log("User is now signed in ");
        window.location.assign('createUser.html');
    }).catch((error)=>{
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(`ErrorCode: ${errorCode} -> Message: ${errorMessage}`);
    });

    onAuthStateChanged(auth, (currentUser) => {
        if (currentUser) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
            const uid = currentUser.uid;
            console.log(`(OnAuthStateChanged) Current user is logged in:
        ${currentUser.email} :: ${currentUser.uid}`)
            console.log(userID.userID);
            userID.userID = currentUser.uid;
            console.log(userID.userID);
        } else {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(`ErrorCode: ${errorCode} -> Message: ${errorMessage}`);
        }
    });
}

import {
    getDatabase, ref, child, get,set,onValue,push,update,remove
    } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-database.js";

    var addUserToDatabase = document.getElementById("frmCreateData");
    if (addUserToDatabase != null){
        addUserToDatabase.addEventListener("submit", function(e){
        e.preventDefault();
        var username = document.getElementById("username").value;
        var country = document.getElementById("country").value;
        var age = document.getElementById("age").value;
        createData(username, country, age, 0, 0, false)
    })
    }
    function createData(username, country, age, time, points, admin){
        const userRef = ref(db, `players/${username}`);
        //const newUserRef = push(userRef);
        set(userRef, {
            username: username,
            country: country,
            age: age,
            time: time,
            points: points,
            admin: admin,
        })

        .then(function(){
            console.log("User has created data ");
            window.location.href='displayData.html';
        });
        
    }

    var frmlogUser = document.getElementById("frmlogUser");
            if (frmlogUser != null){
                frmlogUser.addEventListener("submit", function(e){
                e.preventDefault();
                var email = document.getElementById("email").value;
                var password = document.getElementById("password").value;
                loginUser(email, password);
                console.log("email" + email + "password" + password);
            });
            }

            function loginUser(email, password){
            signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log("login");
                window.location.href='displayData.html';
                // ...
            })
                .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(`ErrorCode: ${errorCode} -> Message: ${errorMessage}`);
            });
        }

        var readBtn = document
            .getElementById("btn-read")
            .addEventListener("click", getPlayerData);

    function getPlayerData(){
        get(playerRef).then((snapshot) => {
            if(snapshot.exists()){
                console.log(snapshot.val());
                let table = document.getElementById("player-data");
                let playerInfo = "";
                snapshot.forEach((childSnapshot) => {
                    playerInfo += `<tr>
                        <td>${childSnapshot.val().username}</td>
                        <td>${childSnapshot.val().country}</td>
                        <td>${childSnapshot.val().age}</td>
                        </tr>`;
                });
                table.innerHTML = playerInfo
            } else{
                console.log("No data");
            }
    }).catch((error) => {
        console.error(error);
    })
    }

    var adminBtn = document
            .getElementById("btn-admin")
            .addEventListener("click", getAdminData);
    
    function getAdminData(){
        get(playerRef).then((snapshot) => {
            if(snapshot.exists()){
                console.log(snapshot.val());
                snapshot.forEach((childSnapshot) => {
                    if (childSnapshot.val().admin == true) {
                        if (childSnapshot.key == userID.userID) {
                            console.log("access granted");
                            window.location.href='adminPage.html';
                        }
                    } else {
                        console.log("not admin");
                    };
                });
            } else{
                console.log("No data");
            }
        }).catch((error) => {
            console.error(error);
        })
        }