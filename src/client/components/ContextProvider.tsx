import * as React from 'react';
import { useState, useEffect } from 'react';
import { createContext } from 'react';

import { IColorTheme } from '../../utils/models';

export type IContextDark = [IColorTheme, React.Dispatch<React.SetStateAction<IColorTheme>>];
export type IContextDarkToggle = [boolean, React.Dispatch<React.SetStateAction<boolean>>];

export const DarkMode = createContext<IContextDark>([{}, () => {}]);
export const DarkToggle = createContext<IContextDarkToggle>([false, () => false]);

export const ContextProvider: React.FC = (props) => {

    const [darkToggle, setDarkToggle] = useState<boolean>(false);

    const [colors, setColors] = useState<IColorTheme>({
        background: 'light',
        cardBackground: 'white',
        text: null,
        gray: 'light',
        button: 'midnight',
        cardBorder: null
    })

    useEffect(() => {
        if(darkToggle) {
            setColors({
                background: 'darkbg',
                cardBackground: 'midnight',
                text: 'text-white',
                gray: 'medgray',
                button: 'dark',
                cardBorder: 'border-dark'
            });
        } else {
            setColors({
                background: 'light',
                cardBackground: 'white',
                text: null,
                gray: 'light',
                button: 'midnight',
                cardBorder: null
            })
        }
    }, [darkToggle]);

    return(
        <DarkToggle.Provider value={[darkToggle, setDarkToggle]}>
            <DarkMode.Provider value={[colors, setColors]}>
                {props.children}
            </DarkMode.Provider>
        </DarkToggle.Provider>
    )

}