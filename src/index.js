import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import firebase from "firebase/app";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

firebase.initializeApp({
  apiKey: "AIzaSyBwZ0ctxs-oPgTtMQ8bDozVM5js0kcjVuo",
  authDomain: "instafran-d81b9.firebaseapp.com",
  databaseURL: "https://instafran-d81b9.firebaseio.com",
  projectId: "instafran-d81b9",
  storageBucket: "instafran-d81b9.appspot.com",
  messagingSenderId: "1036936720220",
  appId: "1:1036936720220:web:09f61fe1f3f302c8b4db99",
  measurementId: "G-L93CQ0D40S",
});

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
