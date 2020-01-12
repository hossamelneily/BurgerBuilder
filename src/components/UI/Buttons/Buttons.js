import React from "react";
import classes from './Buttons.module.css'


const Button=(props)=>(
    <button onClick={props.clicked} className={[classes.Button,classes[props.btntype]].join(' ')}>
        {props.children}
    </button>
)

export default Button