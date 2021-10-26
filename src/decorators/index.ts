import ConfigStore from "../store"

export function configProperty(value: any) {
    return function (target: Object, propertyKey: string) {
        ConfigStore.AddConfigProperty(target, propertyKey, value);
    }
}