import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { storage } from "../_firebase";
import { userActions } from "../_actions";

function HomePage() {
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);

  const images = useSelector((state) => state.images);
  const users = useSelector((state) => state.users);
  const user = useSelector((state) => state.authentication.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userActions.getAll());
    dispatch(userActions.getAllImgs());
  }, []);

  const handleDeleteUser = (id) => {
    dispatch(userActions.delete(id));
  };

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            dispatch(
              userActions.registerImg({ path: url, filename: image.name })
            );
          });
      }
    );
  };

  return (
    <div
      className="mx-auto"
      style={{
        minHeight: "85vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "50px 20px 200px",
      }}
    >
      <h2>Hello {user.firstName}!</h2>
      <p>You're logged in</p>
      <div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px",
            marginBottom: "25px",
            overflow: "auto",
            boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
          }}
        >
          <span>Now you can upload images:</span>
          <br />
          <br />
          <input type="file" onChange={handleChange} />
          <br />
          <br />
          <progress value={progress} max="100" />
          <br />
          <br />
          <button onClick={handleUpload}>Upload</button>
        </div>
        {images.items && (
          <>
            {images.items.map((url, key) => (
              <div
                key={key}
                style={{
                  boxShadow:
                    "rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px",
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                  padding: "10px",
                  overflow: "hidden",
                }}
              >
                <h6>File name:</h6>
                <span
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "10px",
                    overflow: "auto",
                  }}
                >
                  <span>{url.filename}</span>
                  <img
                    src={url.path}
                    alt={url.filename}
                    style={{
                      border: "1px solid #ddd",
                      borderRadius: "4px",
                      padding: "5px",
                      width: "150px",
                    }}
                  />
                </span>
                <a href={url.path} target='_blank'> Link to the file</a>
              </div>
            ))}
          </>
        )}
      </div>
      <p>
        <Link to="/login">Logout</Link>
      </p>
    </div>
  );
}
export { HomePage };
