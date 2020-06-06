const UpdateObject=(oldState,UpdateSate)=>{
    return {
        ...oldState,
        ...UpdateSate
    }
}

export default UpdateObject