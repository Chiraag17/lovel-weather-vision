import { Card, CardContent } from "@/components/ui/card";

interface ForecastData {
  date: string;
  temp: number;
  description: string;
  icon: string;
}

interface ForecastCardProps {
  data: ForecastData[];
  unit: "C" | "F";
}

const ForecastCard = ({ data, unit }: ForecastCardProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
      {data.map((day, index) => {
        const iconUrl = `https://openweathermap.org/img/wn/${day.icon}@2x.png`;
        
        return (
        <Card
            key={index}
            className="glass-card border-0 overflow-hidden group hover:scale-105 transition-all duration-300 animate-fade-in-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CardContent className="p-5 text-center">
              <p className="font-bold text-foreground mb-3 text-lg">{day.date}</p>
              <img
                src={iconUrl}
                alt={day.description}
                className="w-20 h-20 mx-auto group-hover:scale-110 transition-transform duration-300"
              />
              <p className="text-3xl font-extrabold bg-gradient-to-br from-primary to-accent bg-clip-text text-transparent mt-3">
                {Math.round(day.temp)}°{unit}
              </p>
              <p className="text-sm text-muted-foreground capitalize mt-2 font-medium">
                {day.description}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default ForecastCard;
