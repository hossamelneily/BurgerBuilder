import React from "react";
import classes from './BuildControl.module.css'

const BuildControl=(props)=>(

    <div className={classes.BuildControl}>
        <div className={classes.Label}>{props.label}</div>
        <button className={classes.More} onClick={props.add}> Add</button>
        <button className={classes.Less} onClick={props.remove} disabled={props.disabled}>Remove</button>
    </div>
)

export default BuildControl