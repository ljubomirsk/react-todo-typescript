export interface Theme {
  colors: {
    primary: string;
    secondary: string;
    background: string;
    error: string;
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
const primaryColor = 'rgba(8, 61, 119, 1)';
const secondaryColor = 'rgba(165, 24, 83, 1)';
const backgroundColor = 'rgba(255, 253, 249, 1)';
const errorColor = 'rgba(213, 0, 0, 1)';

export default (): Theme => ({
  colors: {
    primary: primaryColor,
    secondary: secondaryColor,
    background: backgroundColor,
    error: errorColor,
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
