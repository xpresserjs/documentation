# Events

There will come a time in your real world application where you would want to run some actions before or after something
happens. e.g Send otp codes, Do something after a post has been deleted.<br/>
With xpresser events, you can **listen** to events called anywhere in your application.

:::: xTabs Simple|With Arguments
::: xTab 0

```javascript
$.events.define("sayHey", () => {
  console.log("Hey!");
});

// Emit Event
$.events.emit("sayHey"); // logs "Hey!"
// or Emit after 3 seconds
$.events.emitAfter(3000, "sayHey");
```

:::
::: xTab 1

```typescript
$.events.define("sum", (x, y) => {
    console.log(`Sum of x+y: ${x + y}`);
});

// Emit Event
$.events.emit("say", 2, 3); // logs "Sum of x+y: 5"
// or Emit after 3 seconds
$.events.emitAfter("30 hour", "say", 2, 3);
```

:::
::::

## Generate an Events file.

An events file is where multiple related events can be defined. You can think of it like the **controller** for event
handling.

To generate an event file, use the xjs-cli [make:event](../xjs-cli.md#make-event)

```shell
xjs make:event <EventName>

# example
xjs make:event UserEvents
# Creates a file @ backend/events/UserEvents.(js|ts)
```

Note: **xjs-cli** does not automatically add the keyword **Events** to the name you provide if it does not exist like in
controllers or middlewares.

## Usage

Using the `UserEvents` class below
:::: xTabs Javascript|Typescript
::: xTab Javascript

```javascript
module.exports = {
  namespace: "UserEvents",
  
  index() { /* some codes */ },
  onLogin() { /* some codes */ },
  onSignup() { /* some codes */ },
  onFullNameChange() { /* some codes */ },
};
```

:::
::: xTab Typescript

```typescript
export = {
    namespace: "UserEvents",

    index() { /* some codes */
    },
    onLogin() { /* some codes */
    },
    onSignup() { /* some codes */
    },
    onFullNameChange(user) { /* some codes */
    },
};
```

:::
::::

### Emitting Events

#### `$.events.emit(event: string, ...args: any[])`

The above events can be called like so:

```javascript
$.events.emit("UserEvents"); // Calls `index` method
$.events.emit("UserEvents.onLogin");
$.events.emit("UserEvents.onSignup");
$.events.emit("UserEvents.onFullNameChange", user);
```

The `index` method is called by default. it also inherits **namespace** as name. Using the example above, the index
method will run when we call `$.events.emit("UserEvents")`

### Emit after a specific time.

#### `$.events.emitAfter(ms: number, event: string, ...args: any[])`

By default, all events run in background **immediately** and not waited for. You can also decide when to start an event.

```javascript
$.events.emitAfter(3000, "someEvent") // starts after 3 seconds
```

**Note:** Durations are in milliseconds

### Emit with a Callback

If you want to run a function after an event has completed, you can use the `$.events.emitWithCallback(event, arguments, callback)`
method.

```typescript
$.events.define('someEvent', () => "DONE!");

$.events.emitWithCallback('someEvent', [arguments], (returned) => {
  // returned === "DONE!"
})
```

### Emit from Controller Actions

There is no difference when using events in controllers, once you have your xpresser instance you can call events.

```javascript
const $ = require("xpressser").getInstance();

const AccountController = {
  
  updateProfile(http, {user}) {
    // If instance ($) is available already
    $.events.emit("UserEvents.onFullNameChange", user)
    
    // OR instance from http.$(?)
    http.$("events").emit("UserEvents.onFullNameChange", user)
    
    // OR instance from http.$instance()
    http.$instance().events.emit("UserEvents.onFullNameChange", user)
  }
}
```



