import React from "react";
import classes from './NavItem.module.css'


const Navitem=(props)=>{
    console.log(props.active)
    return(

    <li className={classes.NavItem}>
        <a className={props.active?classes.active:null} href='/'>
            {props.children}
        </a>
    </li>
    )
}

export default Navitem