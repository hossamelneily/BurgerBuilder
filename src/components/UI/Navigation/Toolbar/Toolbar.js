import React from "react";
import classes from './Toolbar.module.css'
import Logo from "../../../Logo/Logo";
import Navitems from "../NavItems/NavItems";
import ToggleDrawer from "../SideDrawer/ToggleDrawer/ToggleDrawer";

const Toolbar=(props)=>(
    <header className={classes.Toolbar}>
       <ToggleDrawer clicked={props.clicked} />
        <Logo height="80%"/>
        <nav className={classes.DesktopOnly}>
            <Navitems/>
        </nav>
    </header>
)
export default Toolbar