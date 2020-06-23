import React from "react";

function FileUpload(props) {
  return (
    <div>
      <progress value={props.uploadValue} max="100">
        {props.uploadValue} %
      </progress>
      <br />
      <input type="file" onChange={props.onUpload} />
      <br />
      <img width="320" src={props.picture} alt="" />
    </div>
  );
}

export default FileUpload;
