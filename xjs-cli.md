# Xjs-Cli

[**xjs-cli**](https://www.npmjs.com/package/xjs-cli) is a command-line tool made for xpresser. 
It provides helpful commands that can assist you in building your application faster. 

## Installation
xjs-cli requires **global** installation.

### Npm
```shell script
npm i xjs-cli -g
```

### Yarn
```shell script
yarn global add xjs-cli
```

## Usage
To view list of available commands
```shell script
xjs
# OR
xjs --help
```

**Note**: Available commands differs when the above command is called from a folder without **xjs-cli init file**.

## Init File
An init file is required to tell xjs-cli your **Boot File** where **xpresser** was called from.

Create init file assuming you have xpresser booted in **app.js** 
```shell script
xjs init app.js
```
Your init file **use-xjs-cli.json** will be generated in current working directory.

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
  "jobs_path": "backend/jobs"
}

```

* **main**: Your boot file.
* **server**: command to execute your main file with.
    i.e `nodemon app.js`
* **console**:  command to execute your main file when running console commands.


## Project Commands
Project commands are only available when there is a valid `use-xjs-cli.json` in the current working directory.

* up
* down
* start
* routes
* [@/run](#run)
* make:job
* make:event
* make:view
* make:model
* make:controller
* make:controllerService
* make:middleware
* [cron](#cron)
* [stop](#stop)
* [restart](#restart)
* check-for-update
* [new/create](#new-create)
* install-prod-tools

---
Commands can have arguments that are required or optional

**`[optional]`** Square braces represents the optional arguments
<br>
**`<required>`** Less _&&_ Greater Than signs represents the required arguments

---

### up
Removes app from maintenance mode.
```shell script
xjs up
```

### down
Put App in maintenance mood.
```shell script
xjs down
```

### start
Start main file defined in use-xjs-cli.json
```shell script
xjs start
```

By default the `development` init config will be used.
To start script in production **xjs-cli** uses [forever](https://www.npmjs.com/package/forever) to start your main file.

Run `xjs install-prod-tools` to install forever on your machine.
```shell script
xjs start prod
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


### new/create
Create new xjs project.
```shell script
xjs new [name]
```

### @/run
Run job
```shell script
xjs @ <job>
# OR
xjs run <job>
```

### cron
Run jobs that have the `schedule` property defined.
```shell script
xjs cron
```

### stop
```shell script
xjs stop all   ## Stop all services.
xjs stop cron   ## Stop cron service.
xjs stop server   ## Stop server
```

### restart
```shell script
xjs stop all   ## Restart all services.
xjs stop cron   ## Restart cron service.
xjs stop server   ## Restart server
```



