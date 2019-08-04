# Xjs-Cli

[**xjs-cli**](https://www.npmjs.com/package/xjs-cli) is a command-line interface made for xpresser. 
It provides helpful commands that can assist you in building your application faster. 

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
  "development": {
    "main": "app.js",
    "server": "nodemon",
    "console": "node"
  },
  "production": {
    "main": "app.js",
    "server": "forever start",
    "console": "node"
  },
  "jobsPath": "jobs"
}
```

* **main**: Your boot file.
* **server**: command to execute your main file with.
    i.e `nodemon app.js`
* **console**:  command to execute your main file when running console commands.


## Commands
* [new](#new)
* [@/run](#run)
* [cron](#cron)
* [stop](#stop)
* [restart](#restart)
* [migrate](#migrate)
* [migrate:make](#migratemake)
* migrate:rollback
* migrate:refresh
* make:job
* make:event
* make:view
* make:model
* make:controller
* make:middleware
* install-prod-tools
* check-for-update

**[option]:** optional <br>
**&lt;option&gt;:** required

### new
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

### stop
* all
* cron
* server

```shell script
xjs stop <process>
```

### restart
* all
* cron
* server

```shell script
xjs restart <process>
```

### migrate
Migrate your database using [KnexJs](https://www.npmjs.com/package/knex), 


Run `xjs install-prod-tools` to install knexJs on your machine.

```shell script
xjs migrate
```

### migrate:make
Generates new migration file in **migrations** folder.

```shell script
xjs migrate:make <name>
```



