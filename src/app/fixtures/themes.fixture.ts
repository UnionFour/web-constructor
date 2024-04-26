import { ThemeVariables } from '../interfaces/site.interface';

export interface Theme {
    name: string;
    themeVariables: ThemeVariables;
}

export const DefaultThemes: Theme[] = [
    {
        name: 'Чёрная',
        themeVariables: {
            backgroundColor: '#b4b4b4',
            fontColor: '#000',
            accentColor: '#9d2f2f'
        },
    },
    {
        name: 'Чёрная1',
        themeVariables: {
            backgroundColor: '#fff',
            fontColor: '#000',
            accentColor: '#000'
        },
    },
    {
        name: 'Чёрная2',
        themeVariables: {
            backgroundColor: '#fff',
            fontColor: '#000',
            accentColor: '#000'
        },
    }
];
