export type LoadedProperty = {
    name: string,
    value: string
}

export enum ConfigSourceType {
    Env,
    Json
}

export default interface IConfigSource {
    load(required?: string[], path?: string): LoadedProperty[];
}

