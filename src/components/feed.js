import React, { useState, useEffect } from "react";
import Post from "./post";
import "firebase/database";
import Loading from "./loading";

function FeedContent(props) {
  const [postData, setPostData] = useState({
    data: [],
    loading: true,
  });

  useEffect(() => {
    setPostData({ data: props.data, loading: props.loading });
  }, [props]);

  return (
    <React.Fragment>
      {postData.loading === true || null ? (
        <Loading />
      ) : (
        postData.data
          .map((item, i) => {
            return (
              <Post
                key={i}
                textoPost={item.txt}
                nombreAutorPost={item.nombre}
                fotoAutorPost={item.avatar}
                fotoPost={item.pic}
              />
            );
          })
          .reverse()
      )}
    </React.Fragment>
  );
}

export default FeedContent;
