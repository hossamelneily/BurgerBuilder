import React from "react";
import classes from './NavItems.module.css'
import Navitem from "./NavItem/NavItem";
import Logo from "../../../Logo/Logo";

const Navitems=()=>(

    <ul className={classes.NavItems}>

        <Navitem link='/'>Burger Builder</Navitem>
        <Navitem link='/orders' >Orders</Navitem>
    </ul>
)

export default Navitems