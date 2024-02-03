import styles from "./Header.module.scss";

const Header = () => {
  return (
    <header className={styles.header}>
      <img
        className={styles.header__logo}
        src="/public/assets/mobbeel-logo.png"
        alt="MobbScan"
        width={80}
      />
      <h5 className={styles.header__title}>Technical Challenge</h5>
    </header>
  );
};

export default Header;
