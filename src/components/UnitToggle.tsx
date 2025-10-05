import { Button } from "@/components/ui/button";

interface UnitToggleProps {
  unit: "C" | "F";
  onToggle: () => void;
}

const UnitToggle = ({ unit, onToggle }: UnitToggleProps) => {
  return (
    <div className="flex items-center justify-center gap-2 mb-6">
      <Button
        variant={unit === "C" ? "default" : "outline"}
        onClick={onToggle}
        className="rounded-full transition-all duration-300"
      >
        °C
      </Button>
      <Button
        variant={unit === "F" ? "default" : "outline"}
        onClick={onToggle}
        className="rounded-full transition-all duration-300"
      >
        °F
      </Button>
    </div>
  );
};

export default UnitToggle;
