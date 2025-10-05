import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface ChartData {
  date: string;
  temp: number;
}

interface TemperatureChartProps {
  data: ChartData[];
  unit: "C" | "F";
}

const TemperatureChart = ({ data, unit }: TemperatureChartProps) => {
  return (
    <Card className="glass-card border-0 animate-fade-in-up">
      <CardHeader>
        <CardTitle className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          5-Day Temperature Trend
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
            <XAxis
              dataKey="date"
              stroke="hsl(var(--muted-foreground))"
              style={{ fontSize: "12px" }}
            />
            <YAxis
              stroke="hsl(var(--muted-foreground))"
              style={{ fontSize: "12px" }}
              label={{ value: `Temperature (°${unit})`, angle: -90, position: "insideLeft" }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
              }}
              labelStyle={{ color: "hsl(var(--foreground))" }}
            />
            <Line
              type="monotone"
              dataKey="temp"
              stroke="hsl(var(--primary))"
              strokeWidth={3}
              dot={{ fill: "hsl(var(--primary))", r: 6 }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default TemperatureChart;
