import React, { useEffect } from 'react';
import axios from 'axios';
import {useState} from 'react';
import { variables } from './variables';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function AddClass() 
{
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const [id, setId] = useState(0);
    const {state}=useLocation();
    const [categList, setCategList] = useState([]);
    const navigate = useNavigate();

    const getItems = async() => {
      axios.get(variables.ApiUrl+'departments/GetDepartment').then((response) => {
      const categoryNames = response.data;
      setCategList(categoryNames);
      });};

    const putDep=async(j)=>{
      axios.put(variables.ApiUrl+'departments/PutDepartment',j)
      .then((respons)=>{console.log('success!!!')})
      .catch((err)=>{console.log(err)})};

    const postDep=async(j)=>{
      axios.post(variables.ApiUrl+'departments/PostDepartment',j)
     .then((respons)=>{console.log('success!!!')})
     .catch((err)=>{console.log(err)})};
   
    useEffect(() => {
      getItems();

    });
    return (
    <div>
      <h4>-add department-</h4>
      <h1>{state}</h1>
        <p>department name:</p>
        <input type="text" onChange={(e) => {setName(e.target.value); }}></input>
        <p>department description:</p>
        <input type="text" onChange={(e) => {setDesc(e.target.value); }}></input><br/>
        <br/>

        <button onClick={()=>{  
          if(categList.includes(name.trim())) 
          {
            console.log ('faild the value is alredy exists !!!')
          }
          else
          {
            if(Number(state)>=0 &&  state!=null)
            {
              const i=Number(state);
              const j={"id":categList[i].id,"name": name,"descrption":desc};
              putDep(j);
              navigate("/Grids");
            }else
            {
            const j={"id":id,"name": name,"descrption":desc};postDep(j);}
          }}}> add table</button>
    </div>
    );
}
export default AddClass;
