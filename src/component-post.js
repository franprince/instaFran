import React, { useEffect, useState } from "react";
import firebase from "firebase/app";
import "firebase/firebase-storage";

function Post({ fotoAutorPost, nombreAutorPost, textoPost, fotoPost }) {
  const [urlfoto, setUrlFoto] = useState("");
  useEffect(() => {
    firebase
      .storage()
      .ref(fotoPost)
      .getDownloadURL()
      .then((url) => {
        setUrlFoto(url);
      })
      .catch((error) => console.log(error.message));
  }, []);

  return (
    <React.Fragment>
      <div className="card">
        <div className="card-content">
          <div className="row margin0">
            <div className="col s2 l1 valign-wrapper">
              <img
                src={fotoAutorPost}
                alt={nombreAutorPost}
                className="circle cardPic inline"
              />
            </div>
            <div className="col s10 l6 valign-wrapper fix-nombre">
              <p className="inline cardName">{nombreAutorPost}</p>
            </div>
          </div>
        </div>

        <div className="card-image">
          <img src={urlfoto} alt="" />
        </div>
        <div className="card-content">
          <p>{textoPost}</p>
        </div>
      </div>
      <br />
      <br />
    </React.Fragment>
  );
}

export default Post;
