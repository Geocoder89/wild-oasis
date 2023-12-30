import { createContext, useContext, useEffect } from "react";
import {useLocalStorageState} from '../hooks/useLocalStorageState'
// create a context
const DarkModeContext = createContext()





// create a provider to use this context 

const DarkModeProvider = ({children}) => {

  const [isDarkMode, setIsDarkMode] = useLocalStorageState( window.matchMedia('(prefers-color-scheme:dark)').matches, 'isDarkMode')

  useEffect(()=>{
    if(isDarkMode) {
      document.documentElement.classList.add('dark-mode')
      document.documentElement.classList.remove('light-mode')
    } else {
      document.documentElement.classList.add('light-mode')
      document.documentElement.classList.remove('dark-mode')
    }
  },[isDarkMode])
  

  const toggleDarkMode = ()=> {
    setIsDarkMode(isDark=> !isDark)
  }

  return <DarkModeContext.Provider value={{
    isDarkMode,
    toggleDarkMode
  }}>{children}</DarkModeContext.Provider>

}

// we create a hook to make use of this context

const useDarkMode = ()=> {

  // we use it
  const context = useContext(DarkModeContext)

  // if not available we throw an error
  if(context === undefined) throw new Error('DarkMode context was used outside of DarkModeProvider')

  // else we return the context

  return context
}

// we then export the provider and the hook

export {DarkModeProvider, useDarkMode}

