import React,{Fragment} from "react";
import classes from './Modal.module.css'
import WithClass from "../../../Hoc/Withclasses";
import Backdrop from "../Backdrop/Backdrop";
import Aux from "../../../Hoc/Aux";


const Modal=(props)=> {

 const styleCoded =[classes.Modal]
    if(props.Modal){
        styleCoded.push(classes.Open)
    }else{
         styleCoded.push('Close')
    }
    console.log(styleCoded.join(' '))
   return(

    <Fragment>
        <Backdrop click={props.click} show={props.show}/>
        <div   className={styleCoded.join(' ')}>

            {props.children}
        </div>
    </Fragment>
   )
}

export default Modal


// {transform:props.Modal? classes.Open:classes.Close,
//         opacity:props.Modal?classes.Open:classes.Close}