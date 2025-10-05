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
            className="glass-card border-0 overflow-hidden animate-in fade-in-50 duration-500"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CardContent className="p-4 text-center">
              <p className="font-semibold text-foreground mb-2">{day.date}</p>
              <img
                src={iconUrl}
                alt={day.description}
                className="w-16 h-16 mx-auto"
              />
              <p className="text-2xl font-bold text-primary mt-2">
                {Math.round(day.temp)}°{unit}
              </p>
              <p className="text-sm text-muted-foreground capitalize mt-1">
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
