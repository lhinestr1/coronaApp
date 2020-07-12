import React from 'react'
import NumberFormat from 'react-number-format';
import CountUp from 'react-countup'
 
//<NumberFormat value={number} displayType={'text'} thousandSeparator={true}/> 

const Card = ( {title, number, fatality, recovery_rate} ) => {

    const numero = number===undefined ? 0 : number;
    let footer = "";
    let style = "card-footer text-center"

    if(title=="Muertos"){
        footer = <NumberFormat value={fatality} displayType={'text'} prefix="Fatalidad: " suffix="%" decimalScale={1}/>
        style += " bg-danger"
    }

    if(title=="Recuperados"){
        footer = <NumberFormat value={recovery_rate} displayType={'text'}  prefix="Recuperación: " suffix="%" decimalScale={1}/>
        style += " bg-success" 
    }
    
    return (
        <div className="card mb-2">
            <div className="card-body p-1">
                <h5 className="card-title text-center pt-2">{title}</h5>
                <p className="text-muted text-center">
                    <CountUp end={numero} duration={1} suffix=" Personas" /* start={0} prefix="$" decimals={1}*/ />
                </p>
            </div>
            {
                footer != "" &&
                <div className={style}>
                    {footer}
                </div>
            }
            
        </div>
    )

}

export default Card