import React from "react";
import classes from './input.module.css'

const Input=(props)=> {
    let InputHtml = null
    switch (props.inputtype) {
        case('input'):
            InputHtml =(<input className={classes.Input} {...props} />)
            break
        case('textarea'):
            InputHtml =(<textarea className={classes.Input} {...props} />)
            break
        default:
            InputHtml =(<input className={classes.Input} {...props} />)

    }
    return(
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {InputHtml}
        </div>)
}
export default Input