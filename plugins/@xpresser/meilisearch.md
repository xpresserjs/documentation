# Xpresser Meilisearch Plugin

###### STAGE: (RFC)

This plugin will:

- Add Meilisearch to your xpresser project.
- Add cli commands to **install/start** Meilisearch.
- Provide Search Models.


## Setup

```sh
npm install @xpresser/meilisearch
#OR
yarn add @xpresser/meilisearch
```

### Register Plugin
Add the following to your `plugins.json` file:

```json
{
    "npm://@xpresser/meilisearch": true
}
```

### Add CLI Commands

Add the following to your `use-xjs-cli.json` file:

Note: If you don't have a `use-xjs-cli.json` file see [xjs-cli#init-file](../../xjs-cli.md#init-file) first.

```json
{
  "extensions": [
    "npm://@xpresser/meilisearch"
  ] 
}
```

### Configuration
Import plugin configuration:

```sh
npx xjs import meilisearch configs
```

This will import the meilisearch configuration file.


## Usage
### Install Meilisearch
```sh
npx xjs mei:install
# OR
node your-boot-file.js cli mei:install
```

The command above will install Meilisearch to your project in the 'storage/meilisearch/bin' directory by default.
To change the bin directory, see `pathToBinary` in the configuration file.


### Start Meilisearch
```sh
npx xjs mei:start
# OR
node your-boot-file.js cli mei:start
```

**Note:** The command above will only start Meilisearch in the foreground.


### Start Meilisearch in Background

To run Meilisearch in the background, There are two ways:

- The simple xpresser way (Using Pm2)
- Running Meilisearch as a service.

#### Using Pm2

[Pm2](https://www.npmjs.com/package/pm2) is a production process manager for Node.js.
To start meilisearch using **pm2**, all we  have todo is call your xpresser `bootFile` with the necessary arguments:

```sh
pm2 start your-boot-file.js -- cli mei:start
```
The command above is same as running `npx xjs mei:start` but this time will be handled by pm2.


#### Run Meilisearch as a Service
Use the recommended: [Meilisearch - Getting ready for Production Cook Book](https://docs.meilisearch.com/learn/getting_started/getting_ready_for_production.html)


## Search Model
A search model is a class that extends the `MeiliSearchModel` class.

### Define Search Model

```ts
import { defineSearchModel } from "@xpresser/meilisearch";
import { Index } from "meilisearch";

export const CustomSearchModel = defineSearchModel({
    // The name of the model.
    name: "Custom",

    // (Optional) The name of the model's table/index.
    // If not provided, the lower cased name of the model will be used.
    index: "custom",

    /**
     * (Optional) Modify/Customize index
     * @param index
     */
    async init(index: Index): Promise<void> {
        // do something with the index
        // maybe set the index's settings
    },

    /**
     * Provide the data to be indexed.
     */
    async data<T>(index: Index): Promise<T[]> {
        // return an array of objects to be indexed
        return [] as T[];
    }
});
```

### Sync Data
To sync the data you provided with Meilisearch, you can use the `syncData` method.

```ts
 const [lenghtOfQueuedData, QueryResult] = await UsersSearchModel.syncData();
```
The first data is the length of the queued data.
The second data is the query result.

This can be called anywhere in your application and will sync the data.

**Note:** Your meilisearch instance must be running.

### Interact with Meilisearch Index
To interact with the raw Meilisearch  index API, you can use the `index` property. For example:

```ts
await  UsersSearchModel.index.updateSettings({
    "searchableAttributes": ["name", "email"]
});
```

## Meilisearch Client
To interact with the Meilisearch client directly, you should use the `useMeilisearch` helper method.

```ts
import { useMeilisearch } from '@xpresser/meilisearch';

const client = useMeilisearch();
```
OR with your xpresser instance. If no instance is provided, the default instance will be used.
```ts
import { $ } from '../some-xpresser-instance';  

const client = useMeilisearch($);
```

## Sync with Cron
Meilisearch handles most tasks asynchronously so the need to sync data with cron is rare. only if you want to be **timed** and **precise** about when to sync data.

To sync with cron, simply create a job and call the `syncData` method.

```ts
import JobHelper from "xpresser/src/Console/JobHelper";
import { UsersSearchModel } from "search/models/folder";

export = {
    async handler(args: string[], job: JobHelper): Promise<any> {
        try {
            // sync data
            const [length] = await UsersSearchModel.syncData();
            // log the length of the data synced
            job.$.logSuccess(`Synced ${length} users`);
        } catch (e) {
            console.error(e);
        }

        // End the job
        job.end();
    }
};
```
