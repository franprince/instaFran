import React, { useEffect, useState } from "react";
import M from "materialize-css";
import FileUpload from "./fileUpload";
import firebase from "firebase/app";
import "firebase/database";
import "firebase/firebase-storage";

function Modal() {
  const [informacionDelUsuario, setInformacionDelUsuario] = useState({
    photoURL: "",
    displayName: "",
  });

  const [mensaje, setMensaje] = useState("");
  const [uploadValue, setUploadValue] = useState(0);

  useEffect(() => {
    M.AutoInit();
    firebase.auth().onAuthStateChanged((user) => {
      setInformacionDelUsuario({
        ...user,
        photoURL: user.photoURL,
        displayName: user.displayName,
      });
    });
  }, []);
  function handleChange(event) {
    setMensaje(event.target.value);
  }
  function handleUpload(event) {
    const archivo = event.target.files[0];
    const storageRef = firebase.storage().ref(`fotos/${archivo.name}`);
    const tarea = storageRef.put(archivo);
    tarea.on(
      "state_changed",
      (snapshot) => {
        setUploadValue(
          (snapshot.bytesTransferred / snapshot.bytesTransferred) * 100
        );
      },
      (error) => {
        console.log(error.message);
      },
      () => {
        const record = {
          avatar: informacionDelUsuario.photoURL,
          nombre: informacionDelUsuario.displayName,
          txt: mensaje,
          pic: tarea.snapshot.metadata.fullPath,
        };
        const db = firebase.database();
        const dbRef = db.ref("pictures");
        const newPicture = dbRef.push();
        newPicture.set(record);
      }
    );
  }

  return (
    <React.Fragment>
      <a
        href="#modal1"
        className="btn-floating btn-large waves-effect waves-light modal-trigger red FAB"
        id="fab"
      >
        <i className="material-icons">add</i>
      </a>

      <div id="modal1" className="modal">
        <div className="modal-content">
          <h4>Posteá en Instafran</h4>
          <div className="chip">
            <img src={informacionDelUsuario.photoURL} alt="user" />
            {informacionDelUsuario.displayName}
          </div>

          <div className="row">
            <form className="col l12">
              <div className="row">
                <div className="input-field col s9 l4">
                  <i className="material-icons prefix">mode_edit</i>
                  <textarea
                    id="icon_prefix2"
                    className="materialize-textarea"
                    onChange={(event) => handleChange(event)}
                  />
                  <label htmlFor="icon_prefix2">Mensaje</label>
                  <FileUpload
                    onUpload={(event) => handleUpload(event)}
                    uploadValue={uploadValue}
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="modal-footer" />
      </div>
    </React.Fragment>
  );
}

export default Modal;
