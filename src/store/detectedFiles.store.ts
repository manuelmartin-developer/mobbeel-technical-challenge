import { create } from "zustand";

interface DetectedFilesStore {
  frontDocument: string | null;
  backDocument: string | null;
  setFrontDocument: (file: string | null) => void;
  setBackDocument: (file: string | null) => void;
}

export const useDetectedFilesStore = create<DetectedFilesStore>((set) => ({
  frontDocument: null,
  backDocument: null,
  setFrontDocument: (file) => set({ frontDocument: file }),
  setBackDocument: (file) => set({ backDocument: file }),
}));
