import React from "react";
import axios from "axios";
import { useState } from "react";

export default function Form(event) {
  const [city, setCity] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [temperature, setTemperature] = useState(null);
  const [description, setDescription] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [wind, setWind] = useState(null);

  function showTemperature(response) {
    setLoaded(true);
    setTemperature(response.data.main.temp);
    setDescription(response.data.weather[0].main);
    setHumidity(response.data.main.humidity);
    setWind(response.data.wind.speed);
  }

  function handleSubmit(event) {
    event.preventDefault();
    let apiKey = "45c2ae80aba9c65861438f92a0490028";
    let units = "metric";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

    axios.get(apiUrl).then(showTemperature);
    return <div></div>;
  }

  let form = (
    <form onSubmit={handleSubmit}>
      <input
        type="search"
        placeholder="Type city name..."
        onChange={updateCity}
      />
      <input type="submit" title="Search" />
    </form>
  );

  function updateCity(event) {
    setCity(event.target.value);
  }
  if (loaded === false) {
    return form;
  } else {
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="search"
            placeholder="Type city name..."
            onChange={updateCity}
          />
          <input type="submit" title="Search" />
        </form>
        <ul>
          <li>Location: {city}</li>
          <li>Temperature: {Math.round(temperature)}ºC</li>
          <li>Description: {description}</li>
          <li>Humidity: {humidity}%</li>
          <li>Wind: {wind} km/h</li>
        </ul>
      </div>
    );
  }
}
