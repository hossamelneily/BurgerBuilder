import React from "react";
import classes from './NavItems.module.css'
import Navitem from "./NavItem/NavItem";
import Logo from "../../../Logo/Logo";

const Navitems=(props)=>(

    <ul className={classes.NavItems}>

        <Navitem link='/'>Burger Builder</Navitem>
        {props.token  ?<Navitem link='/orders' >Orders</Navitem> : null}
        {!props.token ? <Navitem link='/auth' > Authenticate</Navitem>:
        <Navitem link='/logout' >Logout</Navitem>}
    </ul>
)







export default Navitems