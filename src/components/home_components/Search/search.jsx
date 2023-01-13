import React, { useContext, useState } from "react";

// Importing the query functions
import { collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore";



// importing css
import "./search.css";
import { firestoreDb } from "../../../firebase";
import { async } from "@firebase/util";
import { AuthContext } from "../../../context/authContext";

const Search = () => {
  // Search Input
  const [userName, setUserName] = useState("");
  // The actual found user
  const [user, setUser] = useState([]); 

  // set selected User
  const [selectedUser, setSelectedUser] = useState({});
  // console.log(user);

  // Error
  const [err, setError] = useState(false);

  // Getting the current User
  const currentUser = useContext(AuthContext);

  // Handle search function
  const handleSearch = async () =>{
    
    
    // search for the user using the firebase query
    // we will be searching in the firestore database for users
    console.log(userName);
    const queryResult = query(collection(firestoreDb, "users"), where("displayName", "==", userName ))

    try {
      // querySnapshot to get the user Documents
      const searchItems = [];
      const querySnapshot = await getDocs(queryResult);
      querySnapshot.forEach((doc) => {
        // If there are user's we set the user to
        searchItems.push(doc.data());
        
        // console.log(doc.data())
        // console.log(user)
      });

      // setting searched users
      setUser(searchItems);
      
    } catch (err) {
      setError(true)
    }
    
    
  };

    // console.log(user)
  // HandleKey function
  const handleKey = e =>{
    setUser([]);
    e.code == "Enter" && handleSearch();
  }

  // HandleSelect Function
  const handleSelect= async (selected)=>{
    // Setting the selected user
    setSelectedUser(selected)
    // Check whether the group (chat exists in firestore) exists or not, if not, create a new Chat
    // combined id for the chatbetween two users 
    const combinedId = currentUser.uid > selected.uid ? currentUser.uid + selected.uid: selected.uid+currentUser.uid 
    // console.log(combinedId)

    // Create the user chats

    try {
      const res = await getDoc(doc(firestoreDb, "chats", combinedId))
      
      if(!res.exists()){
        // create a chats collection with an empty document
        await setDoc(doc(firestoreDb, "chats", combinedId), {messages:[]})

        // Create userChats
        await updateDoc(doc(firestoreDb, "userChats", currentUser.uid), {
          [combinedId+".userInfo"]:{
            uid:selected.uid,
            displayName: selected.displayName,
            photoURL: selected.photoURL
          },
          [combinedId+".date"]:serverTimestamp()

          
        });

        // Create the second user's Chats
        await updateDoc(doc(firestoreDb, "userChats", selected.uid), {
          [combinedId+".userInfo"]:{
            uid:currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL
          },
          [combinedId+".date"]:serverTimestamp()       
        });
      }
    } catch (error) {
      
    }

    // setting username and user empty
    setUserName("");
    setUser([]);

  }
  return (
    <div className="search">
      <div className="searchForm">
        <input type="text" name="" id="" placeholder="Find a user" onKeyDown={handleKey} value={userName}  onChange={e=>setUserName(e.target.value)}/>
      </div>
      {err && <span>Something is wrong</span>}
      {
        
        user && (
          
          user.map(us=>(
            <div key={us.uid} className="userChat" onClick={()=>{handleSelect(us)}}>
              <img
                src={us.photoURL}
                alt=""
              />
              <div className="userChatInfo">
                <span>{us.displayName}</span>
              </div>
            </div>
          ))
          

        )
      }
      
    </div>
  );
};

export default Search;
