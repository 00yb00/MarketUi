import './App.css';
import AddClass from './component/addClass';
import Products from './component/products';
import Grids from './component/grid';
import Home from'./component/home';
import axios from "axios";
import React from "react";
import {useState}from 'react';
import { BrowserRouter, Route,Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
  <BrowserRouter>
          <Routes>
          <Route exact path="/" element={<Home/>}/>
             <Route exact path="/AddClass" element={<AddClass/>}/>
             <Route exact path="/Products" element={<Products/>}/>
             <Route exact path="/Grids" element={<Grids/>}/>
          </Routes>
       </BrowserRouter>
    </div>
  );
  
}

export default App;
