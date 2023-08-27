import { createContext, useReducer } from "react";
import { initialState, reducer } from "./Reducer";




export const GlobalContext = createContext()

export const Globalprovider = ({children})=>{
const[state , dispatch] = useReducer(reducer , initialState)

return(
    <>
    <GlobalContext.Provider value={{state , dispatch}}>
        {children}
    </GlobalContext.Provider>

    </>
)




}