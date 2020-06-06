import React from "react";
import classes from './Order.module.css'


const Order=(props)=> {



    return(

        <div className={classes.Order}>
            <p>Ingredients:
           {Object.entries(props.ig).map(([key,value],index)=>
               <span
               key={index}
               style={{textTransform:'capitalize',
                   display:"inline-block",
                   margin:'0 8px',
                   border:'1px solid #ccc',
                   padding:'5px'
               }}>
                   {key}({value})
               </span>
           )}
           </p>
           <p>Price:<strong>{props.price.toFixed(2)} $ </strong></p>
        </div>
    )
}



export default Order