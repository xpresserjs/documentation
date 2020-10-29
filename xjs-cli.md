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
    "start_console": "node",
    "jobs_path": "backend/jobs"
  },
  "prod": {
    "main": "app.js",
    "start_cron": "pm2 start",
    "stop_cron": "pm2 stop",
    "start_server": "pm2 start",
    "stop_server": "pm2 stop",
    "start_console": "node",
    "jobs_path": "backend/jobs"
  },
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
    "start_console": "ts-node-dev --transpile-only",
    "jobs_path": "backend/jobs"
  },

  "prod": {
    "main": "dist/app.js",
    "start_cron": "pm2 start",
    "stop_cron": "pm2 stop",
    "start_server": "pm2 start",
    "stop_server": "pm2 stop",
    "start_console": "node",
    "jobs_path": "backend/jobs"
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

## Non-Project Commands
These commands are only available when there is no **use-xjs-cli.json** file in the current working directory.

* [new/create](#new-create)
* [init](#init)
* [nginx:config](#nginx-config)



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

### nginx:config
This command helps you create  a minimal nginx configuration for your project on the fly.
```sh
xjs nginx:config

# Result (Questionnaire)
? Name of config file: my_app
? Path to file: /path/to/desired/folder.
? Your app domain: myapp.com
? Your app url (including port): localhost:3000
=>  Conf: my_app has been created at /path/to/desired/folder
```
The above questionnaire will create the file below.
```sh
server {
	listen 80;
#	listen 443 ssl;

	server_name myapp.com www.myapp.com;

#	ssl_certificate "cert.pem";
#   ssl_certificate_key "cert.key";


	location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## Project Commands
Project commands are only available when there is a valid `use-xjs-cli.json` in the current working directory.

* [help](#help)
* [up](#up)
* [down](#down)
* [start](#start)
* [routes](#routes)
* [stack](#stack)
* [@stack](#stack-2)
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

### stack
Return **concatenated** commands of a stack without running it. This way you can run it yourself. [#Stacks](#stacks)
```sh
xjs stack <name>

# Running returned commands with bash
xjs stack myCommands | bash
```

### @stack
Run **concatenated** commands of a stack using node `exec`. [#Stacks](#stacks)
```sh
xjs @stack <name>
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

## Stacks
The stack command is a utility command that helps you when run multiple bash commands. <br/> 
For Example most times we want to delete the build directory before we rebuild or run series of commands, we end up running something like this
```sh
rm -rf ./build && some-other-command && npm run build
```

With **stack** we can stack them up and call them with one command.

### Register a Stack
To register a stack of commands, all you need to do is add `{stacks.<commandName>}` in your `use-xjs-cli.json`
```json
{
  "stacks": {
    "myCommands": [
       "rm -rf ./build",
       "some-other-command",
       "npm run build"
    ]
  }
}
```

### Using a stack
Once your stack has been registered, you can call it like so:
```sh
xjs stack myCommands

# Returns concatenated version of your commands
### rm -rf ./build && some-other-command && npm run build
```

or run it like so:
```sh
xjs @stack myCommands

# Runs all commands
### => Running stack {myCommands}
### => rm -rf ./build && some-other-command && npm run build
### => Stack {myCommands} executed successfully!
```


## Cron Jobs
xjs-cli makes running cron jobs easier using this great node package: [cron](https://npmjs.org/package/cron). 

To add a job to cron all you need to do is: Register it in your `paths/to/jobs/folder/cron.(js|json)`.
if you don't have a cron file then create one in your jobs folder. Running `xjs cron` without a cron file will throw an error that should include the **expected** path to your cron file.


:::: xTabs cron.json|cron.js
::: xTab cron.json
```json
[
    {
        "job": "YourJob",
        "schedule": "* * * * * *"
    }
]
```
:::

::: xTab cron.js
```javascript
module.exports = [
     {
         job: "YourJob",
         schedule: "* * * * * *"
     }
]
```
:::
::::

### why Js or Json?
The default is `cron.json`, but when not found xjs-cli will try looking for a `cron.js` file. <br/>
We considered adding the `.js` support to give more options when declaring your cron jobs.

Given a scenerio when you want to use some cron time parser like [cron-time-generator](https://npmjs.com/package/cron-time-generator)
```js
const cronTime = require('cron-time-generator');

module.exports = [
     {
         job: "SomeJob",
         schedule: cronTime.everyMinute()
     },

    {
         job: "SomeOtherJob",
         schedule: cronTime.everyDayAt(4, 30)
     }
]
```
with `cron.js` you have power todo more.