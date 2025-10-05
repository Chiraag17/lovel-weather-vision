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
    <Card className="glass-card border-0 overflow-hidden mb-8 animate-scale-in">
      <CardContent className="p-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <img
              src={iconUrl}
              alt={data.description}
              className="w-32 h-32 drop-shadow-2xl animate-float"
            />
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2 tracking-tight">
                {data.city}
              </h1>
              <p className="text-xl text-muted-foreground capitalize font-medium">
                {data.description}
              </p>
            </div>
          </div>
          
          <div className="text-center md:text-right">
            <div className="text-7xl md:text-8xl font-extrabold bg-gradient-to-br from-primary via-accent to-primary bg-clip-text text-transparent tracking-tight">
              {Math.round(data.temp)}°{unit}
            </div>
            <p className="text-muted-foreground mt-3 text-lg font-medium">
              Feels like {Math.round(data.feelsLike)}°{unit}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 pt-8 border-t border-border/50">
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-br from-secondary/60 to-secondary/30 hover:scale-105 transition-transform duration-300">
            <div className="p-3 rounded-xl bg-primary/10">
              <Thermometer className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground font-medium">Feels Like</p>
              <p className="text-xl font-bold">{Math.round(data.feelsLike)}°{unit}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-br from-secondary/60 to-secondary/30 hover:scale-105 transition-transform duration-300">
            <div className="p-3 rounded-xl bg-accent/10">
              <Droplets className="h-6 w-6 text-accent" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground font-medium">Humidity</p>
              <p className="text-xl font-bold">{data.humidity}%</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-br from-secondary/60 to-secondary/30 hover:scale-105 transition-transform duration-300">
            <div className="p-3 rounded-xl bg-primary/10">
              <Wind className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground font-medium">Wind Speed</p>
              <p className="text-xl font-bold">{data.windSpeed} m/s</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherCard;
