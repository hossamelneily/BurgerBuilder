import React from "react";
import burgerlogo from '../../assets/images/burger-logo.png'
import classes from './Logo.module.css'


const Logo=(props)=>(
    <div className={classes.logo} style={{height:props.height}}>
        <img src={burgerlogo}/>
    </div>
)

export default Logo