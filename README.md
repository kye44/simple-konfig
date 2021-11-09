# Simple-Konfig
Simple configuration implementation for Typescript.

## Installation
Install via `npm i --save-dev simple-konfig`. In order to use Simple-Konfig, experimental decorators must be enabled **See Below.**

_tsconfig.json_
```json
{
  "experimentalDecorators": true
}
```

## Usage
To start using Simple-Konfig, create a class to represent your configuration; complete with properties.
```typescript
export default class MarketConfig {
    private defaultMarketExpiry: string = '';

    get DefaultExpiry(): string {
        return this.defaultMarketExpiry;
    }

    set DefaultExpiry(value: string) {
        this.defaultMarketExpiry = value;
    }
}
```
Import the `configProperty` decorator and decorate your properties accordingly, provide a variable name; this should match the name of variable in your configuration.
```typescript
export default class MarketConfig {
    private defaultMarketExpiry: string = '';

    get DefaultExpiry(): string {
        return this.defaultMarketExpiry;
    }

    @configProperty('defaultMarketExpiry')
    set DefaultExpiry(value: string) {
        this.defaultMarketExpiry = value;
    }
}
```
Create a ConfigHelper and provide the type of config you are using (Simple-Konfig currently supports enviroment variables and JSON files).
```typescript
var config = new ConfigHelper(ConfigSourceType.Json);
```
Call the `load` or `loadAll` method on the ConfigHelper to populate your configuration objects, the configuration object and the matching configuration file path is required (When using environment variables the path is not requried).
```typescript
 config.loadAll([
        {
            config: new MarketConfig(),
            path: './config/market.json'
        },
        {
            config: new MongoConfig(),
            path: './config/mongo.json'
        }]);
```
Now the loaded configuration can be accessed by using `getConfig`.
```typescript
var marketConfig = config.getConfig(MarketConfig);
var mongoConfig = config.getConfig(MongoConfig);
```

`NOTE: When providing a path to configuration files, the directory containing package.json is the root.`
