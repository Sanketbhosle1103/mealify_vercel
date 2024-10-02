import React, { useContext, useState, useRef, useEffect } from "react";
import Navbar from "./Navbar";
import { UserContext } from "../Usercontext";
import { app } from "../firebase";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

const UpdateProfile = () => {
  const { user, setUser } = useContext(UserContext);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setUpdating(true);
      const response = await fetch(`http://localhost/api/update/${user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
      });
      const data = await response.json();
      setUser(data);
      setUpdating(false);
      setUpdateSuccess(true);
    } catch (exp) {
      setUpdating(false);
      setUpdateSuccess(false);
      console.log(exp);
    }
  };

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };

  return (
    <>
      <Navbar />
      <div
        className="container mt-5 mx-auto"
        style={{ height: "550px", width: "600px" }}
      >
        <h1 className="text-center mb-4">Profile</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group text-center mb-4">
            <input
              type="file"
              id="avatar"
              ref={fileRef}
              onChange={(e) => setFile(e.target.files[0])}
              hidden
              accept="image/*"
            />
            <img
              src={formData.avatar || user.avatar}
              alt="profile"
              className="rounded-circle"
              style={{ width: "100px", height: "100px", cursor: "pointer" }}
              onClick={() => fileRef.current.click()}
            />
            <p className="mt-2">
              {fileUploadError ? (
                <span className="text-danger">
                  Error Image upload (image must be less than 2 MB)
                </span>
              ) : filePerc > 0 && filePerc < 100 ? (
                <span className="text-warning">{`Uploading ${filePerc}%`}</span>
              ) : filePerc === 100 ? (
                <span className="text-success">
                  Image successfully uploaded!
                </span>
              ) : (
                ""
              )}
            </p>
          </div>
          <div className="form-group mb-3">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              id="name"
              defaultValue={user.name}
              onChange={handleChange}
              name="name"
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              id="email"
              defaultValue={user.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="phone">Phone</label>
            <input
              type="number"
              className="form-control"
              placeholder="Phone"
              id="phone"
              defaultValue={user.phone}
              onChange={handleChange}
            />
          </div>
          <button disabled={updating} className="btn btn-primary w-100">
            {updating ? "Loading..." : "Update"}
          </button>
          {updateSuccess && (
            <p className="text-success mt-3 text-center">
              User is updated successfully!
            </p>
          )}
        </form>
      </div>
    </>
  );
};

export default UpdateProfile;
