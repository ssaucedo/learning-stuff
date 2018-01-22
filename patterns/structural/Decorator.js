/**
 * Is totally transparent for the Component.
 * With strategies, the component itself knows about possible extensions.
 */


/**
 * Decorator (175) describes how to add responsibilities to objects dynamically.Decorator
 * is a structural pattern that composes objects recursively to allow an open-ended number
 * of additional responsibilities
 *
 * Use Decorator
  • to add responsibilities to individual objects dynamically and transparently,
      that is, without affecting other objects.
  • for responsibilities that can be withdrawn.
  • when extension by subclassing is impractical. Sometimes a large number
      of independent extensions are possible and would produce an explosion of
      subclasses to support every combination. Or a class definition maybe hidden
      or otherwise unavailable for subclassing.
 */

/*
Participants
  • Component (VisualComponent)
    - defines the interface for objects that can have responsibilities added to
    them dynamically.
  • ConcreteComponent (TextView)
    - defines an object towhich additional responsibilities canbe attached.
  • Decorator
    - maintains a reference to a Component object and defines an interface that
    conforms to Component's interface.
  • ConcreteDecorator (BorderDecorator, ScrollDecorator)
    - adds responsibilities to the component.

  Collaborations
  • Decorator forwards requests to its Component object.
  It may optionally perform additional operations before and after forwarding the request.
*/


// The decorator and decorated interfaces must be equals.

/**
 *
 * ISSUES:
 *    Interface conformance. A decorator object's interface must conform to the interface
 *    of the component it decorates
 *
 *    Omitting the abstract Decorator class
 *
 *    Keeping Component classes lightweight. To ensure a conforming interface, components
 *    and decorators must descend from a common Component class.
 *    It's important to keep this common class lightweight
 *     Putting a lot of functionality into Component also increases the
 *     probability that concrete subclasses will pay for features they don't need.
 *
 */

function component() {
  this.render = function() {
    console.log('Rendering component')
  }
}

// in a class structure extra functionality is added on an implementation of the decorator.
function decorator(component) {
  this.component = component

  this.render = function() {
    console.log('Log')
    this.component.render()
  }
}

new decorator(new component()).render()








