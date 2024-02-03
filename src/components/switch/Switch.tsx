import { CiLight, CiDark } from "react-icons/ci";

import styles from "./Switch.module.scss";

import { useThemeStore } from "../../store/theme.store";

const ThemeSwitch = () => {
  // Store states
  const { theme, setTheme } = useThemeStore();

  return (
    <button
      data-testid="theme-switch"
      role="switch"
      aria-checked={theme === "dark"}
      aria-label="Switch theme"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className={styles.switch}
    >
      {theme === "light" ? (
        <CiLight size={21} />
      ) : (
        <CiDark size={21} color="#fff" />
      )}
    </button>
  );
};

export default ThemeSwitch;
