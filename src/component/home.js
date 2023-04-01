import React from 'react';
import { NavLink as Link } from 'react-router-dom';

function Home() {

    return (<div>
        home page<br/>
        <Link to='/DepartmentMain'>add table</Link><br/>
        <Link to='/ProductMain'>add products</Link><br/>
        <Link to='/Grids'>show all</Link>
    </div>);
}
export default Home;
