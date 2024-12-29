import React, { useRef, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ColorPicker } from './ColorPicker';

interface SidebarProps {
  isColorPickerOpen: boolean;
  toggleColorPicker: () => void;
  onColorSelect: () => void;
}

export function Sidebar({
  isColorPickerOpen,
  toggleColorPicker,
  onColorSelect,
}: SidebarProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [buttonSize, setButtonSize] = React.useState(40);

  useEffect(() => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setButtonSize(rect.width);
    }
  }, []);

  return (
    <div className="bg-white shadow-lg md:h-screen md:w-[200px] md:fixed md:left-0 p-6 no-text-cursor">
      <div className="flex md:flex-col items-center justify-between md:justify-start md:space-y-8">
        <h1 className="text-2xl font-bold text-gray-800 md:text-center">Sticky Notes</h1>
        <div className="relative">
          <motion.button
            ref={buttonRef}
            whileTap={{ scale: 0.95 }}
            onClick={toggleColorPicker}
            className="p-2.5 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <Plus className="w-6 h-6" />
          </motion.button>

          <AnimatePresence>
            {isColorPickerOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-[calc(100%+0.5rem)] right-0 md:right-auto md:left-0 p-2 bg-white rounded-lg shadow-xl z-[60]"
              >
                <ColorPicker onColorSelect={onColorSelect} buttonSize={buttonSize} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}