# File Uploader Plugin

Note: XpresserJs also supports all express supported file handling libraries.

Built on [busboy](https://npmjs.com/package/busboy), an easy plugin to handle file uploads from form request to your
application storage folder.

## Installation

#### NPM

```sh
npm install @xpresser/file-uploader
```

#### YARN

```sh
yarn add @xpresser/file-uploader
```

### Add to plugins.json

Add `npm://@xpresser/file-uploader` to your `plugins.json`, if you don't have one create a new one in your `backend`
folder.

:::: xTabs xpresser>=0.5.0|xpresser<=0.4.9
::: xTab 0

```json
{
  "npm://@xpresser/file-uploader": true
}
```

:::
::: xTab 1

```json
[
  "npm://@xpresser/file-uploader"
]
```

:::
::::

### Typescript

Add the code below to your `xpresser.d.ts` file.

```typescript
import "@xpresser/file-uploader/xpresser";
```

## Single File Upload

In your view

```html

<form action="/upload" enctype="multipart/form-data" method="POST">
  <input type="file" name="avatar"/>
  <input type="submit" value="Upload  your avatar"/>
</form>
```

In your controller action

```javascript
$.router.post('/upload', async (http) => {
  
  // Get File
  const file = await http.file('avatar', {
    size: 1, // 1MB
    mimeType: "image",
    extensions: ["png", "jpg", "gif"],
  });
  
  // Check for error
  if (file.error()) {
    return http.res.send(file.error())
  }
  
  // Save File
  await file.saveTo('path/to/folder');
  
  // check for save error()
  if (!file.isSaved()) {
    return http.res.send(file.saveError());
  }
  
  // return response.
  return http.res.send({
    file: file,
    msg: "File uploaded successfully!."
  });
});
```

## Multiple Files Upload

In your view

```html

<form action="/multiple_upload" enctype="multipart/form-data" method="POST">
  Select images: <input type="file" accept="image/*" name="images" multiple>
  <button type="submit">Upload your images</button>
</form>
```

In your controller action

```javascript
$.router.post('/multiple_upload', async (http) => {
  // Get Files
  const images = await http.files('images', {
    files: 10,
    size: 1,
    mimetype: 'image'
  });
  
  // check errors
  if (images.hasFilesWithErrors()) {
    const filesWithErrors = images.filesWithError();
    
    // Do something with filesWithErrors
    
    return http.send({
      message: 'Upload encountered some errors'
    })
  }
  
  // Save all files to one folder
  await images.saveFiles('path/to/folder');
  
  // Or save files to specific folder using conditions by passing a function
  await images.saveFiles((file) => {
    return 'path/to/images/' + file.extension();
  });
  
  // return response
  return http.send({
    message: `${images.files.length} files has been uploaded successfully!.`
  });
});
```

## Form Body

The body of the form is returned by `http.file` and `http.files` function

```javascript
const image = http.file('fieldname');
console.log(image.body)

// OR

const files = http.files(['fieldname1', 'fieldname2']);
console.log(files.body)
```

## Configuration Options

`http.file` & `http.files` have different but similar configuration options.

:::: xTabs Single|Multiple
::: xTab 0

```typescript
type Options = {
    size?: number;
    mimetype?: string | RegExp;
    extensions?: string[];
    includeBody?: boolean;
}

declare function file(field: string, options: Options): Promise<UploadedFile>
```

:::
::: xTab 1

```typescript
type Options = {
    size?: number;
    mimetype?: string | RegExp;
    extensions?: string[];
    includeBody?: boolean;
    mimetypeForEachField?: Record<string, string | RegExp>
    extensionsForEachField?: Record<string, string[]>
}

declare function files(field: string | string[], options: Options): Promise<UploadedFiles>
```

:::
::::

### size

To limit file/files size, you can set maximum file size in `megabytes` using the `size` config option.

```javascript
const file = await http.file("fieldName", {
  size: 1 // 1 megabyte
});
```

### mimetype

The mimetype config restricts uploads to a specific mimetype and can either be a `string` or a `regular expression.`

```javascript
const image = await http.file("avatar", {
  mimetype: "image" // string
});

const images = await http.files("images", {
  mimetype: new RegExp("png|jpg|gif") // Regex
});
```

### extensions

To allow only certain extensions, you can pass them as an array of strings.

```javascript
const logo = await http.file("logo", {
  extensions: ["png", "svg"]
});

const docs = await http.files("documents", {
  extensions: ['pdf', 'doc', 'docx', 'txt']
});
```

### includeBody

If for some reasons you want to exclude the body of the request set `IncludeBody` to false. Note: This is enabled by
default.

```javascript
const logo = await http.file("logo", {includeBody: false});
```

### mimetypeForEachField (files)

The `mimetypeForEachField` config enables you to define specific `mimetype` for each fieldName like so:

```javascript
const files = await http.files(["logos", "attachments"], {
  mimetypeForEachField: {
    logos: "image",
    attachments: new RegExp("(image|pdf|audio)")
  }
});
```

Files uploaded with fieldName `attachments` will fail if the mimetype does not match either `image, pdf or audio`.

### extensionsForEachField (files)

The `extensionsForEachField` config enables you to define specific `extensions` for each fieldName like so:

```javascript
const files = await http.files(["logos", "attachments"], {
  extensionsForEachField: {
    logos: ["png", "svg"],
    attachments: ["jpg", "pdf", "audio"]
  }
});
```

Files uploaded with fieldName `attachments` will fail if the extension does not match either `jpg, pdf or audio`.

## UploadedFile (class)

The `UploadedFile` class is returned when a single file is uploaded.

#### Properties

| Property  | Type      | Description
|-----------|-----------|----------------
| **input** | `string`  | Name of the input field.
| **name** | `string`  | Name of the uploaded file.
| **path** | `string?`  | Path to saved file.
| **tmpPath** | `string`  | Path to file's temporary location.
| **encoding** | `string` | Encoding of the uploaded file.
| **mimetype** | `string` | Mimetype of the uploaded file.
| **size** | `number` | Size of uploaded file in bytes.
| **body** | `object` | The body of the request.

### error()

This method checks if the current file has an error. If there is no error, it returns `false` else it returns an object
of the type below.

```typescript
interface FileError {
    type: "input" | "file" | "size" | "mimetype" | "extension";
    message: string;
    expected?: string;
    received?: string;
}

const file = await http.file("png");

if (file.error()) {
    return file.error().message;
}
```

Note: Error is cached and only computed once per request. So calling `file.error()` multiple times refers to the same
cached value.

### extension()

Returns the extension of the uploaded file

```typescript
const file = await http.file("document", {
    extensions: ["pdf"]
});

console.log(file.extension()); // "pdf"
```

### dotExtension()

Same function as `file.extension()` but is prefixed with dot '.'

```javascript
console.log(file.dotExtension()); // ".pdf"
```

### extensionMatch()

Checks if file extension matches the string provided or is included array provided.

```javascript
const file = await http.file("document", {
  extensions: ["pdf"]
});

console.log(file.extensionMatch("jpg")); // false
console.log(file.extensionMatch(["pdf", "jpg"])); // true
```

### dotExtensionMatch()

Same function as `file.extensionMatch()` but with dot '.' prefixed.

```javascript
const file = await http.file("document", {
  extensions: ["pdf"]
});

console.log(file.dotExtensionMatch(".jpg")); // false
console.log(file.dotExtensionMatch([".pdf", ".jpg"])); // true
```

### sizeToString()

This method returns string representation of the `file.size` value.

Sizes: `["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]`

```javascript
file.sizeToString() // 30KB
```

### saveTo()

Save uploaded file to storage folder provided.

```javascript
const file = await http.file("document", {
  extensions: ["pdf"]
});

// Save to folder.
await file.saveTo("full/path/to/storage", {
  name: "optional-filename",
  overwrite: true,
  prependExtension: false,
});
```

#### OPTIONS

- **name:** Filename, if not defined, original file name will be used.
- **overwrite:** Default: `true`, if set to `false` an error will be thrown if the file already exists.
- **prependExtension:** Default: `false`, if set to `true`, the file's extension will be added to filename

### isSaved()

This function checks if an uploaded file is saved to the folder specified when using `file.saveTo()`.

```javascript
// Save to folder.
await file.saveTo("full/path/to/storage", {
  name: "optional-filename",
  overwrite: true,
  prependExtension: false,
});

if (file.isSaved()) {
  // Maybe store path to db
  await Db.create(file.path)
}
```

### saveError()

This method checks returns the `file.saveTo()` error if any.

```javascript
// Save File
await file.saveTo('path/to/folder');

// check for save error()
if (!file.isSaved()) {
  return http.res.send(file.saveError());
}
```

### discard()

Should in any case you no longer want to save uploaded file. You can `discard` it.
<br> This function will `try` to delete the uploaded file from the **temporary** location where it is stored.

## UploadedFiles (class)
The `UploadedFile` class is returned when multiple files are uploaded.


#### Properties

| Property  | Type      | Description
|-----------|-----------|----------------
| **input** | `string`  | Name of the input field, (Each file will also have its own input)
| **body** | `object` | The body of the request.
| **files** | `UploadedFile[]` | Array of uploaded files.

### saveFiles()

This method loops through files **without** error and saves them to the **path** provided.

Note: It expects same arguments as UploadedFile's  `saveTo()` method.

```javascript
const files = await http.files(["images", "docs"]);

await files.saveFiles("path/to/folder", {overwrite: true})
```

#### Providing specific paths for each file.

To provide specific `path` or `options` for each file, pass a function to both arguments. This function will be called
during the loop and the current looped file will be passed as an argument.

```javascript
const files = await http.files(["images", "docs"]);

await files.saveFiles(
    file => `uploads/${file.extension()}`,
    file => ({overwrite: file.input === 'images'})
)
```

Using the example above, `pdf` files will be saved to `uploads/pdf` and other extensions will be saved to their
respective folders as well.

### hasFiles()

Checks if there are any uploaded files. Returns `boolean`

```javascript
files.hasFiles()
// Is equivalent to
files.files.length > 0
```

### hasFilesWithErrors()

Checks if any uploaded file has Error. Returns `boolean`

```javascript
const files = await http.files(["images", "docs"]);

if (files.hasFilesWithErrors()) {
  // do something
}
```

### hasFilesWithoutErrors()

Checks if uploaded files has any file **without** Error. Returns `boolean`

```javascript
const files = await http.files(["images", "docs"]);

if (files.hasFilesWithoutErrors()) {
  // do something
}
```

### filesWithError()

Returns an array of uploaded files  **with** Error.

```javascript
const files = await http.files(["images", "docs"]);

// loop files
files.filesWithError().forEach(file => {
  // log error message
  console.log(file.error().message)
})
```

### filesWithoutError()

Returns an array of uploaded files **without** Error.

```javascript
const files = await http.files(["images", "docs"]);

// loop files
for (const file of files.filesWithoutError()) {
  // Save file.
  await file.saveTo(`uploads/${file.extension()}`)
}
```
