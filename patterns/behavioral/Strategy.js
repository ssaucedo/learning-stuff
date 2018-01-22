/**
Applicability
  Use the Strategy pattern when
    • many related classes differ only in their behavior. Strategies provide a way
      to configure a class with one of many behaviors.

    • you need different variants of an algorithm. For example, you might define
      algorithms reflecting different space/time trade-offs. Strategies can be
    used when these variants are implemented as a class hierarchy of algorithms [HO87].

    • an algorithm uses data that clients shouldn't know about. Use the Strategy
      pattern to avoid exposing complex, algorithm-specific data structures.

    • a class defines many behaviors, and these appear as multiple conditional
      statements in its operations. Instead of many conditionals, move related
    conditional branches into their own Strategy class.
 */


/**
 * Participants
    • Strategy (Compositor)
      - declares an interface common to all supported algorithms. Context uses
        this interface to call the algorithm defined by a ConcreteStrategy.

    • ConcreteStrategy (SimpleCompositor, TeXCompositor, ArrayCompositor)
      - implements the algorithm using the Strategy interface.

    • Context (Composition)
      - is configured with a ConcreteStrategy object.
      - maintains a reference to a Strategy object.
      - may define an interface that lets Strategy access its data.
 */


// common strategy API
function Strategy() {
  this.calculate = function() {

  }
}

function bubbleSortStrategy() {
  this.calculate = function(array) {
    console.log('bubbling')
    return [1,2]
  }
}

function mergeSortStrategy() {
  this.calculate = function(array) {
    console.log('splitting and merging')
    return [1,2]
  }
}

function context(array, strategy) {
  this.sort = function() {
    return strategy.calculate(array)
  }
}

new context([2,1], new mergeSortStrategy()).sort()






