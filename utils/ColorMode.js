import { createContext, useMemo, useState } from 'react';

import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/private-theming';

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

export const ToggleColorMode = (props) => {
  const [mode, setMode] = useState('light');

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'dark' ? 'light' : 'dark'));
      },
    }),
    []
  );

  const nightTheme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={nightTheme}>{props.children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
};
