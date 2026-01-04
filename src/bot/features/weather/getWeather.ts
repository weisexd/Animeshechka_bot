import axios, { Axios, AxiosError } from "axios";
import WeatherRes from "./types/IWeatherRes";
import WeatherData from "./types/IWeatherData";

const getWeather = async (city: string): Promise<WeatherRes> => {
    try {
        if (!process.env.WEATHER_API_TOKEN) {
            return {
                success: false,
                error: 'API token not define'
            };
        }

        const TOKEN = process.env.WEATHER_API_TOKEN;
        const BASE_URL = 'https://api.weatherapi.com/v1'

        const weatherAPI = axios.create({
            baseURL: BASE_URL,
            params: {
                key: TOKEN,
                lang: 'ru'
            },
            timeout: 5000
        });

        const response = await weatherAPI.get<WeatherData>('current.json', {
            params: {q: city}
        });

        return {
            success: true,
            data: response.data
        };
    }
    catch (error) {
        console.log(`[Weather] Error while fetching weather data: `, error);

        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError;

            if (axiosError.response?.status === 400) {
                return { success: false, error: 'Город не найден'}
            }
            if (axiosError.code === 'ECONNABORTED') {
                return { success: false, error: 'Превышено время ожидания'}
            }
        }

        return { success: false, error: 'Unknown error'}
    }
}

export default getWeather;