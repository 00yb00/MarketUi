import './App.css';
import DepartmentMain from './component/departmentMain';
import ProductMain from './component/productMain';
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
             <Route exact path="/DepartmentMain" element={<DepartmentMain/>}/>
             <Route exact path="/ProductMain" element={<ProductMain/>}/>
             <Route exact path="/Grids" element={<Grids/>}/>
          </Routes>
       </BrowserRouter>
    </div>
  );
  
}

export default App;
