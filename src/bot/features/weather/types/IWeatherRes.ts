import WeatherData from "./IWeatherData";

interface WeatherError {
    success: false;
    error: string;
}

interface WeatherSuccess {
    success: true;
    data: WeatherData;
}

type WeatherRes = WeatherSuccess | WeatherError;

export default WeatherRes;