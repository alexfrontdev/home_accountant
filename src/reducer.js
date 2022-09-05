
const initialState = {
    balance: 10000,
    transactions: [ { id: 1,name: 'получил зарплату',sum: 10000,status:'2', date: '1.1.2022' }],  
}

const reducer = (state = initialState, action) => {
        switch (action.type) {
            case 'ADD_TRANSACTION':
            return {
                ...state, 
                transactions : [...state.transactions,action.payload],
            }
            case 'SUBTRACT_SUM':
                return {
                    ...state,
                    balance: action.payload
                }
                case 'ADD_SUM':
                return {
                    ...state,
                    balance: action.payload
                }
            default: return state;
        }
}

export default reducer;