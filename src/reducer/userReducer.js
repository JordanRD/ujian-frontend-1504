const initialState = {
    email: '',
    password: '',
    cart: [],
    history:[],
    id:''
}

export default (state = initialState, action) => {
    switch (action.type) {

    case 'LOGIN':
            return { 
                ...state,
            email:action.payload.email,
            password:action.payload.password,
            cart:action.payload.cart,
            history:action.payload.history,
            id:action.payload.id
         }
        case 'LOGOUT':
            return {
                initialState
            }
    default:
        return state
    }
}
