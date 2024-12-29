
import { useNotes } from '../context/NotesContext';

interface ColorPickerProps {
  onColorSelect: () => void;
  buttonSize: number;
}

export const colors = [
  { name: 'Yellow', value: '#fef08a' },
  { name: 'Green', value: '#bbf7d0' },
  { name: 'Blue', value: '#bfdbfe' },
  { name: 'Pink', value: '#fbcfe8' },
];

export function ColorPicker({ onColorSelect, buttonSize }: ColorPickerProps) {
  const { createNote } = useNotes();

  const handleColorSelect = (color: string) => {
    createNote(color);
    onColorSelect();
  };

  return (
    <div className="flex flex-col space-y-2">
      {colors.map((color) => (
        <button
          key={color.value}
          onClick={() => handleColorSelect(color.value)}
          className="rounded-full flex items-center justify-center text-sm transition-transform hover:scale-105"
          style={{ 
            backgroundColor: color.value,
            width: `${buttonSize}px`,
            height: `${buttonSize}px`
          }}
        >
          {}
        </button>
      ))}
    </div>
  );
}