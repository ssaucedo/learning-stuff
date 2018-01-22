/**
 * Use the Composite pattern when
 *  • you want to represent part-whole hierarchies ofobjects.
 *  • you want clients to be able to ignore the difference between compositions of
 *      objects and individual objects.Clients will treat all objects in the composite
 *      structure uniformly.
 */

/**
 * Participants
 • Component (Graphic)
 - declares the interface for objects in the composition.
 - implements default behavior for the interface common to all classes, as
 appropriate.
 - declares an interface for accessing and managing its child components.
 - (optional) defines an interface for accessing a component's parent in the
 recursive structure, and implements it if that's appropriate.

 • Leaf (Rectangle, Line, Text, etc.)
 - represents leaf objects in the composition. A leaf has no children.
 - defines behavior for primitive objects in the composition.

 • Composite (Picture)
 - defines behavior for components having children.
 - stores child components.
 - implements child-related operations in the Component interface.
 • Client
 - manipulates objects in the composition through the Component interface.


 The Composite pattern allows the creation of objects with properties that are primitive items
 or a collection of objects. Each item in the collection can hold other collections themselves,
 creating deeply nested structures.

 A tree control is a perfect example of a Composite pattern. The nodes of the tree either
 contain an individual object (leaf node) or a group of objects (a subtree of nodes).

 All nodes in the Composite pattern share a common set of properties and methods which
 supports individual objects as well as object collections. This common interface greatly
 facilitates the design and construction of recursive algorithms that iterate over each object in the Composite collection.
 */


var Node = function (name) {
  this.children = []
  this.name = name
  this.add = function (child) {
    this.children.push(child)
  },

  this.remove = function (child) {
    var length = this.children.length
    for (var i = 0; i < length; i++) {
      if (this.children[i] === child) {
        this.children.splice(i, 1)
        return
      }
    }
  },

  this.getChild = function (i) {
    return this.children[i]
  },

  this.hasChildren = function () {
    return this.children.length > 0
  }
}

// recursively traverse a (sub)tree

function traverse (indent, node) {
  log.add(Array(indent++).join('--') + node.name)

  for (var i = 0, len = node.children.length; i < len; i++) {
    traverse(indent, node.getChild(i))
  }
}



var log = (function () {
  var log = ''

  return {
    add: function (msg) { log += msg + '\n' },
    show: function () {
      console.log(log)
      log = ''
    }
  }
})()

function run () {
  var tree = new Node('root')
  var left = new Node('left')
  var right = new Node('right')
  var leftleft = new Node('leftleft')
  var leftright = new Node('leftright')
  var rightleft = new Node('rightleft')
  var rightright = new Node('rightright')

  tree.add(left)
  tree.add(right)

  left.add(leftleft)
  left.add(leftright)

  right.add(rightleft)
  right.add(rightright)

  traverse(1, tree)

  log.show()
}
run()