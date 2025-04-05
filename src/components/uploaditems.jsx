import React from "react";
import { uploadItems } from "../utils/uploadItems.js";

const UploadButton = () => {
  const handleUpload = async () => {
    console.log("Subiendo items...");
    await uploadItems();
    alert("Items subidos a Firestore!");
  };

  return (
    <div>
      <button onClick={handleUpload}>Subir productos a Firestore</button>
    </div>
  );
};

export default UploadButton;
