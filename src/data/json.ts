import IConfigSource, { LoadedProperty } from '.';
import * as fs from 'fs';

export default class JsonSource implements IConfigSource {
    public load(_: string[], path?: string): LoadedProperty[] {
        const variables: LoadedProperty[] = [];
        try {
            console.log(`Attempting to load from JSON file.`);
            const data = JSON.parse(fs.readFileSync(path ?? './config.json', 'utf8'));
            for (var key of Object.keys(data)) {
                variables.push({ name: key, value: data[key] });
            }
        }
        catch (e) {
            console.log(`[ERROR] ${e}`);
        }

        return variables;
    }
}