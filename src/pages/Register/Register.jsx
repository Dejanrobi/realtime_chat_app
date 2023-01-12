import React, { useState } from "react";
import { addAvatar } from "../../constants/images";

// importing createUserWithEmailandPassword
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
// importing our initialized auth, getStorage
import { auth, storage, firestoreDb } from "../../firebase";

// Importing the upload Function
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { async } from "@firebase/util";

// Importing the doc and setDOC functions
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";

// import "./register.css";

const Register = () => {
  const [err, setErr] = useState(false);

  // Navigate Hooks
  const navigate = useNavigate();

  // onSubmit function
  const handleSubmit = async (e) => {
    // Preventing default onSubmit
    e.preventDefault();

    // consoloe logging the first valueg
    // Do this to debug and check whether we can reach every input in the app.
    // console.log(e.target[0].value);

    // Obtaining the values on the form
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    // obtaining the file(we take the first file: a single image)
    const file = e.target[3].files[0];

    const d = new Date();
    let time = d.getTime();
    const fileAddress = time + displayName.replace(/\s/g, "");
    console.log(fileAddress);

    // console.log(new Date());

    // Creating the userName, Email and password whenever the handleSubmit button is clicked and then waiting for the response
    try {
      const userResponse = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // updating the displayName and profilePicture

      // Uploading the image. We can also use it to check the percentage
      // Getting the storage and passing the storage location
      const storageRef = ref(storage, fileAddress);

      // Uploading the file to the storage Location
      const uploadTask = uploadBytesResumable(storageRef, file);

      // Register three observers:
      // 1. 'state_changed' observer, called any time the state changes
      // 2. Error observer, called on failure
      // 3. Completion observer, called on successful completion

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          // const progress =
          //   (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          // console.log("Upload is " + progress + "% done");
          // switch (snapshot.state) {
          //   case "paused":
          //     console.log("Upload is paused");
          //     break;
          //   case "running":
          //     console.log("Upload is running");
          //     break;
          // }
        },
        (error) => {
          // Handle unsuccessful uploads
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            console.log("File available at", downloadURL);

            // Updating the user profile using the updateFunction and passing the response
            await updateProfile(userResponse.user, {
              displayName,
              photoURL: downloadURL,
            });

            // Setting the user Details in cloud firestore
            // Add a new document in collection "users" with their unique ids
            await setDoc(doc(firestoreDb, "users", userResponse.user.uid), {
              uid: userResponse.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            // Setting the userChats Collection and passing an empty chat document because we do not have any conversation yet.
            await setDoc(
              doc(firestoreDb, "userChats", userResponse.user.uid),
              {}
            );

            console.log("User Data Successfully Uploaded!!!");

            // After the user has signed Up successfully, we need to head to the homepage
            // navigate using the useNavigate Hook
            navigate("/");
          });
        }
      );
    } catch (error) {
      setErr(true);
    }
  };

  return (
    
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Lama Chat</span>
        <span className="title">Register</span>
        {/* Form onsubmit */}
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Enter Name" name="" id="" />
          <input type="email" placeholder="Enter Email" name="" id="" />
          <input type="password" placeholder="Enter Password" name="" id="" />
          <input
            style={{ display: "none" }}
            type="file"
            name=""
            id="file-input"
          />
          <label htmlFor="file-input">
            <img src={addAvatar} alt="" />
            <span>Add an avatar</span>
          </label>
          <button type="submit">Sign up</button>
          {err && <span>Something went wrong</span>}
        </form>
        <p>You do have an account? <Link to="/login">Login</Link></p>
      </div>
    </div>
  );
};

export default Register;
