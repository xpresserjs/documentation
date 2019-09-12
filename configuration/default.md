## Default Configurations
### name
Name of your project/application.

### env
Equivalent to NODE_ENV, holds your current environment.

options: **development, production, staging** or your **custom** environment

## Debug
### debug.enabled
If true, debugging is enabled.

### debug.controllerAction
if true, xpresser will log any requests made to any registered controller action.

## Server
### server.port
**`Default: 2000`**

Server port.

### server.protocol
**`Default: 'http'`**

Server protocol needed for url generator helpers.

### server.domain
**`Default: 'localhost'`**

Server domain.

### server.root
**`Default: '/'`**

Server root needed for url generator helpers.
If your files are in a sub-folder you can indicate here also.


