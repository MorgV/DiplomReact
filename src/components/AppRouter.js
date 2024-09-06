import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react"
import {Routes, Route} from 'react-router-dom'
import { Context } from "../index"
import Shop from "../pages/Shop";
import { authRoutes, publicRoutes } from "../routes"


const AppRouter = observer(() => {
    const {user} = useContext(Context)
    return (
<div style={{height:"100%"}}>
            <Routes>
    
                {user.isAuth === true && authRoutes.map(({path, Component}) => 
                  <Route key={path} path={path} element = {Component} exact/>
                )}
    
                {publicRoutes.map(({path, Component}) => 
                   <Route key={path} path={path} element = {Component} exact/>
                )}      
    
                <Route path="*" element={<Shop/>}/>
    
            </Routes>
</div>
    );
});

export default AppRouter