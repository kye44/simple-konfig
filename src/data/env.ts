import IConfigSource, { LoadedProperty } from '.';
import * as dotenv from 'dotenv';

export default class EnvSource implements IConfigSource {
    path: string;

    constructor() {
        this.path = '';
        dotenv.config();
    }

    public load(required?: string[]): LoadedProperty[] {
        const variables: LoadedProperty[] = [];
        console.log(`Attempting to load the enviroment variables ${required}`);
        required?.map(name => {
            let value = process.env[name];
            if (value) {
                variables.push({ name: name, value: value });
            }
        });
        return variables;
    }
}