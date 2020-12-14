# Ngrok Plugin

##### Already installed? [Jump to Usage](#usage)

[Npm](https://npmjs.com/package/@xpresserjs/ngrok) | [Git](https://github.com/xpresserjs/ngrok)

#### What is ngrok?

[Ngrok](https://ngrok.com) is a cross-platform application that enables developers to expose a local development server
to the Internet with minimal effort. The software makes your locally-hosted web server appear to be hosted on a
subdomain of ngrok.com, meaning that no public IP or domain name on the local machine is needed.

## Installation

Npm: **`npm i @xpresser/ngrok -d`**
<br/>
Yarn: **`yarn add @xpresser/ngrok --dev`**

### Add to plugins.json

**Note:** This plugin should be before every other plugin so other plugins can access its modified {server.domain}.

:::: xTabs xpresser>=0.5.0|xpresser<=0.4.9
::: xTab 0

```json
{
  "npm://@xpresser/ngrok": {
    "env": "development"
  }
}
```

:::
::: xTab 1

```json
[
  "npm://@xpresser/ngrok"
]
```

:::
::::

### Add to use-xjs-cli.json extensions

If you don't have a `use-xjs-cli.json` file see [xjs-cli#init-file](../../xjs-cli.md#init-file) first.

```json
{
  "extensions": [
    "npm://@xpresser/ngrok"
  ]
}
```

## Usage

Enable this plugin by setting **`{server.use.ngrok: true}`** in your config. <br/>

This plugin uses ngrok's [npm package](https://npmjs.com/package/ngrok) to start the tunnel using your configured
xpresser server port and also sets your project config `server.domain` to the ngrok's domain.

Command: **`xjs ngrok`** will result to something like this

```sh
=> Ngrok.io connected successfully.
=> Url: https://992famv7ss1c.ngrok.io
=> Reload your xpresser server.
```

Reload your xpresser server for it to pick up the new running tunnel's information and make it available for you to use
in your project. Your xpresser server can now be accessible via the Url `https://992famv7ss1c.ngrok.io`

### Commands

Two commands are added to your projects xjs-cli.

- **`xjs ngrok [config]`** - Connect to ngrok using the **default** or specified **config**.
- **`xjs ngrok-update`** - Update ngrok binaries.

### $.store Data

if plugin is enabled, the key `ngrok` will hold a data in [$.store](../../dollar-sign.html#store) like below. <br>
Calling **`$.store.get('ngrok')`** will return:

```javascript
({
  config: "default", // Config used.
  url: "https://992famv7ss1c.ngrok.io", // Last Ngrok url.
  domain: "992famv7ss1c.ngrok.io", // Last Ngrok domain.
  date: "2020-12-12T11:48:38.835Z" // Time of last connection.
})
```

This data is accessible anywhere in your project.

### Using custom ngrok config.

To use custom ngrok config you need to import the plugin's config files if you have not done that already. Run:

```shell
xjs import ngrok configs
```

The config section of the config file can accept these ngrok configs as

```javascript
({
  config: {
    default: {
      proto: 'http', // http|tcp|tls, defaults to http
      port: 8080, // port or network address, defaults to 80
      auth: 'user:pwd', // http basic authentication for tunnel
      subdomain: 'alex', // reserved tunnel name https://alex.ngrok.io
      authtoken: '12345', // your authtoken from ngrok.com
      region: 'us', // one of ngrok regions (us, eu, au, ap, sa, jp, in), defaults to us
      configPath: '~/git/project/ngrok.yml', // custom path for ngrok config file
      binPath: path => path.replace('app.asar', 'app.asar.unpacked'), // custom binary path, eg for prod in electron
      onStatusChange: status => {}, // 'closed' - connection is lost, 'connected' - reconnected
      onLogEvent: data => {}, // returns stdout messages from ngrok process
    }
  }
})
```