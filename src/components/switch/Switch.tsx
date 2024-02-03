import { useThemeStore } from "../../store/theme.store";
import { CiLight, CiDark } from "react-icons/ci";
import styles from "./Switch.module.scss";

const ThemeSwitch = () => {
  // Store states
  const { theme, setTheme } = useThemeStore();

  return (
    <button
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
