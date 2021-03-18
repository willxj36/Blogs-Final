export interface Blog {
    id?: number,
    title: string,
    content: string,
    authorid?: number,
    author?: string
    _created?: string,
    tag?: string[]
}

export interface Payload {
    [key: string]: any,
    userid?: number,
    unique?: string
}

export interface User {
    name?: string,
    email?: string,
    password?: string,
    role?: string
    id?: number
}

export interface IColorTheme {
    background?: string,
    cardBackground?: string,
    text?: string | null,
    gray?: string,
    button?: string,
    cardBorder?: string
}