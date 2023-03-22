import React from 'react';
import {useState}from 'react';
import axios from 'axios';
import { variables } from './variables';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Products() 
{ 
const [name, setName] = useState("");
const [id, setId] = useState(12);
const [price, setPrice] = useState(0);
const [stock, setStock] = useState(0);
const [def, setDef] = useState(0);
const [tables, setTables] = useState([]);
const [products, setProducts] = useState([]);

const {state}=useLocation();
const navigate = useNavigate();

const getTables = async() => {
     axios.get(variables.ApiUrl+'departments/GetDepartment').then((response) => {
         const category = response.data.map(res => res)
         setTables(category);
     });
 };
 const getProducts = async() => 
 {
     axios.get(variables.ApiUrl+'products/GetProduct').then((response) => {
     const category = response.data.map(res => res)
     setProducts(category);});
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
const checkValue=async()=>{
    if(Number(state)>=0 && state!=null&&products.length!=0){
        const i=Number(state);
        setName(products[i].name);
        setPrice(products[i].price);
        setStock(products[i].amount);
        setDef(products[i].departmentId)
    }
}
 React.useEffect(() => {
     getTables();
     getProducts();
     checkValue();
 });
     return (       
     <div><h4>-pruduct-</h4> <br/>
        <input   type="text" value={name} onChange={(e) => {setName(e.target.value);}}></input>
        <p>product price:</p>
        <input  type="number" value={price} onChange={(e) => {setPrice(e.target.value);}}></input>
        <p>amount in stock:</p>
        <input  type="number" value={stock} onChange={(e) => {setStock(e.target.value);}}></input>
        <br/><br/>
        <p>select department:</p>

        <select onChange={(e) => {setDef(e.target.value);}}> 
          {
          tables.map((o,i)=>{ if(def==0)setDef(tables[0].id);
           return(<option key={i} value={o.name}>{o.name} </option>)})  
           
          }        
        </select>
        
        <br/><br/><button className="btn btn-primary" onClick={()=>{
         if(Number(state)>=0 && state!=null)
         {
          const j={"id":products[Number(state)].id,"name": name,"price":Number(price),"amount":Number(stock),"departmentId":def};
          putTables(j);
         navigate("/Grids");
         }
        else
        { 
        const j={"id": id,"name": name,"price":Number(price),"amount":Number(stock),"departmentId":def}
        postTables(j);
        }}}>add product to db</button>
        
    </div>);
}
export default Products;