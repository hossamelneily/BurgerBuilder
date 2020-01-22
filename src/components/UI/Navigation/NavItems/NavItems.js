import React from "react";
import classes from './NavItems.module.css'
import Navitem from "./NavItem/NavItem";
import Logo from "../../../Logo/Logo";

const Navitems=()=>(

    <ul className={classes.NavItems}>

        <Navitem active>Burger Builder</Navitem>
        <Navitem >Checkout</Navitem>
    </ul>
)

export default Navitems