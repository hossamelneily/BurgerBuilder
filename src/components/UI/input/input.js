import React from "react";
import classes from './input.module.css'

const Input=(props)=> {
    let InputHtml = null
    // console.log(props)
    switch (props.elementtype) {
        case('input'):
            InputHtml =(<input onChange={props.changed} className={classes.InputElement} {...props.elementconfig} />)
            break
        case('textarea'):
            InputHtml =(<textarea onChange={props.changed} className={classes.InputElement} {...props.elementconfig} />)
            break
        case('select'):
            const options = props.elementconfig.options
            InputHtml= (<select onChange={props.changed} value={props.value} className={classes.InputElement} >{
                options.map((value,index) => (<option  key={index} value={value.value}>{value.displayName}</option>))
            }</select>)
            break
        default:
            InputHtml =(<input onChange={props.changed} className={classes.InputElement} {...props.elementconfig} />)

    }
    return(
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {InputHtml}
        </div>)
}
export default Input