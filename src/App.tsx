import React from 'react';
import { NotesProvider } from './context/NotesContext';
import { NotesLayout } from './layouts/NotesLayout';

export default function App() {
  return (
    <NotesProvider>
      <NotesLayout />
    </NotesProvider>
  );
}