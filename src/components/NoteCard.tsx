import React, { useState } from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Note } from '../types/Note';
import { DeleteConfirmation } from './DeleteConfirmation';
import { useNotes } from '../context/NotesContext';
import { NoteEditor } from './NoteEditor';
import { usePreventScroll } from '../hooks/usePreventScroll';

interface NoteCardProps {
  note: Note;
}

export function NoteCard({ note }: NoteCardProps) {
  const { updateNote, deleteNote } = useNotes();
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Prevent body scroll when modal is open
  usePreventScroll(isDeleteModalOpen);

  const handleUpdate = (title: string, content: string) => {
    updateNote(note.id, title, content);
    setIsEditing(false);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="rounded-lg shadow-md p-4 mb-4"
      style={{ backgroundColor: note.color }}
    >
      {isEditing ? (
        <NoteEditor
          note={note}
          onSave={handleUpdate}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <div 
          className="no-text-cursor"
          onClick={() => setIsEditing(true)}
        >
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold text-lg">{note.title}</h3>
            <div className="flex space-x-2">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsEditing(true);
                }}
                className="p-1 rounded-full hover:bg-white/20"
              >
                <Pencil className="w-4 h-4" />
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsDeleteModalOpen(true);
                }}
                className="p-1 rounded-full hover:bg-white/20"
              >
                <Trash2 className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
          <p className="text-gray-700 whitespace-pre-wrap">{note.content}</p>
        </div>
      )}

      <DeleteConfirmation
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={() => {
          deleteNote(note.id);
          setIsDeleteModalOpen(false);
        }}
      />
    </motion.div>
  );
}