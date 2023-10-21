import React, { useState, useEffect } from "react";
const API_KEY = import.meta.env.VITE_APP_API_KEY;

const WeatherInfo = ({datetime, temperature, description})=>{
    return (
        <>
            <td>{datetime}</td> 
            <td>{temperature}</td>
            <td>{description}</td>
       </>
    )
}

export default WeatherInfo;