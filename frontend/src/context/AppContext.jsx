import { createContext } from "react";
import { doctors } from "../assets/assets";

export const AppContext = createContext()

// const AppContextProvider = (children) => {
const AppContextProvider = (props) => {

    const value = {
        doctors 
    }
    return (
        <AppContext.Provider value={value}>
            {/* {children} */}
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider