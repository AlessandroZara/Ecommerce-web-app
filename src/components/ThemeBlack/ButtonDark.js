import React, { useState,} from "react";
import {ThemeProvider} from "styled-components";
import { GlobalStyles } from "./globalStyles";
import { lightTheme, darkTheme } from "./Theme"
import {FaMoon} from 'react-icons/fa'

export default function ButtonDark() {
    const [theme, setTheme] = useState('light');
    const themeToggler = () => {
        theme === 'light' ? setTheme('dark') : setTheme('light');
    };
   
    return (
        <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
            <>
                <GlobalStyles />
                <div className="App">
                    <button style ={{backgroundColor:"blue"}}onClick={themeToggler}><FaMoon/> </button>
                   
                </div>
            </>
        </ThemeProvider>

    );
}