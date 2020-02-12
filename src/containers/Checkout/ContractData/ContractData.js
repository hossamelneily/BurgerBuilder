import React,{useState} from "react";
import Button from "../../../components/UI/Buttons/Buttons";
import classes from './ContractData.module.css'
import instance from "../../../Axios/axios";
import OrderSummary from "../../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../../components/UI/Spinner/Spinner";
import {withRouter} from "react-router-dom";
import Input from "../../../components/UI/input/input";

const   ContractData=(props)=>{
    console.log(props)
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
                    value:''
                },
            },spinner:true})
    const OrderHandler=(event)=>{
        const FormData={}
        for(let element in InputState.customer){
            FormData[element]=InputState.customer[element].value
        }

        const order = {
            ingredients: {...props.Ingredients},
            price: props.price,
            orderData:FormData
        }


        instance.post('/orders.json',order).then( response =>{
            console.log(response)
            setInputstate({customer:InputState.customer,spinner:false})
        })
        .catch( error => {
            console.log(error)
            setInputstate({customer: InputState.customer, spinner: false})
        })
    }
    const changedHandler=(event,element)=>{
        const upperObject = {...InputState.customer}
        const childObject = {...upperObject[element]}
        childObject.value=  event.target.value
        upperObject[element]=childObject
        setInputstate({customer:upperObject})
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
    let SpinnerHtml =(<form onSubmit={OrderHandler}>
                 {/*<Input label='Full Name:'  inputtype='input' type='text' name='Name' placeholder='Enter Your Name'/>*/}
                 {/*<Input label='Email Address:'  inputtype='input' type='text' name='Email' placeholder='Enter Your Email'/>*/}
                 {/*<Input label='Address:'  inputtype='input' type='text' name='Street' placeholder='Enter Your Street'/>*/}
                 {/*<Input label='PostalCode:' inputtype='input' type='text' name='PostalCode' placeholder='Enter Your PostalCode'/>*/}

                 {InputHtml}
                 <Button btntype='Success' >Order</Button>

            </form>)
    if(props.spinner){
        SpinnerHtml=(<Spinner/>)
    }

    return(
        <div className={classes.ContactData}>
            <h4>Please Enter your Data!</h4>
            {SpinnerHtml}
        </div>
    )
}
export default withRouter(ContractData)