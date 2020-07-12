//actions 
import { ADD_COUNTRIES, ADD_PROVINCES } from '../actions/countryActions'


const initialState = {
    countries: [],
    provinces: []
}
function reducer(store=initialState, action){

    const type = action.type;
    const payload = action.payload;
    switch(type){
        case ADD_COUNTRIES:
            return {
                ...store,
                countries: payload
            }
        case ADD_PROVINCES:
            return {
                ...store,
                provinces: payload
            }
        default:
            return store
    }

}


export default reducer