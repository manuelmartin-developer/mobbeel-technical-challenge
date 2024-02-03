import { create } from "zustand";

interface ThemeStore {
  /**
   * The theme of the application
   * @type {"light" | "dark"}
   * @memberof ThemeStore
   * @example
   * theme: "light"
   * */
  theme: "light" | "dark";
  /**
   * Sets the theme of the application
   * @type {Function}
   * @memberof ThemeStore
   * @example
   * setTheme("light")
   * */
  setTheme: (theme: "light" | "dark") => void;
}

export const useThemeStore = create<ThemeStore>((set) => ({
  theme: "light",
  setTheme: (theme) => set({ theme }),
}));
