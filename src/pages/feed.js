import React, { useState, useEffect } from "react";
import Nav from "../components/nav";
import ReactDOM from "react-dom";
import Modal from "../components/modal";
import FeedContent from "../components/feed";
import firebase from "firebase/app";

function Feed() {
  const [informacionDelUsuario, setInformacionDelUsuario] = useState({
    photoURL: "",
    displayName: "",
  });

  const [postData, setPostData] = useState({ data: [], loading: null });

  async function traerDataDeFirebase() {
    const db = firebase.database();
    const dbRef = db.ref("pictures");
    const data = [];
    dbRef.on("child_added", (snapshot) => {
      data.push(snapshot.val());
    });
    return data;
  }

  useEffect(() => {
    traerDataDeFirebase().then((data) => {
      setPostData({ data: data, loading: false });
    });
  }, [postData]);
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setInformacionDelUsuario({
        ...user,
        photoURL: user.photoURL,
        displayName: user.displayName,
      });
    });
  }, []);

  return (
    <React.Fragment>
      <Nav
        nombre={informacionDelUsuario.displayName}
        avatar={informacionDelUsuario.photoURL}
      />
      <div key="container1" className="container">
        <div key="container2" className="row">
          <div key="container3" className="col l6 offset-l3">
            <FeedContent
              key="JEJEJE"
              data={postData.data}
              loading={postData.loading}
            />

            {ReactDOM.createPortal(
              <Modal />,
              document.getElementById("teleport")
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Feed;
