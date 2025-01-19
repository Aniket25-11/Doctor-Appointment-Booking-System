import { createContext } from "react";

export const AppContext = createContext()
const AppContextProvider = ({children})=>{
// const AppContextProvider = ({props})=>{
  const value = {

  }
  return (
    <AppContext.Provider value={value}>
      {/* {props.children} */}
      {children}
    </AppContext.Provider>
  )
}
export default AppContextProvider