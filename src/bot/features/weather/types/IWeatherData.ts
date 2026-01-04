interface WeatherData {
    location: {
        name: string;
        region: string;
        country: string;
    };
    current: {
        temp_c: number;
        condition: {
            text:string
        };
        wind_kph: number;
        humidity: number;
        feelslike_c: number;
    }
}

export default WeatherData;