/**
 * Instead, we could define TextShape so that it adapts the TextView interface to
 * Shape's. We can do this in one of two ways:
 * (1) by inheriting Shape's interface and TextView's implementation.
 * (2) by composing a TextView instance within a TextShape and implementing
 * TextShape in terms of Text View's interface. These
 * two approaches correspond to the class and object versions of the Adapter pattern.
 * We call TextShape an adapter.
 *
 * Often the adapter is responsible for functionality the adapted class doesn't provide.
 */


function Adaptee() {
     this.runExecution = function () {
       console.log('Adaptee run execution')
     }
}

// Object approach.
function Adapter () {
  this.adaptee = new Adaptee();
  this.execute = function () {
     this.adaptee.runExecution()
  }
}

function Executor () {
  this.execute = function () {
    console.log('Executor run execution')
  }
}

/**
 * Calls an object whose api has an #execute method. Adaptee implementation of runExecution fits the requirements but not
 * the API. This api is the target.
 */
function Client(executor) {
    this.executor = executor

    this.clientExecute = function () {
      this.executor.execute()
    }
}



var client = new Client(new Adapter())
client.clientExecute()
client = new Client(new Executor())
client.clientExecute()


/*
 Applicability
 Use the Adapter pattern when
  • you want to use an existing class, and its interface does not match the one you need.
  • you want to create a reusable class that cooperates with unrelated or unforeseen
    classes, that is, classes that don't necessarily have compatible interfaces.
  • (object adapter only) you need to use several existing subclasses, but it's unpractical
    to adapt their interface by subclassing every one. An object adapter
    can adapt the interface of its parent class
 */