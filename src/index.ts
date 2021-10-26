import 'reflect-metadata';
import IConfigSource, { ConfigSourceType, LoadedProperty } from "./data";
import EnvSource from "./data/env";
import JsonSource from './data/json';
import ConfigStore, { ConfigPropertyEntry } from "./store";

export type ConfigOptions = {
    config: Object;
    path?: string;
}

export * from './decorators';
export * from './data';

export default class ConfigHelper {
    private readonly configSource: IConfigSource;
    private readonly configSourceType: ConfigSourceType;
    private readonly configuration: any[];

    constructor(
        configSourceType: ConfigSourceType,
    ) {
        this.configSourceType = configSourceType;
        this.configSource = this.selectConfigSource();
        this.configuration = [];
    }

    public load(configOptions: ConfigOptions): void {
        const entries: ConfigPropertyEntry[] = ConfigStore.GetConfigProperties(configOptions.config.constructor.name) ?? [];
        const loadedProperties: LoadedProperty[] = this.configSource.load(entries.map(x => x.value), configOptions.path);
        entries.map(entry => {
            var match = loadedProperties.find(x => x.name == entry.value);
            if (match) {
                Reflect.set(configOptions.config, entry.propertyKey, match.value);
            }
        });
        this.configuration.push(configOptions.config);
    }

    public loadAll(configOptions: ConfigOptions[]): void {
        configOptions.map(option => this.load(option));
    }

    public getConfig<T>(config: new () => T): T {
        const instance: Object = new config();
        return this.configuration.find(x => x.constructor.name == instance.constructor.name);
    }

    private selectConfigSource(): IConfigSource {
        switch (this.configSourceType) {
            case ConfigSourceType.Json:
                return new JsonSource();
            default:
                return new EnvSource();
        }
    }
}