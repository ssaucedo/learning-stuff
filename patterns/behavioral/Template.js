/**
 * Define the skeleton of an algorithm in an operation, deferring some steps to
 * subclasses.Template Method letssubclassesredefine certain steps of an algorithm
 * without changing the algorithm's structure.
 */

/*
 Applicability
 The Template Method pattern should be used
 • to implement the invariant parts of an algorithm once and leave it up to
 subclasses to implement the behavior that can vary.
 • when common behavior among subclasses should be factored and localized
 in a common class to avoid code duplication. This is a good example of
 "refactoring to generalize" as described by Opdyke and Johnson [OJ93].
 You first identify the differences in the existing code and then separate the
 differences into new operations. Finally, you replace the differing code with
 a template method that calls one of these new operations.
 • to control subclasses extensions. You can define a template method that calls
 "hook" operations (see Consequences) at specific points, thereby permitting
 extensions only at those points.
 */


/*
 Participants
 • AbstractClass (Application)
 - defines abstract primitive operations that concrete subclasses define to
 implement steps of an algorithm.
 - implements a template method defining the skeleton of an algorithm. The
 template method calls primitive operations as well as operations defined
 in AbstractClass or those of other objects.
 • ConcreteClass (MyApplication)
 - implements the primitive operations to carry out subclass-specific steps of
 the algorithm.
 */


// My JS implementation.

function Executor () {
  this.execute = function () {
    console.log('Executor start')
    this.complicatedStep()
    console.log('Executor complete')
  }

}

const ex = new Executor()
const concrete = {complicatedStep: () => console.log('Really complidated thing')}

// ex.execute.bind(concrete)()

// From http://www.dofactory.com/javascript/template-method-design-pattern

var datastore = {
  process: function () {
    this.connect()
    this.select()
    this.disconnect()
    return true
  }
}

// log helper

var log = (function () {
  var log = ''
  return {
    add: (msg) => log += msg + '\n',
    show: () =>console.log(log)
  }
})()



var mySql = Object.create(datastore)
mySql.connect = function () {
  log.add('MySQL: connect step')
}

mySql.select = function () {
  log.add('MySQL: select step')
}

mySql.disconnect = function () {
  log.add('MySQL: disconnect step')
}

mySql.process()

log.show()

