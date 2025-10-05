import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SearchBarProps {
  onSearch: (city: string) => void;
  isLoading?: boolean;
}

const SearchBar = ({ onSearch, isLoading }: SearchBarProps) => {
  const [city, setCity] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto mb-8 animate-fade-in-up">
      <div className="glass-card rounded-full p-2 flex gap-2 hover:shadow-xl transition-all duration-300">
        <Input
          type="text"
          placeholder="Search for a city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="flex-1 bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-lg placeholder:text-muted-foreground/60 font-medium"
          disabled={isLoading}
        />
        <Button
          type="submit"
          size="icon"
          className="rounded-full h-12 w-12 bg-gradient-to-br from-primary to-accent hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl"
          disabled={isLoading}
        >
          <Search className="h-5 w-5" />
        </Button>
      </div>
    </form>
  );
};

export default SearchBar;
