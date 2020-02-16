import React,{useState} from "react";
import Button from "../../../components/UI/Buttons/Buttons";
import classes from './ContractData.module.css'
import instance from "../../../Axios/axios";
import Spinner from "../../../components/UI/Spinner/Spinner";
import {withRouter} from "react-router-dom";
import Input from "../../../components/UI/input/input";
import {connect} from "react-redux";

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
                    value:''
                },
            },spinner:false})

    const OrderHandler=(event)=>{
        event.preventDefault()
         setInputstate({customer:InputState.customer,spinner:true})
        const FormData={}
        for(let element in InputState.customer){
            FormData[element]=InputState.customer[element].value
        }

        const order = {
            ingredients: props.ig,
            price: props.price,
            orderData:FormData
        }
        console.log(FormData)
        instance.post('/orders.json',order).then( response =>{
            console.log(response)
            setInputstate({customer:InputState.customer,spinner:false})
            props.history.push('/')
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
    // if(props.spinner){
    //     SpinnerHtml=(<Spinner/>)
    // }

    return(
        <div className={classes.ContactData}>
            <h4>Please Enter your Data!</h4>
            {InputState.spinner? <Spinner/> : FormHtml}
        </div>
    )
}

const mapStateToProps=(state)=>{
    return{
        ig:state.Ingredients,
        price:state.price
    }
}


export default connect(mapStateToProps)(withRouter(ContractData))