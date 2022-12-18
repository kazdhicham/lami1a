import React, { useEffect } from "react";
import createTheme from '@/theme/index'
import { THEMES } from "@/theme/constants";

const initialState = {
  theme: THEMES.DEFAULT,
  themeComplet: {
    palette: {
      primary: {
        main: ''
      }
    }
  },
  setTheme: (theme: string) => { console.log({ theme }) },
};
const ThemeContext = React.createContext(initialState);

type ThemeProviderProps = {
  children: React.ReactNode;
};

function ThemeProvider({ children }: ThemeProviderProps) {
  const initialState = () => {
    if (typeof window !== "undefined") {
      const storedTheme = localStorage.getItem("theme");
      return storedTheme ? JSON.parse(storedTheme) : THEMES.DEFAULT;
      // all other localStorage must be wrapped with this is if statement check
    } else {
      return THEMES.DEFAULT
    }
  };
  const [theme, _setTheme] = React.useState<string>(initialState());
  const [themeComplet, _setThemeComplet] = React.useState<any>(null);

  useEffect(() => {
    _setThemeComplet(createTheme(theme))

  }, [theme])

  const setTheme = (theme: string) => {
    localStorage.setItem("theme", JSON.stringify(theme));
    _setTheme(theme);
  };

  return (
    <ThemeContext.Provider value={{ themeComplet, theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export { ThemeProvider, ThemeContext };
