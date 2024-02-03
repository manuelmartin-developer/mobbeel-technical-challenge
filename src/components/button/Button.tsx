import styles from "./Button.module.scss";

interface ButtonProps {
  /**
   * The text to display in the button
   * @type {string}
   * @memberof ButtonProps
   * @required
   * @example
   * text="Next"
   *
   * */
  text: string | React.ReactNode;

  /**
   * The function to call when the button is clicked
   * @type {() => void}
   * @memberof ButtonProps
   * @required
   * @example
   * onClick={() => console.log("Button clicked")}
   *
   * */
  onClick: () => void;

  /**
   * Whether the button is disabled
   * @type {boolean}
   * @memberof ButtonProps
   * @example
   * disabled={true}
   *
   * */
  disabled?: boolean;

  /**
   * Whether the button is an icon button
   * @type {boolean}
   * @memberof ButtonProps
   * @example
   * iconButton={true}
   *
   * */
  iconButton?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  text,
  onClick,
  disabled,
  iconButton,
}) => {
  return (
    <button
      data-testid="button"
      className={`${styles.button} ${disabled ? styles.button_disabled : ""} ${iconButton ? styles.button_icon : ""}
      `}
      role="button"
      onClick={onClick}
      aria-disabled={disabled}
    >
      <span>{text}</span>
    </button>
  );
};

export default Button;
