import { createContext, ReactNode } from 'react';

// project import
import defaultConfig from 'config';
import useLocalStorage from '@/store/hooks/useLocalStorage';

// types
import { PaletteMode } from '@mui/material';
import { CustomizationProps } from 'types/config';

// initial state
const initialState: CustomizationProps = {
  ...defaultConfig,
  onChangeLayout: () => { },
  onChangeDrawer: () => { },
  onChangeMenuType: () => { },
  onChangePresetColor: () => { },
  onChangeLocale: () => { },
  onChangeRTL: () => { },
  onChangeContainer: () => { },
  onChangeFontFamily: () => { },
  onChangeBorderRadius: () => { },
  onChangeOutlinedField: () => { },
  onChangeSelectedID: () => { }
};

// ==============================|| CONFIG CONTEXT & PROVIDER ||============================== //

const ConfigContext = createContext(initialState);

type ConfigProviderProps = {
  children: ReactNode;
};

function ConfigProvider({ children }: ConfigProviderProps) {
  const [config, setConfig] = useLocalStorage('lami1a-config', {
    layout: initialState.layout,
    drawerType: initialState.drawerType,
    fontFamily: initialState.fontFamily,
    borderRadius: initialState.borderRadius,
    outlinedFilled: initialState.outlinedFilled,
    navType: initialState.navType,
    presetColor: initialState.presetColor,
    locale: initialState.locale,
    rtlLayout: initialState.rtlLayout,
    drawerOpen: initialState.drawerOpen,
    hMaxItem: initialState.hMaxItem,
    selectedID: initialState.selectedID
  });

  const onChangeLayout = (layout: string) => {
    setConfig({
      ...config,
      layout
    });
  };

  const onChangeDrawer = ({ drawerType, drawerOpen }: { drawerType: string, drawerOpen: boolean }) => {
    setConfig({
      ...config,
      drawerType,
      drawerOpen
    });
  };

  const onChangeMenuType = (navType: PaletteMode) => {
    setConfig({
      ...config,
      navType
    });
  };

  const onChangePresetColor = (presetColor: string) => {
    setConfig({
      ...config,
      presetColor
    });
  };

  const onChangeLocale = (locale: string) => {
    setConfig({
      ...config,
      locale
    });
  };

  const onChangeRTL = (rtlLayout: boolean) => {
    setConfig({
      ...config,
      rtlLayout
    });
  };

  const onChangeContainer = () => {
    setConfig({
      ...config,
      container: !config.container
    });
  };

  const onChangeFontFamily = (fontFamily: string) => {
    setConfig({
      ...config,
      fontFamily
    });
  };

  const onChangeBorderRadius = (event: Event, newValue: number | number[]) => {
    setConfig({
      ...config,
      borderRadius: newValue as number
    });
  };

  const onChangeOutlinedField = (outlinedFilled: boolean) => {
    setConfig({
      ...config,
      outlinedFilled
    });
  };
  const onChangeSelectedID = (selectedID: number) => {
    setConfig({
      ...config,
      selectedID
    });
  };

  return (
    <ConfigContext.Provider
      value={{
        ...config,
        onChangeLayout,
        onChangeDrawer,
        onChangeMenuType,
        onChangePresetColor,
        onChangeLocale,
        onChangeRTL,
        onChangeContainer,
        onChangeFontFamily,
        onChangeBorderRadius,
        onChangeOutlinedField,
        onChangeSelectedID
      }}
    >
      {children}
    </ConfigContext.Provider>
  );
}

export { ConfigProvider, ConfigContext };
