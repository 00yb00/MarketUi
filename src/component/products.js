import React from 'react';
import {useState}from 'react';
import axios from 'axios';
import { variables } from './variables';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Products() 
{ 
const [name, setName] = useState("");
const [id, setId] = useState(12);
const [price, setPrice] = useState(0);
const [stock, setStock] = useState(0);
const [def, setDef] = useState("");
const [tables, setTables] = useState([]);
const {state}=useLocation();
const navigate = useNavigate();

const getTables = async() => {
     axios.get(variables.ApiUrl+'departments/GetDepartment').then((response) => {
         const category = response.data.map(res => res)
         setTables(category);
     });
 };
const postTables=async(j) => {
    axios.post(variables.ApiUrl+'products/PostProduct',j)
    .then((respons)=>{console.log(respons.data)})
    .catch((err)=>{console.log(err)})    
}
const putTables=async(j) => {
    axios.put(variables.ApiUrl+'products/PutProduct',j)
    .then((respons)=>{console.log('success!!!')})
    .catch((err)=>{console.log(err)})
}
 React.useEffect(() => {
     getTables();
 });
     return (
     <div>
        <input   type="text" onChange={(e) => {setName(e.target.value);}}></input>
        <p>product price:</p>
        <input  type="number" onChange={(e) => {setPrice(e.target.value);}}></input>
        <p>amount in stock:</p>
        <input  type="number" onChange={(e) => {setStock(e.target.value);}}></input>
        <br/><br/>
        <p>select department:</p>

        <select value={def} onChange={(e) => {setDef(e.target.value);}}> 
          {
          tables.map((o,i)=>{ if(def=="")setDef(tables[0].name);
           return(<option key={i} value={o.name}>{o.name} </option>)})  
          }        
        </select>
        
        <br/><br/><button onClick={()=>{
         if(Number(state)>=0 && state!=null)
         {
          const j={"id":Number(state),"name": name,"price":Number(price),"amount":Number(stock),"departmentName":def};
          putTables(j);
         navigate("/Grids");
         }
        else
        { 
        const j={"id": id,"name": name,"price":Number(price),"amount":Number(stock),"departmentName":def}
        postTables(j);
        }}}>add product to db</button>
        
    </div>);
}
export default Products;