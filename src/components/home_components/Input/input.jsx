import { async } from "@firebase/util";
import { arrayUnion, doc, serverTimestamp, Timestamp, updateDoc } from "firebase/firestore";
import React, { useContext, useState } from "react";
import { attach, img } from "../../../constants/images";
import { firestoreDb, storage } from "../../../firebase";

// importing css
import "./input.css";

// Importing the unqiue Id
import {v4 as uuid} from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { ChatContext } from "../../../context/ChatContext";
import { AuthContext } from "../../../context/authContext";

const Input = () => {

  // Text Input
  const [text, setText] = useState("")
  // Image Input
  const [image, setImg] = useState(null)


  // Getting the current User
  const currentUser = useContext(AuthContext)
  // Chat context
  const {data} = useContext(ChatContext)
  // console.log(data.chatId)

  // Handle send function
  const handleSend = async ()=>{
    // checking whether there is  an image, if not, we only send the text message
    
    if(image){

      // Uploading the Image
      // Getting the storage and passing the storage location and storage id
      const storageRef = ref(storage, uuid());
      // Uploading the file to the storage Location
      const uploadTask = uploadBytesResumable(storageRef, image);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          
        },
        (error) => {
          // Handle unsuccessful uploads
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            // console.log("File available at", downloadURL);
            await updateDoc(doc(firestoreDb, "chats", data.chatId),{
              messages:arrayUnion({
                id: uuid(),
                text,
                senderId:currentUser.uid,
                date:Timestamp.now(),
                img:downloadURL
              })
            })

          });
        }
      );


    }else{
      // updating the messages sent to the user with a unique id
      await updateDoc(doc(firestoreDb, "chats", data.chatId),{
        messages:arrayUnion({
          id: uuid(),
          text,
          senderId:currentUser.uid,
          date: Timestamp.now()
        })
      })
    }

    // Updating the last Message sent for each user after sending the message
    await updateDoc(doc(firestoreDb,"userChats", currentUser.uid),{
      [data.chatId+".lastMessage"]:{
        text
      },
      [data.chatId+".date"]:serverTimestamp()
    })

    // Updating the last message for the other user
    await updateDoc(doc(firestoreDb,"userChats", data.user.uid),{
      [data.chatId+".lastMessage"]:{
        text
      },
      [data.chatId+".date"]:serverTimestamp()
    })
    // Deleting the image and text after sending
    setText("");
    setImg(null);

  }

  return (
    <div className="input">
      <input type="text" name="" id="" placeholder="Type something..."  onChange={e=>setText(e.target.value) } value={text}/>
      <div className="send">
        <img src={attach} alt="" />
        <input type="file" style={{ display: "none" }} id="file" onChange={e=>setImg(e.target.files[0])}/>
        <label htmlFor="file">
          <img src={img} alt="" />
        </label>

        <button onClick={()=>{handleSend()}}>Send</button>
      </div>
    </div>
  );
};

export default Input;
