import * as React from 'react';
import { useState } from 'react';
import { createContext } from 'react';

import { IColorTheme } from '../../utils/models';

export type IContextDark = [IColorTheme, React.Dispatch<React.SetStateAction<IColorTheme>>];

export const DarkMode = createContext<IContextDark>([{}, () => {}]);

export const ContextProvider: React.FC = (props) => {

    const [colors, setColors] = useState<IColorTheme>({
        background: 'light',
        cardBackground: 'white',
        text: null,
        gray: 'light'
    })

    return(
        <DarkMode.Provider value={[colors, setColors]}>
            {props.children}
        </DarkMode.Provider>
    )

}