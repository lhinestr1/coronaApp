import React from 'react'
import Card from './Card'


const List_card = ( { confirmed, deaths, recovered, recovery_rate, fatality } ) => {
    
    return (
        <div className="row">
            <div className="col-sm-4 px-3">
                <Card 
                    key="Confirmados" 
                    title="Confirmados" 
                    number={confirmed}/>
            </div>
            <div className="col-sm-4 px-3">
                <Card 
                    key="Recuperados"
                    title="Recuperados" 
                    number={recovered}
                    recovery_rate={recovery_rate}/>
            </div>
            <div className="col-sm-4 px-3">
                <Card 
                    key="Muertos"
                    title="Muertos" 
                    number={deaths}
                    fatality={fatality}/>
            </div>
        </div>
    )
}

export default List_card