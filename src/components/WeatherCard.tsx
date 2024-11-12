
import React, { useState, useEffect } from 'react';

interface WeatherData {
  location: string;
  temperature: number;
  description: string;
}

const mapWeatherCodeToDescription = (weatherCode: number): string => {
  const weatherDescriptions: { [key: number]: string } = {
    0: 'Clear sky',
    1: 'Mainly clear',
    2: 'Partly cloudy',
    3: 'Overcast',
    45: 'Fog',
    48: 'Depositing rime fog',
    51: 'Light drizzle',
    53: 'Moderate drizzle',
    55: 'Dense drizzle',
    56: 'Light freezing drizzle',
    57: 'Dense freezing drizzle',
    61: 'Slight rain',
    63: 'Moderate rain',
    65: 'Heavy rain',
    66: 'Light freezing rain',
    67: 'Heavy freezing rain',
    71: 'Slight snow fall',
    73: 'Moderate snow fall',
    75: 'Heavy snow fall',
    77: 'Snow grains',
    80: 'Slight rain showers',
    81: 'Moderate rain showers',
    82: 'Violent rain showers',
    85: 'Slight snow showers',
    86: 'Heavy snow showers',
    95: 'Thunderstorm',
    96: 'Thunderstorm with slight hail',
    99: 'Thunderstorm with heavy hail',
  };

  return weatherDescriptions[weatherCode] || 'Unknown weather condition';
};

const WeatherCard: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {

        const locationResponse = await fetch('https://ipapi.co/json/');
        const locationData = await locationResponse.json();


        const weatherResponse = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${locationData.latitude}&longitude=${locationData.longitude}&current_weather=true`
        );
        const weatherData = await weatherResponse.json();

        const description = mapWeatherCodeToDescription(weatherData.current_weather.weathercode);

        setWeather({
          location: `${locationData.city}, ${locationData.country_name}`,
          temperature: weatherData.current_weather.temperature,
          description: description,
        });
        setLoading(false);
      } catch (err) {
        console.error('Error fetching weather data:', err);
        setError('Failed to fetch weather data. Please try again later.');
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  if (loading) return <div className="glassmorphism p-6"><p className="text-white">Loading weather data...</p></div>;
  if (error) return <div className="glassmorphism p-6"><p className="text-white">{error}</p></div>;
  if (!weather) return null;

  return (
    <div className="glassmorphism p-6 ">
      <h2 className="text-2xl font-bold mb-4 text-white">Weather</h2>
      <div className="flex items-center">
        <div>
          <p className="text-xl text-white">{weather.location}</p>
          <p className="text-4xl font-bold text-white mt-2">{weather.temperature}°C</p>
          <p className="text-lg text-white mt-2 capitalize">{weather.description}</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
