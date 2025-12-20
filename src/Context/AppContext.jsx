import { createContext } from "react";
import { doctors } from "../assets/assets";
// eslint-disable-next-line react-refresh/only-export-components
export const AppContext = createContext();
export default function AppContextProvider(props) {
  const currencySymbol = "$";
  const value = {
    doctors,
    currencySymbol,
  };
  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
