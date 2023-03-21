import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import React from 'react';
import {useState}from 'react';
import axios from 'axios';
import { variables } from './variables';
import { useNavigate } from 'react-router-dom';

function Grids() {  

    const [tables, setTables] = useState([]);
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

   const handleClick1 = async(i) => 
   {
        navigate("/AddClass", { state:i.toString() });
   };
   const handleClick2 = async(i) => 
   {
        navigate("/Products", { state:i.toString() });
   };
   const getTables = async() => 
   {
        axios.get(variables.ApiUrl+'departments/GetDepartment').then((response) => {
        const category = response.data.map(res => res)
        setTables(category);});       
   };
    const getProducts = async() => 
    {
        axios.get(variables.ApiUrl+'products/GetProduct').then((response) => {
        const category = response.data.map(res => res)
        setProducts(category);});
    };
    const deleteProduct= async(i) => 
    {
      axios.delete(variables.ApiUrl+'departments/DeleteDepartment/'+(i))
      .then((respons)=>{console.log('success!!!')})
      .catch((err)=>{console.log(err)})
    };
    const deleteDep= async(i)=>
    {
      axios.delete(variables.ApiUrl+'products/DeleteProduct/'+(i))
      .then((respons)=>{console.log('success!!!')})
      .catch((err)=>{console.log(err)})
    };
    React.useEffect(() => 
    {
            getTables();
            getProducts();
    });

 return (
 <div><Box>
  
<p>class:</p>
    <ul style={{ listStyleType:'none'}}>
    { tables.map((o,i)=>{
      return(
      <li key={i}>{o.name}
      <button onClick={()=>{deleteProduct(tables[i].id)}}>delete</button>
      <button type="submit" onClick={() => { handleClick1(i);}}>edit</button>
    </li>
      )})
    }
    </ul>

<p>products:</p>
    <ul style={{ listStyleType:'none'}}>
    { products.map((o,i)=>{
      return(
      <li key={i}>{o.name} 
      <button onClick={()=>{deleteDep(products[i].id)}}>delete</button>
      <button type="submit" onClick={() => { handleClick2(products[i].id);}}>edit</button></li>
      )})
    }     
    </ul>

</Box> </div>);  
}
export default Grids;