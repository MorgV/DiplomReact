import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { Context } from "./index";
import AppRouter from "./components/AppRouter"
import NavBar from "./components/NavBar"
import { check } from "./http/UserAPI";
import { Spinner } from "react-bootstrap";
import Footer from "./components/Footer";
// import Body from "./components/Body";
// import Footer from "./components/Footer";
// import Header from "./components/Header";
// <Header style={this.addStyleBody}/>
// <Body/>
// {/* <Footer/> */}



const App = observer(() =>{
    const {user} = useContext(Context) 
    const [loading , setLoading] = useState(true)
    const [auth,setAuth] = useState('false')
    useEffect(() => {
      if (JSON.parse(localStorage.getItem('isAuth')) == true) {
        check().then(response =>{
            user.setUser(response.email)
            user.setAuth(true)
            user.setRole(response.role)
            user.setId(response.id)
            console.log(response.id)
        })}
       setLoading(false)
      }, [])


    if (loading){
      return <Spinner animation={"grow"}/>
    }

    return (
      <BrowserRouter style={{backgroundColor:"#F1F0EB",}} className="App">
          <NavBar />
          <AppRouter />
          <Footer/>
      </BrowserRouter>
   );
  })





export default App;
