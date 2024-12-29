import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface DeleteConfirmationProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function DeleteConfirmation({
  isOpen,
  onClose,
  onConfirm,
}: DeleteConfirmationProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-[100] px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/50"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-sm bg-white rounded-lg shadow-xl p-6 md:p-8"
          >
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Delete Note</h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete this note? This action cannot be undone.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-3">
                <button
                  onClick={onClose}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-gray-200 hover:bg-gray-300 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={onConfirm}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors font-medium"
                >
                  Delete
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}