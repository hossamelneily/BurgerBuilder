import React, {Fragment, useState} from "react";
import WithClass from "../../Hoc/Withclasses";
import classes from "./Layout.module.css"
import Toolbar from "../UI/Navigation/Toolbar/Toolbar";
import SideDrawer from "../UI/Navigation/SideDrawer/SideDrawer";
// import SDClasses from '../UI/Navigation/SideDrawer/SideDrawer.module.css'
import {connect} from "react-redux";

const Layout=(props)=> {



     const [SideDrawerState,SideDrawerStateUseState]=useState({show:false})

    const SideDrawerHandler=()=>(
        SideDrawerStateUseState({show:!SideDrawerState.show})
    ) //need to change the state properly


   return (

        <Fragment>
               <Toolbar
                   token={props.token}
                   clicked={SideDrawerHandler}/>
                <SideDrawer
                    token={props.token}
                    show={SideDrawerState.show}
                    clicked={SideDrawerHandler}/>
                <main className={classes.Content}>
                        {props.children}
                </main>
        </Fragment>

)}

const mapStateToProps=(state)=>{
    return{
        token:state.Auth.idToken
    }
}

export default connect(mapStateToProps)(Layout)