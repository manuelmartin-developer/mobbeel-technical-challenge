import { create } from "zustand";

interface DetectedFilesStore {
  /**
   * The front document detected
   * @type {string | null}
   * @memberof DetectedFilesStore
   * @example
   * frontDocument: "data:image/jpeg;base64,/9j/4AAQ..."
   * */
  frontDocument: string | null;
  /**
   * The back document detected
   * @type {string | null}
   * @memberof DetectedFilesStore
   * @example
   * backDocument: "data:image/jpeg;base64,/9j/4AAQ..."
   * */
  backDocument: string | null;
  /**
   * Sets the front document detected
   * @type {Function}
   * @memberof DetectedFilesStore
   * @example
   * setFrontDocument("data:image/jpeg;base64,/9j/4AAQ...")
   * */
  setFrontDocument: (file: string | null) => void;
  /**
   * Sets the back document detected
   * @type {Function}
   * @memberof DetectedFilesStore
   * @example
   * setBackDocument("data:image/jpeg;base64,/9j/4AAQ...")
   * */
  setBackDocument: (file: string | null) => void;
}

export const useDetectedFilesStore = create<DetectedFilesStore>((set) => ({
  frontDocument: null,
  backDocument: null,
  setFrontDocument: (file) => set({ frontDocument: file }),
  setBackDocument: (file) => set({ backDocument: file }),
}));
