interface SuggestionChipsProps {
  chips: string[];
  onSelect: (chip: string) => void;
}

export function SuggestionChips({ chips, onSelect }: SuggestionChipsProps) {
  return (
    <div className="flex flex-wrap gap-2 px-4 pb-2">
      {chips.map((chip) => (
        <button
          key={chip}
          onClick={() => onSelect(chip)}
          className="text-xs px-3 py-1.5 bg-primary/10 text-primary border border-primary/20 rounded-full font-medium hover:bg-primary/20 transition-colors"
        >
          {chip}
        </button>
      ))}
    </div>
  );
}
