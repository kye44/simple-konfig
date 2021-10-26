export type ConfigPropertyEntry = {
    propertyKey: string;
    value: string;
}

type ConfigStoreEntry = {
    target: string,
    configProperties: ConfigPropertyEntry[];
}

export default abstract class ConfigStore {

    private static readonly configProperties: ConfigStoreEntry[] = [];

    public static AddConfigProperty(target: Object, propertyKey: string, value: string): void {
        var entry = ConfigStore.configProperties.find(x => x.target == target.constructor.name);
        if (entry) {
            entry.configProperties.push({ propertyKey: propertyKey, value: value });
        }
        else {
            ConfigStore.configProperties.push(
                {
                    target: target.constructor.name,
                    configProperties: [{ propertyKey: propertyKey, value: value }]
                }
            );
        }
    }

    public static GetConfigProperties(target: string): ConfigPropertyEntry[] | undefined {
        return ConfigStore.configProperties.find(x => x.target == target)?.configProperties;
    }
}