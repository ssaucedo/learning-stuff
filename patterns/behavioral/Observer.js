/**
 * Define a one-to-many dependency between objects so that when one object
 * changes state, all its dependents are notified and updated automatically.
 * Known as ~Dependents, Publish-Subscribe~
 *
 * Applicability
 *
 * Use the Observer pattern in any of the following situations:
    • When an abstraction has two aspects, one dependent on the other. Encapsulating
      these aspects in separate objects lets you vary and reuse them independently.
    • When a change to one object requires changing others, and you don't know
      how many objects need to be changed.
    • When an object should be able to notify other objects without making assumptions
      about who these objects are.In other words, you don't want these
      objects tightly coupled.



 Participants
  • Subject
      - knows its observers. Any number of Observer objects may observe a subject.
      - provides an interface for attaching and detaching Observer objects.
  • Observer
    - defines an updating interface for objects that should be notified of changes
      in a subject.

  • ConcreteSubject
    - stores state of interest to ConcreteObserver objects.
    - sends a notification to its observers when its state changes.

  • ConcreteObserver
    - maintains a reference to a ConcreteSubject object.
    - stores state that should stay consistent with the subject's.
    - implements the Observer updating interface to keep its state consistent
    with the subject's.
 */

function Subject() {
  this.observers = []
  this.state = {}
  this.subscribe = function(observer) {
    this.observers.push(observer)
  }
  this.unsubscribe = function(observer) {
    this.observers = this.observers.filter(o => o !== observer)
  }
  this.setState = function (newState) {
    this.state = newState
    this.observers.map(o => o.react(this.state))
  }
}


const s = new Subject()
const obs = {id: 1, react: (newState) => console.log('State Updated')}
const o = {id: 1, react: (newState) => console.log('This is the new state' + JSON.stringify(newState))}
s.subscribe(obs)
s.subscribe(o)
s.setState({})
