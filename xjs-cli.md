# Xjs-Cli

[**xjs-cli**](https://www.npmjs.com/package/xjs-cli) is a command-line tool made for xpresser. 
It provides helpful commands that can assist you in building your application faster. 

## Installation
xjs-cli requires **global** installation.


:::: xTabs Npm|Yarn
::: xTab Npm
```sh
npm i xjs-cli -g
```
:::

::: xTab Yarn
```sh
yarn global add xjs-cli
```
:::
::::

## Usage
To view list of available commands
```sh
xjs
# OR
xjs --help
```

**Note**: Available commands differs when the above command is called from a folder without **xjs-cli init file**.

## Init File
An init file is required to tell xjs-cli your **Boot File** where **xpresser** was called from.

Create init file assuming you have xpresser booted in **app.js** 
```sh
xjs init app.js
# OR (Typescript)
xjs init app.ts
```
Your init file **use-xjs-cli.json** will be generated in current working directory.

:::: xTabs Javascript|Typescript
::: xTab Javascript
```json
{
  "dev": {
    "main": "app.js",
    "start_cron": "node",
    "start_server": "nodemon",
    "start_console": "node"
  },
  "prod": {
    "main": "app.js",
    "start_cron": "pm2 start",
    "stop_cron": "pm2 stop",
    "start_server": "pm2 start",
    "stop_server": "pm2 stop",
    "start_console": "node"
  },
  "jobs_path": "backend/jobs",
  "async_cron_jobs": false
}
```
:::

::: xTab Typescript
```json
{
  "dev": {
    "main": "app.ts",
    "start_cron": "ts-node-dev --transpile-only",
    "start_server": "ts-node-dev --respawn --transpile-only",
    "start_console": "ts-node-dev --transpile-only"
  },

  "prod": {
    "main": "dist/app.js",
    "start_cron": "pm2 start",
    "stop_cron": "pm2 stop",
    "start_server": "pm2 start",
    "stop_server": "pm2 stop",
    "start_console": "node"
  },

  "jobs_path": "backend/jobs",
  "async_cron_jobs": false,

  "stacks": {
    "tsc" : ["tsc -p tsconfig.json"]
  } 
}
```
:::
::::

The commands are seperated in to two parts. The first part has the **dev** commands the second the **prod** commands.

| key   | Description
| ----- | -----------
| **main** | Your boot file.
| **start_cron** | The bash command to start cron
| **start_server** | The bash command to start the server
| **start_console** |  The bash command to execute your main file when running console commands.
| **stop_cron** | The bash command to stop cron
| **stop_server** | The bash command to stop already running server
| **jobs_path** | The path to your jobs folder. Relative to base folder.
| **async_cron_jobs** | If set to `true`, Cron jobs will run asynchronously. By default is `false`.
| **tsc** | An array of commands to call when we run `xjs tsc build`

## Project Commands
Project commands are only available when there is a valid `use-xjs-cli.json` in the current working directory.

* [help](#help)
* [up](#up)
* [down](#down)
* [tsc](#tsc)
* [start](#start)
* [routes](#routes)
* [@/run](#run)
* [make:job](#make-job)
* [make:event](#make-event)
* [make:view](#make-view)
* [make:model](#make-model)
* [make:controller](#make-controller)
* [make:controllerService](#make-controllerService)
* [make:middleware](#make-middleware)
* [cron](#cron)
* [stop](#stop)
* [restart](#restart)
* [import](#import)
* [check-for-update](#check-for-update)

---
Commands can have arguments that are required or optional

**`[optional]`** Square braces represents the optional arguments
<br>
**`<required>`** Less _&_ Greater Than signs represents the required arguments

---

### help
Display help for commands
```sh
xjs help [command]

# Example
xjs help
# With Command
xjs help start
```

### up
Removes app from maintenance mode.
```sh
xjs up
```

### down
Put App in maintenance mood.
```sh
xjs down
```

### tsc
This command can only be used when using Typescript

### start
Start the main file defined in use-xjs-cli.json
```sh
xjs start
```

By default, the `development` init config will be used.
To start script in production **xjs-cli** uses [forever](https://www.npmjs.com/package/forever) to start your main file.

Run `xjs install-prod-tools` to install forever on your machine.
```sh
xjs start --prod
``` 

### routes
Show all registered routes in your project.
```
xjs routes [search] [query]
```

```
┌─────────┬────────┬──────┬────────────┬──────┐
│ (index) │ method │ path │ controller │ name │
├─────────┼────────┼──────┼────────────┼──────┤
│    0    │ 'ALL'  │ '/*' │ [Function] │ null │
└─────────┴────────┴──────┴────────────┴──────┘
```

### @/run
Run job
```sh
xjs @ <job>
# OR
xjs run <job>
```

### make:job
Generate a job file.
```sh
xjs make:job <name>

# Example
xjs make:job EmptyPostTrash
```

### make:event
Generate an event file.
```sh
xjs make:event <name> [namespace]

# Example
xjs make:event UserEvents
# Adding namespace
xjs make:event UserEvents user
```

### make:view
Generate a view file using template extension set in config `{template.extension}`
```sh
xjs make:view <name>
```

### make:model
Generate a model file. By default, this command is not useful without a plugin that plugs to it.
```sh
xjs make:model <name>
```

### make:controller
Generate a controller file.
```sh
xjs make:controller [name]
```

### make:controllerService
Generate a controllerService file.
```sh
xjs make:controllerService <name>

# Example
xjs make:controllerService UserService
```

### make:middleware
Generate a middleware file.
```sh
xjs make:middleware <name>

# Example
xjs make:middleware Auth
```

### cron
Run jobs that have the `schedule` property defined.
```sh
xjs cron
```

### stop
```sh
xjs stop all   ## Stop all services.
xjs stop cron   ## Stop cron service.
xjs stop server   ## Stop server
```

### restart
```sh
xjs stop all   ## Restart all services.
xjs stop cron   ## Restart cron service.
xjs stop server   ## Restart server
```

### import
This command imports required plugin files into your project.
```sh
xjs import <plugin> <folder> [overwrite]

# For the @xpresser/auth plugin
xjs import Auth configs
# Or with overwrite
xjs import Auth configs overwrite
```


### check-for-update
Checks if you are using the latest version of **xpresser**, if you are not, it will ask if you would love to update.
```sh
xjs check-for-update

# Result
=>  Checking npm registry for version update...
=>  xpresser latest version is 0.2.83 but yours is 0.2.81
? Would you like to update? (Y/n) 
```


## Non-Project Commands
These commands are only available when there is no **use-xjs-cli.json** file in the current working directory.

* [new/create](#new-create)
* [init](#init)
* install-prod-tools



### new/create
Create new xjs project.
```sh
xjs new [name]
```

### init
Initialize xjs-cli in your project and creates a `use-xjs-cli.json`. You need to pass the name of your **xpresser boot file**.
```sh
xjs init [xpresser_file]

# If boot file is app.js
xjs init app.js
```


