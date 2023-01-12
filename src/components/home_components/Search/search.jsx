import React, { useState } from "react";

// Importing the query functions
import { collection, getDocs, query, where } from "firebase/firestore";



// importing css
import "./search.css";
import { firestoreDb } from "../../../firebase";
import { async } from "@firebase/util";

const Search = () => {
  // Search Input
  const [userName, setUserName] = useState("");
  // The actual found user
  const [user, setUser] = useState([]);
  // console.log(user);

  // Error
  const [err, setError] = useState(false);

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
  return (
    <div className="search">
      <div className="searchForm">
        <input type="text" name="" id="" placeholder="Find a user" onKeyDown={handleKey}  onChange={e=>setUserName(e.target.value)}/>
      </div>
      {err && <span>Something is wrong</span>}
      {
        
        user && (
          
          user.map(us=>(
            <div key={us.uid} className="userChat">
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
