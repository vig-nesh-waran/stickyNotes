import React, { useState } from 'react';
import { Note } from '../types/Note';

interface NoteEditorProps {
  note: Note;
  onSave: (title: string, content: string) => void;
  onCancel: () => void;
}

export function NoteEditor({ note, onSave, onCancel }: NoteEditorProps) {
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);

  return (
    <div className="space-y-2">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 rounded border bg-white/50 focus:outline-none"
        placeholder="Title"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full p-2 rounded border bg-white/50 focus:outline-none min-h-[100px]"
        placeholder="Content"
      />
      <div className="flex justify-end space-x-2">
        <button
          onClick={onCancel}
          className="px-3 py-1 rounded bg-gray-500 text-white"
        >
          Cancel
        </button>
        <button
          onClick={() => onSave(title, content)}
          className="px-3 py-1 rounded bg-blue-500 text-white"
        >
          Save
        </button>
      </div>
    </div>
  );
}