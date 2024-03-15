import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, doc, addDoc, deleteDoc, onSnapshot, query, where } from "firebase/firestore";

// Personal firebase credentials to connect to the database
const firebaseConfig = {
    apiKey: "AIzaSyDPOxJ_gg08MgjP9bry7lpGVcUfTwbEHJo",
    authDomain: "first-firebaseprj.firebaseapp.com",
    projectId: "first-firebaseprj",
    storageBucket: "first-firebaseprj.appspot.com",
    messagingSenderId: "951996289527",
    appId: "1:951996289527:web:9e88601977ef4ba170def2"
};

// init firebase app
initializeApp(firebaseConfig);

// init services
const db = getFirestore();

// collection reference
const colRef = collection(db, "books"); // here we have to specify the collection we want to target

// queries
const q = query(colRef, where("author", "==", "Manlio Argueta")); // query function to use queries and we also utilise the where function to specify the parameters we wanna get

// real time collection data
onSnapshot(q, (snapshot) => { // onSnapshot function executes everytime a new action is made in the database, it works like a listener
    let books = [];
    snapshot.docs.forEach((doc) => { // for each entry we push a new element into the array just with the information we need
        books.push({ id: doc.id, ...doc.data() });
    });
    console.log(books);
});

// adding documents
const addBookForm = document.querySelector(".add"); // selecting the element to track form the HTML
addBookForm.addEventListener("submit", (e) => {
    e.preventDefault(); // we avoid reloading the page
    addDoc(colRef, { // addDoc is used to create a new document with information; we need to specify the reference and the object with data
        title: addBookForm.title.value,
        author: addBookForm.author.value,
    })
    .then(() => {
        addBookForm.reset();
    })
    .catch((err) => {
        console.log(err.message);
    })
});

// deleting documents
const deleteBookForm = document.querySelector(".delete");
deleteBookForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const docRef = doc(db, "books", deleteBookForm.id.value); // to delete a document we need to track the document by its id
    deleteDoc(docRef) // then we execute the deleteDoc function
    .then(() => {
        deleteBookForm.reset();
    })
    .catch((err) => {
        console.log(err.message);
    })
});