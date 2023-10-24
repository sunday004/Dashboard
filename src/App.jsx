import React, { useState, useEffect} from 'react';
import './App.css';
import WeatherInfo from './Components/WeatherInfo';
import Card from './Components/Card';
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

  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const searchItems = searchValue => {
    setSearchInput(searchValue);
    if (searchValue !== "") {
      const filteredData = list.filter((items) => //Object.keys(items).filter((item) => 
        Object.values(items)
          .join("")
          .toLowerCase()
          .includes(searchValue.toLowerCase()) || Object.values(items.weather).join("").toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(Object.keys(list));
    }
  };

  return (
    <div className='whole-page'>
      <div className='summary'>
        <Card 
          name = 'High Temperature'
          value = '19.6'
        />
        <Card
          name = 'Dominant Cloud Type'
          value = 'Overcast Cloud'
        />
        <Card
          name = 'Total Data Entries'
          value = '24'
        />
      </div>
        <div className='container'>
        <input
          type="text"
          placeholder="Search date and temperature..."
          onChange={(event) => searchItems(event.target.value)}
        />
        <select name="description filter" id="" onChange={(event) => searchItems(event.target.value)}>
          <option value="" placeholder='filter description'>filter description</option>
          <option value="Overcast">Overcast</option>
          <option value="Scattered">Scattered Clouds</option>
          <option value="Clear Sky">Clear Sky</option>
          <option value="Broken Clouds">Broken Clouds</option>
          <option value="Few Clouds">Few Clouds</option>
        </select>
        <table>
          <tbody>
              <tr>
                <td><b>Date and Time</b></td>
                <td><b>Temperature (Celsius)</b></td>
                <td><b>Description</b></td>
              </tr>
              {searchInput.length > 0 ?
                  filteredResults.map((item, index) => (
                    <tr key={index}>
                      <WeatherInfo
                        datetime={item.datetime}
                        temperature={item.temp}
                        description={item.weather.description}
                      />
                    </tr>
                  ))
              : list.length > 0 ? (
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
                )
              }
          </tbody>
        </table>
        </div>
    </div>
  );
}

export default App;
