import { Button } from "@/components/ui/button";

interface UnitToggleProps {
  unit: "C" | "F";
  onToggle: () => void;
}

const UnitToggle = ({ unit, onToggle }: UnitToggleProps) => {
  return (
    <div className="flex items-center justify-center gap-3 mb-8 animate-fade-in">
      <Button
        variant={unit === "C" ? "default" : "outline"}
        onClick={onToggle}
        className="rounded-full px-6 py-2 font-bold text-base transition-all duration-300 hover:scale-110"
      >
        °C
      </Button>
      <div className="h-8 w-px bg-border"></div>
      <Button
        variant={unit === "F" ? "default" : "outline"}
        onClick={onToggle}
        className="rounded-full px-6 py-2 font-bold text-base transition-all duration-300 hover:scale-110"
      >
        °F
      </Button>
    </div>
  );
};

export default UnitToggle;
