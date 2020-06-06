import React,{useState} from "react";
import Button from "../../../components/UI/Buttons/Buttons";
import classes from './ContractData.module.css'
import instance from "../../../Axios/axios";
import Spinner from "../../../components/UI/Spinner/Spinner";
import {withRouter} from "react-router-dom";
import Input from "../../../components/UI/input/input";
import {connect} from "react-redux";
import * as actionCreators from "../../../store/actions/orders";
import {Redirect} from "react-router-dom";

const   ContractData=(props)=>{
    // console.log(props)
    const [InputState,setInputstate]=useState(
        {customer: {
                name: {
                    elementType:'input',
                    elementConfig:{
                        type:'text',
                        placeholder:'Enter Your Name',

                    },
                    value:''
                },
                Address: {
                    elementType:'input',
                    elementConfig:{
                        type:'text',
                        placeholder:'Enter Your Address'
                    },
                    value:''
                },
                zipcode: {
                    elementType:'input',
                    elementConfig:{
                        type:'text',
                        placeholder:'Enter Your ZipCode'
                    },
                    value:''
                },
                country: {
                    elementType:'input',
                    elementConfig:{
                        type:'text',
                        placeholder:'Enter Your Country'
                    },
                    value:''
                },
                email: {
                    elementType:'input',
                    elementConfig:{
                        type:'email',
                        placeholder:'Enter Your Email'
                    },
                    value:''
                },
                deliveryMethod: {
                    elementType:'select',
                    elementConfig:{
                        options:[{value:'fastest',displayName:'Fastest'},
                                 {value:'cheapest',displayName:'Cheapest'}
                                ]
                    },
                    value:'fastest'
                },
            },spinner:false})

    const OrderHandler=(event)=>{
        event.preventDefault()
        setInputstate({customer:InputState.customer,spinner:InputState.spinner})
        props.purchaseHandlerStart()
        const FormData={}
        for(let element in InputState.customer){
            FormData[element]=InputState.customer[element].value
        }

        const order = {
            ingredients: props.ig,
            price: props.price,
            orderData:FormData,
            userID:props.userId
        }
        // console.log(FormData)
        // instance.post('/orders.json',order).then( response =>{
        //     console.log(response)
        //     setInputstate({customer:InputState.customer,spinner:false})
        //     props.history.push('/')
        // })
        // .catch( error => {
        //     console.log(error)
        //     setInputstate({customer: InputState.customer, spinner: false})
        // })

        props.purchaseHandler(order,props.token)
       // props.InitPurchased()
    }
    const changedHandler=(event,element)=>{
        const upperObject = {...InputState.customer}
        const childObject = {...upperObject[element]}
        childObject.value=  event.target.value
        upperObject[element]=childObject
        setInputstate({customer:upperObject,spinner:InputState.spinner})
    }

    const InputElements=[]
    let InputHtml= null
    for(let ele in InputState.customer){
        InputElements.push({
            ele:ele,
            config:InputState.customer[ele]
        })
    }
    InputHtml=InputElements.map((ele,key)=>(
        <Input changed={(event)=>changedHandler(event,ele.ele)}
               key={key} elementtype={ele.config.elementType}
                elementconfig = {ele.config.elementConfig}
               value={ele.config.value}
               />
    ))
    let FormHtml =(<form onSubmit={OrderHandler}>
                 {/*<Input label='Full Name:'  inputtype='input' type='text' name='Name' placeholder='Enter Your Name'/>*/}
                 {/*<Input label='Email Address:'  inputtype='input' type='text' name='Email' placeholder='Enter Your Email'/>*/}
                 {/*<Input label='Address:'  inputtype='input' type='text' name='Street' placeholder='Enter Your Street'/>*/}
                 {/*<Input label='PostalCode:' inputtype='input' type='text' name='PostalCode' placeholder='Enter Your PostalCode'/>*/}

                 {InputHtml}
                 <Button btntype='Success'>Order</Button>

            </form>)

     const returnHtml = (
         <div className={classes.ContactData}>
            <h4>Please Enter your Data!</h4>
            {props.spinner? <Spinner/> : FormHtml}
        </div>
     )
    let summary = <Redirect to='/'/>
    summary  = props.purchased ? summary : returnHtml
    return summary
}




const mapStateToProps=(state)=>{
    return{
        ig:state.BurgerBuilder.Ingredients,
        price:state.BurgerBuilder.price,
        spinner:state.Orders.spinner,
        purchased:state.Orders.purchased,
        token:state.Auth.idToken,
        userId:state.Auth.localId
    }
}

const mapDispatchToProps=(dispatch)=>{
    return{
        purchaseHandler:(order,token) => dispatch(actionCreators.purchaseHandler(order,token)),
        purchaseHandlerStart:()=> dispatch(actionCreators.purchaseHandlerStart())
    };
}


export default connect(mapStateToProps,mapDispatchToProps)(withRouter(ContractData))