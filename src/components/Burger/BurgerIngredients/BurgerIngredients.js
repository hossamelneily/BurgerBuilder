import React from "react";
import classes from './BurgerIngredients.module.css'
import PropTypes from "prop-types";

const BurgerIngredients=(props)=> {
    let Ingredients = null
    switch(props.type) {
        case("bread-bottom"):
            Ingredients = (
                <div className={classes.BreadBottom}></div>
            )
            break
        case("bread-top"):
            Ingredients =(
                <div className={classes.BreadTop}>
                    <div className={classes.Seeds1}></div>
                    <div className={classes.Seeds2}></div>
                </div>
            )
            break
        case("meat"):
            Ingredients =(
                <div className={classes.Meat}></div>
            )
            break
        case("bacon"):
            Ingredients =(
                <div className={classes.Bacon}></div>
            )
            break
        case("cheese"):
            Ingredients =(
                <div className={classes.Cheese}></div>
            )
            break
        case("salad"):
            Ingredients =(
                <div className={classes.Salad}></div>
            )
            break
        default:
            Ingredients =null


    }
    return Ingredients
}

BurgerIngredients.propTypes = {
  type: PropTypes.string.isRequired,

};
export default BurgerIngredients
