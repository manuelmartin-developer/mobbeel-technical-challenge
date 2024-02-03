import ThemeSwitch from "../switch/Switch";
import styles from "./Header.module.scss";

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <img
        className={styles.header__logo}
        src="/assets/mobbeel-logo.png"
        alt="MobbScan"
        width={80}
      />
      <h5 className={styles.header__title}>Technical Challenge</h5>
      <ThemeSwitch />
    </header>
  );
};

export default Header;
