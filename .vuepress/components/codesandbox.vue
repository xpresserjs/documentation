<template>
  <div>
    <template v-if="lang==='ts'">
      <iframe src="https://codesandbox.io/embed/github/xpresserjs/new-app-ts/tree/main/?autoresize=1&fontsize=14&hidenavigation=1&theme=dark"
              style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
              title="new-app-ts"
              allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
              sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
      ></iframe>
    </template>

    <template v-else-if="lang==='params-loader'">
      <iframe src="https://codesandbox.io/embed/github/xpresserjs/params-loader-ts-demo/tree/main/?autoresize=1&fontsize=14&module=%2Fbackend%2Fcontrollers%2FAppController.ts&theme=dark"
              style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
              title="params-loader-ts-demo"
              allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
              sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
      ></iframe>
    </template>

    <template v-else>
      <iframe src="https://codesandbox.io/embed/github/xpresserjs/new-app/tree/main/?autoresize=1&fontsize=14&hidenavigation=1&theme=dark"
              style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
              title="new-app"
              allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
              sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
      ></iframe>
    </template>

  </div>
</template>

<script>
export default {
  props: {
    lang: {type: String, default: "js"}
  }
}
</script>
