import React, { useContext, useEffect } from "react";

import "./App.css";
import "./index.css";
import Routing from "./Routing.jsx";
import { DataContext } from "./Components/DataProvider/DataProvider.jsx";
import { type } from "./Utilities/action.type.jsx";
import { auth } from "./Utilities/firebase.jsx";
function App() {
  const [{ user },dispatch]=useContext(DataContext)
  useEffect(() => {
    auth.onAuthStateChanged((authUser)=>{if (authUser){
dispatch({
  type: type.SET_USER,
  user: authUser
})
    }else{
      dispatch({
  type: type.SET_USER,
  user: null
})
    }

    })
  }, [])
  
  return (
    <>
      <Routing/>
    </>
  );
}

export default App;
