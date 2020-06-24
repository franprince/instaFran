import React, { useState, useEffect } from "react";
import insta from "../instashot.png";
import firebase from "firebase/app";
import "firebase/auth";
import { useHistory } from "react-router-dom";

function Home() {
  const history = useHistory();
  const [user, setUser] = useState(null);
  function autenticarConGoogle() {
    const proveedor = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(proveedor)
      .then((result) => setUser(result.user))
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        history.push("/feed");
      }
    });
  }, []);

  return (
    <React.Fragment>
      <div className="container vh100">
        <div className="row ">
          <div className="col m4 l5 offset-l1 off">
            <img alt="" src={insta} />
          </div>
          <div className="col m3 l3 top120">
            <div className="card">
              <div className="card-image">
                <span className="card-title">Card Title</span>
              </div>
              <div className="card-content center">
                <img
                  alt="Person at the beach wishing to be using instaFran"
                  className="circle homePic"
                  src="https://source.unsplash.com/random/500x500?photography,social,media"
                />
                <p>
                  Bienvenidos a <strong>Instafran</strong>, esta app esta creada
                  siguiendo el curso de Firebase de escuela devRock.
                </p>
              </div>
              <div className="card-action center-align">
                <button
                  className="waves-effect waves-light btn"
                  onClick={() =>
                    user ? history.push("/feed") : autenticarConGoogle()
                  }
                >
                  Logear con Google
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Home;
