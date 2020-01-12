import React from "react";
import WithClass from "../../../Hoc/Withclasses";
import Button from "../../UI/Buttons/Buttons";
const OrderSummary=(props)=>(

    <WithClass>
        <h3>Your Order</h3>
        <p>A delicious Burger with the Following Ingredients:</p>
        <ul>
            {Object.keys(props.Ingredients).map((Ingkey,index)=> <li key={index}>
                <span style={{textTransform:'capitalize'}}>{Ingkey} : {props.Ingredients[Ingkey]}</span>
            </li>)}
        </ul>
            <p><strong>Total Price: {props.price} $</strong></p>
        <p>Continue to Checkout?</p>
        <Button btntype='Success' clicked={props.clicked_S}>
                CONTINUE
        </Button>

        <Button btntype='Danger'
                clicked={props.clicked_D}>
                CANCEL
        </Button>

    </WithClass>
)

export default OrderSummary