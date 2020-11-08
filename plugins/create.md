# Create Plugin
Creating your first plugin is very easy, you can use the `xjs new` command or clone the [@xpresser/new-plugin](https://github.com/xpresserjs/new-plugin) repository.

```sh
xjs new # Then select plugin
# OR 
git clone https://github.com/xpresserjs/new-plugin
```

## Folder Structure
Just like xpresser you can keep any folder structure you like, but you have to point all paths to respective folders in your use.json

Using the `@xpresser/new-plugin` structure we have. (Excluding other common files like package.json)
```sh
-- controllers
   -- MainController.js
-- exports
   -- config.js
-- index.js
-- plugin-config.js
-- routes.js
-- use.json
```