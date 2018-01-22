/**
 * Intent
 * Decouple an abstraction from its implementation so that the two can vary independently
 *
 *
  Participants
    • Abstraction
      - defines the abstraction's interface.
      - maintains a reference to an object of type Implementor.
    • RefinedAbstraction
      - Extends the interface defined byAbstraction.
    • Implementor
      - defines the interface for implementation classes. This interface doesn't
        have to correspond exactly to Abstraction's interface;in fact the two interfaces
        can be quite different.

      Typically the Implementor interface provides
      only primitive operations, and Abstraction defines higher-level operations
      based on these primitives.
    • Concrete lmplementor
      - implements the Implementor interface and defines its concrete implementation.

  Collaborations
    • Abstraction forwards client requests to its Implementor object.

 Consequences
  The Bridge pattern has the following consequences:
    1. Decoupling interface and implementation. An implementation is not bound permanently
      to an interface. The implementation of an abstraction can be configured
      at run-time. It's even possible for an object to change its implementation
      at run-time.
      Decoupling Abstraction and Implementor also eliminates compile-time
      dependencies on the implementation. Changing an implementation class
      doesn't require recompiling the Abstraction class and its clients. This property
      is essential when you must ensure binary compatibility between different
      versions of a class library.
      Furthermore, this decoupling encourages layering that can lead to a betterstructured
      system. The high-level part of a system only has to know about Abstraction and Implementor.
    2. Improved extensibility. You can extend the Abstraction and Implementor hierarchies
      independently.
    3. Hiding implementation details from clients. You can shield clients from implementation
    details, like the sharing of implementor objects and the accompanying
    reference count mechanism (if any).
 */


// Not a pure implementation, sort of in js.

function Abstraction(concreteImplementor) {
  this.concreteImplementor = concreteImplementor

  this.run = function() {
    this.concreteImplementor.runProcess()
  }
}

function RefinedAbstraction() {
  this.runAndLog = function() {
    console.log('Logging the running')
    this.concreteImplementor.runProcess()
  }
}

function Implementor() {
    this.runProcess = function() {
      // empty
    }
}


// Matches Implementor API
function BatchImplementor() {
  this.runProcess = function () {
    console.log('runProcess BatchImplement')
  }
}

// Matches Implementor API
function BulkImplementor() {
  this.runProcess = function () {
    console.log('runProcess BulkImplementor')
  }
}

// var a = Object.assign({}, new RefinedAbstraction(), new Abstraction(new BatchImplementor()))
new RefinedAbstraction().runAndLog.call(new Abstraction(new BatchImplementor()))
