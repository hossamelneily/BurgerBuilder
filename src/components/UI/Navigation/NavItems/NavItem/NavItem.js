import React from "react";
import classes from './NavItem.module.css'
import {Link,NavLink} from "react-router-dom";
import Orders from "../../../../Order/Order";

const Navitem=(props)=>{
    // console.log(props.active)
    return(

    <li className={classes.NavItem}>
        <NavLink exact activeClassName={classes.active} to={{
            pathname:props.link
        }}>
            {props.children}
        </NavLink>
    </li>
    )
}

export default Navitem