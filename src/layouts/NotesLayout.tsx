import React, { useState } from 'react';
import { Sidebar } from '../components/Sidebar';
import { NotesList } from '../components/NotesList';
import { Toaster } from 'react-hot-toast';

export function NotesLayout() {
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 no-text-cursor">
      <Sidebar
        isColorPickerOpen={isColorPickerOpen}
        toggleColorPicker={() => setIsColorPickerOpen(!isColorPickerOpen)}
        onColorSelect={() => setIsColorPickerOpen(false)}
      />
      <div className="md:ml-[200px] p-4">
        <div className="max-w-4xl mx-auto">
          <NotesList />
        </div>
      </div>
      <Toaster 
        position="bottom-right"
        containerStyle={{
          zIndex: 70,
          bottom: 20,
          right: 20
        }}
        toastOptions={{
          style: {
            background: '#333',
            color: '#fff',
            zIndex: 70
          },
        }}
      />
    </div>
  );
}