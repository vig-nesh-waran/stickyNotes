import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { NoteCard } from './NoteCard';
import { useNotes } from '../context/NotesContext';
import { EmptyState } from './EmptyState';

export function NotesList() {
  const { notes } = useNotes();

  if (notes.length === 0) {
    return <EmptyState />;
  }

  return (
    <AnimatePresence>
      {notes.map((note) => (
        <NoteCard key={note.id} note={note} />
      ))}
    </AnimatePresence>
  );
}