import React from "react";
import BurgerIngredients from "./BurgerIngredients/BurgerIngredients";
import classes from './Burger.module.css'
import {withRouter} from "react-router-dom";

const Burger=(props)=>{
    console.log(props)
    let DynamicBurger=Object.keys(props.Ingredients).map((IgKey,index) => (
          [...Array(props.Ingredients[IgKey])].map((x, index) => <BurgerIngredients key={IgKey+index} type={IgKey}/>)



    )).reduce((arr,current)=>arr.concat(current),[])
    console.log(DynamicBurger)

    if(DynamicBurger.length ===0){

        DynamicBurger=(<p>Please fill in your sandwich!!</p>)
    }


    return(
        <div className={classes.Burger}>
            <BurgerIngredients type='bread-top'/>
            {/*<BurgerIngredients type='cheese'/>*/}
            {/*<BurgerIngredients type='meat'/>*/}
            {DynamicBurger}
            <BurgerIngredients type='bread-bottom'/>

        </div>
    )
}

export default withRouter(Burger)