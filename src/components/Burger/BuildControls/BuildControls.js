import React from "react";
import classes from './BuildControls.module.css'
import BuildControl from "../BuildControl/BuildControl";
const Controls = [
    {label:'Salad',type:'salad'},
    {label:'Cheese',type:'cheese'},
    {label:'Meat',type:'meat'},
    {label:'Bacon',type:'bacon'},
]

const BuildControls=(props)=>(
    <div className={classes.BuildControls}>

        <div>Current Price: <strong>{props.price.toFixed(2)} $ </strong></div>
        {Controls.map((ctrl,index) => <BuildControl
            key={ctrl.label}
            label={ctrl.label}
            add={()=> props.add(ctrl.type)}
            remove={() => props.remove(ctrl.type)}
            disabled={props.disabled[ctrl.type]}
        />)}
        <button disabled={!props.purchased} className={classes.OrderButton} onClick={props.Modal}>ORDER NOW!!</button>
    </div>
)

export default BuildControls