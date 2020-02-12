import React from "react";
import classes from './input.module.css'

const Input=(props)=> {
    let InputHtml = null
    console.log(props)
    switch (props.elementtype) {
        case('input'):
            InputHtml =(<input className={classes.Input} {...props.elementconfig} />)
            break
        case('textarea'):
            InputHtml =(<textarea className={classes.Input} {...props.elementconfig} />)
            break
        default:
            InputHtml =(<input className={classes.Input} {...props.elementconfig} />)

    }
    return(
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {InputHtml}
        </div>)
}
export default Input