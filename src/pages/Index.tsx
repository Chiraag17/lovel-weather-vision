import { useState, useEffect } from "react";
import { toast } from "sonner";
import SearchBar from "@/components/SearchBar";
import WeatherCard from "@/components/WeatherCard";
import ForecastCard from "@/components/ForecastCard";
import TemperatureChart from "@/components/TemperatureChart";
import UnitToggle from "@/components/UnitToggle";
import { CloudRain } from "lucide-react";

const API_KEY = "YOUR_API_KEY_HERE"; // Replace with your OpenWeatherMap API key
const STORAGE_KEY = "lastSearchedCity";

const Index = () => {
  const [unit, setUnit] = useState<"C" | "F">("C");
  const [isLoading, setIsLoading] = useState(false);
  const [weatherData, setWeatherData] = useState<any>(null);
  const [forecastData, setForecastData] = useState<any[]>([]);
  const [chartData, setChartData] = useState<any[]>([]);

  const convertTemp = (temp: number, toUnit: "C" | "F") => {
    if (toUnit === "F") {
      return (temp * 9) / 5 + 32;
    }
    return temp;
  };

  const fetchWeatherData = async (city: string) => {
    if (!API_KEY || API_KEY === "YOUR_API_KEY_HERE") {
      toast.error("Please add your OpenWeatherMap API key to use this app");
      return;
    }

    setIsLoading(true);
    try {
      // Fetch current weather
      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );

      if (!weatherResponse.ok) {
        throw new Error("City not found");
      }

      const weather = await weatherResponse.json();

      // Fetch 5-day forecast
      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
      );

      const forecast = await forecastResponse.json();

      // Process current weather
      setWeatherData({
        city: weather.name,
        temp: weather.main.temp,
        feelsLike: weather.main.feels_like,
        description: weather.weather[0].description,
        humidity: weather.main.humidity,
        windSpeed: weather.wind.speed,
        icon: weather.weather[0].icon,
      });

      // Process forecast data (one per day at noon)
      const dailyForecasts = forecast.list
        .filter((item: any) => item.dt_txt.includes("12:00:00"))
        .slice(0, 5)
        .map((item: any) => {
          const date = new Date(item.dt_txt);
          return {
            date: date.toLocaleDateString("en-US", { weekday: "short" }),
            temp: item.main.temp,
            description: item.weather[0].description,
            icon: item.weather[0].icon,
          };
        });

      setForecastData(dailyForecasts);

      // Process chart data
      const chartDataPoints = dailyForecasts.map((day: any) => ({
        date: day.date,
        temp: Math.round(day.temp),
      }));

      setChartData(chartDataPoints);

      // Save to local storage
      localStorage.setItem(STORAGE_KEY, city);

      toast.success(`Weather data loaded for ${city}`);
    } catch (error) {
      toast.error("Failed to fetch weather data. Please check the city name.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Load last searched city on mount
  useEffect(() => {
    const lastCity = localStorage.getItem(STORAGE_KEY);
    if (lastCity) {
      fetchWeatherData(lastCity);
    } else {
      // Default city
      fetchWeatherData("London");
    }
  }, []);

  const handleUnitToggle = () => {
    setUnit((prev) => (prev === "C" ? "F" : "C"));
  };

  const displayWeatherData = weatherData
    ? {
        ...weatherData,
        temp: convertTemp(weatherData.temp, unit),
        feelsLike: convertTemp(weatherData.feelsLike, unit),
      }
    : null;

  const displayForecastData = forecastData.map((day) => ({
    ...day,
    temp: convertTemp(day.temp, unit),
  }));

  const displayChartData = chartData.map((point) => ({
    ...point,
    temp: Math.round(convertTemp(point.temp, unit)),
  }));

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="container mx-auto max-w-7xl">
        <header className="text-center mb-8 animate-in fade-in-50 duration-500">
          <div className="flex items-center justify-center gap-3 mb-4">
            <CloudRain className="h-12 w-12 text-primary" />
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Weather Dashboard
            </h1>
          </div>
          <p className="text-lg text-muted-foreground">
            Real-time weather information and 5-day forecast
          </p>
        </header>

        <SearchBar onSearch={fetchWeatherData} isLoading={isLoading} />

        <UnitToggle unit={unit} onToggle={handleUnitToggle} />

        {isLoading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        )}

        {!isLoading && displayWeatherData && (
          <div className="animate-in fade-in-50 duration-700">
            <WeatherCard data={displayWeatherData} unit={unit} />
            <ForecastCard data={displayForecastData} unit={unit} />
            <TemperatureChart data={displayChartData} unit={unit} />
          </div>
        )}

        {!weatherData && !isLoading && (
          <div className="text-center py-12 glass-card rounded-2xl">
            <CloudRain className="h-24 w-24 text-muted-foreground/50 mx-auto mb-4" />
            <p className="text-xl text-muted-foreground">
              Search for a city to see the weather
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
