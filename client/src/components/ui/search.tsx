import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SearchInputProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
}

export const SearchInput = ({ placeholder, value, onChange }: SearchInputProps) => {
  return (
    <div className="relative w-full max-w-90 sx:max-w-222">
      <Search 
        className="absolute left-3 top-1/2 -translate-y-1/2 text-[#666666]" 
        size={18} 
      />
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10 w-full bg-neutral-100 dark:bg-[#1a1a1a] border-black/5 dark:border-[#222222] text-neutral-900 dark:text-neutral-300 rounded-9 h-11 focus-visible:ring-indigo-500/20"
        placeholder={placeholder || "Search..."}
      />
    </div>
  );
};