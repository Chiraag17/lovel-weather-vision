import { Cloud, Droplets, Wind, Thermometer } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface WeatherData {
  city: string;
  temp: number;
  feelsLike: number;
  description: string;
  humidity: number;
  windSpeed: number;
  icon: string;
}

interface WeatherCardProps {
  data: WeatherData;
  unit: "C" | "F";
}

const WeatherCard = ({ data, unit }: WeatherCardProps) => {
  const iconUrl = `https://openweathermap.org/img/wn/${data.icon}@4x.png`;

  return (
    <Card className="glass-card border-0 overflow-hidden mb-8">
      <CardContent className="p-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <img
              src={iconUrl}
              alt={data.description}
              className="w-32 h-32 drop-shadow-2xl animate-in fade-in-50 duration-500"
            />
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
                {data.city}
              </h1>
              <p className="text-xl text-muted-foreground capitalize">
                {data.description}
              </p>
            </div>
          </div>
          
          <div className="text-center md:text-right">
            <div className="text-6xl md:text-7xl font-bold bg-gradient-to-br from-primary to-accent bg-clip-text text-transparent">
              {Math.round(data.temp)}°{unit}
            </div>
            <p className="text-muted-foreground mt-2">
              Feels like {Math.round(data.feelsLike)}°{unit}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-border/50">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-secondary/50">
              <Thermometer className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Feels Like</p>
              <p className="text-lg font-semibold">{Math.round(data.feelsLike)}°{unit}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-secondary/50">
              <Droplets className="h-5 w-5 text-accent" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Humidity</p>
              <p className="text-lg font-semibold">{data.humidity}%</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-secondary/50">
              <Wind className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Wind</p>
              <p className="text-lg font-semibold">{data.windSpeed} m/s</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherCard;
