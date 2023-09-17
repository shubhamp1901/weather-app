import "./App.css";
import search_icon from "./Assets/search.png";
import { useState } from "react";
import WeatherData from "./WeatherData";

function App() {
  const [city, setCity] = useState("");
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState("");

  const api_key = "5c2ddad15d5b735a368759cfe366baeb";
  const BASE_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api_key}`;

  const searchCity = (e) => {
    setCity(e.target.value);
  };

  const handleClick = async () => {
    setIsLoading(true);

    try {
      setErr("");
      const response = await fetch(BASE_URL, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }

      const result = await response.json();

      setData(result);
      console.log(data)
      setCity("");
    } catch (err) {
      setErr(err.message);
      setCity("");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      {/* top bar */}
      <div className="top-bar">
        <input
          type="text"
          placeholder="Search City..."
          className="cityInput"
          value={city}
          onChange={searchCity}
        />
        <div className="search-icon" onClick={handleClick}>
          <img src={search_icon} alt="" />
        </div>
      </div>

      {isLoading && (
        <h2
          style={{
            display: "flex",
            justifyContent: "center",
            color: "#fff",
            marginTop: "30px",
          }}
        >
          Loading...
        </h2>
      )}

      {err || !data ? (
        <h2
          style={{
            display: "flex",
            justifyContent: "center",
            color: "#fff",
            marginTop: "30px",
          }}
        >
          No Data Found!
        </h2>
      ) : (
        <WeatherData data={data} />
      )}
    </div>
  );
}

export default App;
