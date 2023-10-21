import React, { useState, useEffect} from 'react';
import './App.css';
import WeatherInfo from './Components/WeatherInfo';
const API_KEY = import.meta.env.VITE_APP_API_KEY;

function App() {
  const [list, setList] = useState([]);

  useEffect(() => {
    const fetchAllWeatherData = async () => {
      try {
        const response = await fetch(
          "https://api.weatherbit.io/v2.0/history/hourly?lat=35.775&lon=-78.638&start_date=2023-10-17&end_date=2023-10-18&tz=local&key=" + API_KEY
        );
        const json = await response.json();
        setList(json.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchAllWeatherData();
  }, []);

  const searchItems = (query) => {
    // Implement search functionality here
  }

  return (
    <div className='whole-page'>
      <input
        type="text"
        placeholder="Search..."
        onChange={(event) => searchItems(event.target.value)}
      />
      <table>
        <tbody>
          <tr>
            <td><b>Date and Time</b></td>
            <td><b>Temperature</b></td>
            <td><b>Description</b></td>
          </tr>
          {list.length > 0 ? (
            list.map((item, index) => (
              <tr key={index}>
                <WeatherInfo
                  datetime={item.datetime}
                  temperature={item.temp}
                  description={item.weather.description}
                />
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No Data</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;
