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
| **tmpPath** | `string`  | Path to file's temporary location.
| **encoding** | `string` | Encoding of the uploaded file.
| **mimetype** | `string` | Mimetype of the uploaded file.
| **size** | `number` | Size of uploaded file in bytes.
| **body** | `object` | The body of the request.

### file.error()

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

### file.extension()

Returns the extension of the uploaded file

```typescript
const file = await http.file("document", {
    extensions: ["pdf"]
});

console.log(file.extension()); // "pdf"
```

### file.dotExtension()

Same function as `file.extension()` but is prefixed with dot '.'

```javascript
console.log(file.extension()); // ".pdf"
```

### file.extensionMatch()

Checks if file extension matches the string provided or is included array provided.

```javascript
const file = await http.file("document", {
  extensions: ["pdf"]
});

console.log(file.extensionMatch("jpg")); // false
console.log(file.extensionMatch(["pdf", "jpg"])); // true
```

### file.dotExtensionMatch()

Same function as `file.extensionMatch()` but with dot '.' prefixed.

```javascript
const file = await http.file("document", {
  extensions: ["pdf"]
});

console.log(file.dotExtensionMatch(".jpg")); // false
console.log(file.dotExtensionMatch([".pdf", ".jpg"])); // true
```

### file.saveTo()

Save uploaded file to file storage path provided. if a function is passed instead of a string it will be called and the
string returned will be used (Returns `boolean`)

```javascript
const file = await http.file("document", {
  extensions: ["pdf"]
});

await file.saveTo("full/path/to/storage", {
  name: "optional-filename",
  overwrite: true, 
  prependExtension: false, 
});
```

- **name:** Filename, if not defined, original file name will be used.
- **overwrite:** Default: `true`, if set to `false` an error will be thrown if the file already exists.
- **prependExtension:** Default: `false`, if set to `true`, the file's extension will be added to filename

## UploadedFiles (class)
