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

  /**
   * The width of the button
   * @type {string}
   * @memberof ButtonProps
   * @example
   * width="100px"
   *
   * */
  width?: string;

  /**
   * Whether the button is selected
   * @type {boolean}
   * @memberof ButtonProps
   * @example
   * selected={true}
   *
   * */
  height?: string;

  /**
   * Whether the button is selected
   * @type {boolean}
   * @memberof ButtonProps
   * @example
   * selected={true}
   *
   * */
  selected?: boolean;

  /**
   * The test id of the button
   * @type {string}
   * @memberof ButtonProps
   * @example
   * testId="button"
   * @default button
   * */
  testId?: string;
}

const Button: React.FC<ButtonProps> = ({
  text,
  onClick,
  disabled,
  iconButton,
  width,
  height,
  selected,
  testId = "button",
}) => {
  return (
    <button
      data-testid={testId}
      className={`${styles.button} ${disabled ? styles.button_disabled : ""} ${iconButton ? styles.button_icon : ""} ${selected ? styles.button_selected : ""}
      `}
      role="button"
      onClick={onClick}
      aria-disabled={disabled}
      style={{ width, height }}
    >
      <span>{text}</span>
    </button>
  );
};

export default Button;
