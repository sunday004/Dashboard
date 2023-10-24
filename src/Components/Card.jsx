import React from 'react';
const API_KEY = import.meta.env.VITE_APP_API_KEY;


const Card = ({name, value}) =>{
    return(
        <>
        <div>
            <h3>{name}</h3>
            <h2>{value}</h2>
        </div>
        </>
    )
}
export default Card;