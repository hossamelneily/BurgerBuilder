import React from "react";
import BurgerIngredients from "./BurgerIngredients/BurgerIngredients";
import classes from './Burger.module.css'
import {withRouter} from "react-router-dom";

const Burger=(props)=>{


      let  DynamicBurger =Object.keys(props.Ingredients).map((IgKey,index) => (
          [...Array(props.Ingredients[IgKey])].map((x, index) => <BurgerIngredients key={IgKey+index} type={IgKey}/>)
    )).reduce((arr,current)=>arr.concat(current),[])

    DynamicBurger = DynamicBurger.length ===0 ? <p>Please fill in your sandwich!!</p>:DynamicBurger


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