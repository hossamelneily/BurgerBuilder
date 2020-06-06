import React ,{useState,useEffect} from "react";
import Order from "../../../components/Order/Order";
import instance from "../../../Axios/axios";
import {connect} from "react-redux";
import Spinner from "../../../components/UI/Spinner/Spinner";
import * as actionTypes from '../../../store/actions/actionTypes'
import * as actionCreators from "../../../store/actions/BurgerBuilder";
import * as OrdersActionCreators from "../../../store/actions/orders";

const Orders=(props)=> {

    const [spinner ,setspinner] =useState(false)
    const [OrdersState,setOrdersState] = useState([])



    useEffect(()=>{
        setspinner(true)
        instance.get('/orders.json?auth='+props.token).then(
        (response) => {
             const Orders=[]
            Object.entries(response.data).map(([key,value],index)=>{
                Orders.push({
                   ...value,
                    id:key

                })
            })
            setOrdersState(Orders)
            setspinner(false)

        }
    ).catch(
        (error)=>{
            setspinner(false)
            console.log(error)
    })
    },[])


    let OrdersHtml = (OrdersState.map((value)=>(
                <Order key={value.id}
                       ig={value.ingredients}
                       price={value.price}
                />
                )))

    console.log(props.orders)


    let SpinneHtml = props.spinner ? <Spinner/> : OrdersHtml



    return(
        <div>
            {SpinneHtml}
        </div>
    )
}

const mapStateToProps=(state)=>{
    return{
        orders: state.Orders.orders,
        token : state.Auth.idToken,
        spinner:state.Orders.spinner,
        userId : state.Auth.localId

    }
}
const mapDispatchToProps=(dispatch)=>{
    return{
        FetchInit : () => dispatch(OrdersActionCreators.fetch_start()),
        FetchHandler : (token,userid) => dispatch(OrdersActionCreators.FetchHandler(token,userid))
    };
}
export default connect(mapStateToProps,mapDispatchToProps)(Orders)