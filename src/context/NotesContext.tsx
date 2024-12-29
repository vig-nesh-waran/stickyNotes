import React, { createContext, useContext, useState, useEffect } from 'react';
import { Note } from '../types/Note';
import toast from 'react-hot-toast';

interface NotesContextType {
  notes: Note[];
  createNote: (color: string) => void;
  updateNote: (id: string, title: string, content: string) => void;
  deleteNote: (id: string) => void;
}

const NotesContext = createContext<NotesContextType | undefined>(undefined);

export function NotesProvider({ children }: { children: React.ReactNode }) {
  const [notes, setNotes] = useState<Note[]>(() => {
    const savedNotes = localStorage.getItem('sticky-notes');
    return savedNotes ? JSON.parse(savedNotes) : [];
  });

  useEffect(() => {
    localStorage.setItem('sticky-notes', JSON.stringify(notes));
  }, [notes]);

  const createNote = (color: string) => {
    const newNote: Note = {
      id: Date.now().toString(),
      title: 'New Note',
      content: '',
      color,
      createdAt: Date.now(),
    };
    setNotes([newNote, ...notes]);
    toast.success('Note created!');
  };

  const updateNote = (id: string, title: string, content: string) => {
    setNotes(
      notes.map((note) =>
        note.id === id ? { ...note, title, content } : note
      )
    );
    toast.success('Note updated!');
  };

  const deleteNote = (id: string) => {
    setNotes(notes.filter((note) => note.id !== id));
    toast.success('Note deleted!');
  };

  return (
    <NotesContext.Provider value={{ notes, createNote, updateNote, deleteNote }}>
      {children}
    </NotesContext.Provider>
  );
}

export function useNotes() {
  const context = useContext(NotesContext);
  if (context === undefined) {
    throw new Error('useNotes must be used within a NotesProvider');
  }
  return context;
}