/**
 Encapsulate a request as an object, thereby letting you parameterize clients with
 different requests, queue or log requests, and support undoable operations

 Participants
 • Command
    - declares an interface for executing an operation.
 • ConcreteCommand
    - defines a binding between a Receiver object and an action.
    - implements Execute by invoking the corresponding operation(s) on Receiver.
 • Client
    - creates a ConcreteCommand object and sets its receiver.
 • Invoker
    - asks the command to carry out the request.
 • Receiver
    - knows how to perform the operations associated with carrying out a request.


 Consequences
  The Command pattern has the following consequences:
    1. Command decouples the object that invokesthe operation from the one that
       knows how to perform it.
    2. Commands are first-class objects. They can be manipulated and extended
       like any other object.
    3. You can assemble commands into a composite command. An example is the
       MacroCommand class described earlier. In general, composite commands
      are an instance of the Composite (163) pattern.
    4. It's easy to add new Commands, because you don't have to change existing
       classes
 */


// Invoker:
function MenuItem(command) {
  this.select = function() {
    command.execute()
  }
}


function Menu(...menuItems) {
  this.menuItems = menuItems
}


function CutCommand() {
  this.execute = function() {
    canva.operations.push('CUT')  // Command subclasses store the receiver of the request and invoke one or more operations on the receiver
  }
}

function PasteCommand(canva) {
  this.execute = function() {
    canva.operations.push('PASTE')
  }
}


var canva =   {operations: []}  // Receiver
const menu = new Menu(new MenuItem(new CutCommand(canva)), new MenuItem(new PasteCommand(canva))) //

menu.menuItems[0].select()
menu.menuItems[0].select()
menu.menuItems[1].select()
console.log(canva)

