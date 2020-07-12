export const ADD_COUNTRIES = "ADD_COUNTRIES"
export const ADD_PROVINCES = "ADD_PROVINCES"


/************** CREADORES DE ACCIONES */
export const addCountries = (countries)=> {
    return {
       type: ADD_COUNTRIES,
       payload: {
        countries
       }
   }
 }

 export const addProvinces = (provinces)=> {
  return {
     type: ADD_PROVINCES,
     payload: {
      provinces
     }
 }
}