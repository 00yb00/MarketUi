import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import React from 'react';
import {useState}from 'react';
import axios from 'axios';
import { variables } from './variables';
import { useNavigate } from 'react-router-dom';
import Table from 'react-bootstrap/Table';

function Grids() {  

    const [tables, setTables] = useState([]);
    const [products, setProducts] = useState([]);
    const [productsView, setProductsView] = useState([]);

    const navigate = useNavigate();

   const handleClick1 = async(i) => 
   {
        navigate("/DepartmentMain", { state:i.toString() });
   };
   const handleClick2 = async(i) => 
   {
        navigate("/ProductMain", { state:i.toString() });
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
    const getProductsView = async() => 
    {
        axios.get(variables.ApiUrl+'products/GetProductVeiw').then((response) => {
        const category = response.data.map(res => res)
        setProductsView(category);});
    };
    const deleteProduct= async(i) => 
    {
      axios.delete(variables.ApiUrl+'products/DeleteProduct'+(i))
      .then((respons)=>{console.log('success!!!')})
      .catch((err)=>{console.log(err)})
    };
    const deleteDep= async(i)=>
    {
      axios.delete(variables.ApiUrl+'departments/DeleteDepartment/'+(i))
      .then((respons)=>{console.log('success!!!')})
      .catch((err)=>{console.log(err)})
    };
    React.useEffect(() => 
    {
            getTables();
            getProducts();
            getProductsView();
    });

 return (
 <div style={{height:'50%',width:'50%',marginLeft:'25%'}}>
  <h3>-all tables-</h3><br/>
   <Table striped  >
        <thead>
        <tr >
          <th>id</th>
          <th>name</th>
          <th>descrption</th>
        </tr>
      </thead>
  <tbody>  
    { tables.map((o,i)=>{
      return( 
      <tr key={i} style={{ listStyleType:'none'}}>
      <th>{o.id}</th><th>{o.name}</th><th>{o.descrption}</th>
      <th><button className="btn btn-primary" onClick={()=>{deleteDep(o.id)}}>delete</button></th>
      <th><button className="btn btn-primary" type="submit" onClick={() => { handleClick1(i);}}>edit</button></th>
        </tr>
      )})
    }
    </tbody>
</Table>
<Table striped>
<thead>
        <tr >
          <th>id</th>
          <th>name</th>
          <th>price</th>
          <th>amount</th>
          <th>category</th>
        </tr>
      </thead>
<tbody>  
    { productsView.map((o,i)=>{
      return(
      <tr key={i} style={{ listStyleType:'none'}} > 
      <th >{o.id}</th><th>{o.name}</th><th >{o.price}</th><th >{o.amount}</th><th >{o.departmentName}</th>
      <th><button className="btn btn-primary" onClick={()=>{deleteProduct(o.id)}}>delete</button></th>
      <th><button className="btn btn-primary" type="submit" onClick={() => { handleClick2(i);}}>edit</button></th> 
       </tr>)})
    }       
</tbody>
</Table>
 </div>);  
}
export default Grids;