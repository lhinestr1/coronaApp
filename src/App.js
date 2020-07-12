import React,  {useEffect, useState} from 'react';
import {connect} from 'react-redux'

//components
import List_card from './components/List_card'

//actions redux
import { addCountries, addProvinces } from './redux/actions/countryActions'

function App( {add_countries,  countries }  ) {

  const [state, setstate] = useState({
    confirmed: 0,
    recovered: 0,
    deaths: 0,
    fatality: 0,
    recovery_rate: 0,
  })

  const [provinces,setprovinces] = useState([])

  const handlerCountries = (event) => {
    let country = event.target.value;
    search_data(country)
    search_provinces(country)
  }

  const handlerProvince= (e) => {
    //let province = e.target.value;
    let index = e.target.selectedIndex;
    let optionElement = e.target.childNodes[index]
    let deaths =  optionElement.getAttribute('deaths');
    let recovered =  optionElement.getAttribute('recovered');
    let confirmed =  optionElement.getAttribute('confirmed');
    setstate({
      ...state,
      confirmed: confirmed,
      recovered: recovered,
      deaths: deaths,
      fatality: (deaths * 100) / confirmed,
      recovery_rate: (recovered * 100) / confirmed
    })
  }


  const search_data = (country="") => {

    const detail = country=="" ? "" : "countries/"+country

    fetch(`https://covid19.mathdro.id/api/${detail}`)
      .then(
        response => response.json() 
      ).then(
        response => {
          setstate({
            ...state,
            confirmed: response.confirmed.value,
            recovered: response.recovered.value,
            deaths: response.deaths.value,
            fatality: (response.deaths.value * 100) / response.confirmed.value,
            recovery_rate: (response.recovered.value * 100) / response.confirmed.value
          })
        }
      )    
  }


  const search_data_province = (country="") => {
    alert("Buscar dato province")    
  }


  function search_provinces(country){

    setprovinces([])

    fetch(`https://covid19.mathdro.id/api/countries/${country}/confirmed`)
      .then(
        response => response.json() 
      ).then(
        data => {
          let provi = data.map( value => {
            return { 
                      provinceState: value.provinceState, 
                      countryRegion: value.countryRegion, 
                      confirmed: value.confirmed, 
                      deaths: value.deaths , 
                      recovered: value.recovered }
          } )
          setprovinces(provi)
        }
      )
  }

  
  useEffect(() => {

    search_data()
    
    fetch("https://covid19.mathdro.id/api/countries")
      .then(
        response =>  response.json() 
      ).then(
        response => {
          add_countries(response.countries)
        }
      )

  },[])
  

  return (
      <div className="App">
        <h1 className="text-center">CORONA APP</h1>
        <div className="row">
          <div className="col p-4">
            <select  name="country" className="form-control" onChange={handlerCountries}>
            <option key="0" value="">Mundial</option>
              { 
                countries ?
                  countries.map((value) =>
                    <option key={value.iso2} value={ value.name }>{value.name}</option>
                  )
                :
                ""
              }
            </select>
          </div>
          {
            provinces.length>0 &&
            <div className="col p-4">
              <select  name="country" className="form-control" onChange={handlerProvince}>
              <option key="0" value="">--</option>
                { 
                  provinces.map((value) =>
                      <option 
                        key={value.uid} 
                        deaths={value.deaths} 
                        recovered={value.recovered} 
                        confirmed={value.confirmed} 
                        value={value.name}
                      >{value.provinceState || value.countryRegion}</option>
                  )
                }
              </select>
            </div>
          }
        </div>
        <List_card 
          confirmed={state.confirmed}
          recovered={state.recovered}
          deaths={state.deaths}
          recovery_rate={state.recovery_rate}
          fatality={state.fatality}
          recovery_rate={state.recovery_rate}
        />
      </div>
  );
}

const mapStateToPros = (state) => ({
  countries: state.countries.countries
})

const mapDispatchtoProsp = (dispatch) => ({
  add_countries: (countries) => dispatch(addCountries(countries))
})

export default connect(mapStateToPros, mapDispatchtoProsp)(App);
