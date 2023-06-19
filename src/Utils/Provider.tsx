
import React, {createContext, useMemo} from "react";




const themes = {
    light: {
        foreground: '#000000',
        background: '#eeeeee',
    },
    dark: {
        foreground: '#ffffff',
        background: '#222222',
    },
};

export const GlobalContext = createContext({
    theme: themes.light,
    setTheme: (theme: any) => {}
});

export const GlobalProvider = ({children}:any) => {

    const [theme, setTheme] = React.useState(themes.light);

    // We are using useMemo to memoize the value object so that it will only update when the theme changes.
    // Because context uses reference identity to determine when to re-render, there are some gotchas that
    // could trigger unintentional renders in consumers when a provider’s parent re-renders. For example,
    // <MyContext.Provider value={{something: 'something'}}> will re-render all consumers every time the Provider
    // re-renders because a new object is always created for value:

    const value = useMemo(() => {
        return {theme, setTheme};
    }, [theme, setTheme]);

    return (
        <GlobalContext.Provider value={value}>
            {children}
        </GlobalContext.Provider>
    )
}

