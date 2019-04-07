export interface Theme {
  colors: {
    primary: string;
    secondary: string;
    background: string;
    error: string;
    shadow: string;
    disabled: string;
    text: {
      light: string;
      dark: string;
    };
  };
  fonts: {
    primary: string;
    title: string;
  };
}

const textColorLight = 'rgba(255, 255, 255, 1)';
const textColorDark = 'rgba(0, 0, 0, 1)';
const primaryColor = '#FFCB23';
const secondaryColor = '#FFA63C';
const backgroundColor = 'rgba(255, 253, 249, 1)';
const errorColor = 'rgba(213, 0, 0, 1)';
const shadowColor = '#e7ebf4';
const disabledColor = '#ccc';

export default (): Theme => ({
  colors: {
    primary: primaryColor,
    secondary: secondaryColor,
    background: backgroundColor,
    error: errorColor,
    shadow: shadowColor,
    disabled: disabledColor,
    text: {
      light: textColorLight,
      dark: textColorDark,
    },
  },
  fonts: {
    primary: 'Roboto',
    title: 'Roboto Slab',
  },
});
