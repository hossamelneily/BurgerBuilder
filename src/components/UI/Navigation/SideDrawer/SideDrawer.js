import React ,{Fragment,useState} from "react";
import classes from './SideDrawer.module.css'
import Navitems from "../NavItems/NavItems";
import Logo from "../../../Logo/Logo";
import Backdrop from "../../Backdrop/Backdrop";
const SideDrawer=(props)=>{


    let SideDrawerClasses=[classes.SideDrawer,classes.Close]
    if(props.show){
        SideDrawerClasses=[classes.SideDrawer,classes.Open]
    }

    return(
    <Fragment>
        <Backdrop show={props.show} click={props.clicked}/>
        <div className={SideDrawerClasses.join(' ')} onClick={props.clicked}>
            <Logo height='11%'/>
            <nav>
                <Navitems/>
            </nav>
        </div>
    </Fragment>
    )
}

export default SideDrawer