/**
 * Given a language, define a represention for its grammar along with an interpreter
 * that uses the representation to interpret sentences in the language.
 */

/**
Participants
  • AbstractExpression (RegularExpression)
    - declares an abstractInterpret operation that is common to all nodes in the
      abstract syntax tree.

  • TerminalExpression (LiteralExpression)
    - implements an Interpret operation associated with terminal symbols in the
      grammar.
    - an instance is required for every terminal symbol in a sentence.

  • Non terminal Expression (AlternationExpression, RepetitionExpression, SequenceExpressions)
   - implements an Interpret operation for non terminal symbols in the grammar.
     Interpret typically calls itself recursively on the variables representing RI through Jin.
   - one such class is required for every rule R ::= R\R^ ••.Rn in the grammar.
   - maintains instance variables of type AbstractExpression for each of the
     symbols RI through Rn.

  • Context
    - contains information that's global to the interpreter.

 • Client
    - builds (or is given) an abstract syntax tree representing a particular sentence
      in the language that the grammar defines.
      The abstract syntax tree is assembled from instances of the NonterminalExpression and TerminalExpression classes.

    - invokes the Interpret operation.


 Consequences
 The Interpreter pattern has the following benefits and liabilities:
   1. It's easy to change and extend the grammar. Because the pattern uses classes
    to represent grammar rules, you can use inheritance to change or extend
    the grammar. Existing expressions can be modified incrementally, and new
    expressions can be defined as variations on old ones.
   2. Implementing the grammar is easy, too.Classes defining nodes in the abstract
    syntax tree have similar implementations.These classes are easy to write, and
    often their generation can be automated with a compiler or parser generator.
   3. Complex grammars are hard to maintain. The Interpreter pattern defines at least
    one class for every rule in the grammar (grammar rules defined using BNF
    may require multiple classes). Hence grammars containing many rules can
    be hard to manage and maintain. Other design patterns can be applied to
    mitigate the problem (see Implementation). But when the grammar is very
    complex, other techniques such as parser or compiler generators are more
    appropriate.
  4. Adding new ways to interpret expressions. The Interpreter pattern makes it
    easier to evaluate an expression in a new way.For example, you can support
    pretty printing or type-checking an expression by defining a new operation
    on the expression classes. If you keep creating new ways of interpreting an
    expression, then consider using the Visitor (331) pattern to avoid changing
    the grammar classes
*/




// Copied implementation
var Context = function (input) {
  this.input = input;
  this.output = 0;

  this.startsWith = function (str) {
    return this.input.substr(0, str.length) === str;
  }
}

var Expression = function (name, one, four, five, nine, multiplier) {
  this.name = name;
  this.one = one;
  this.four = four;
  this.five = five;
  this.nine = nine;
  this.multiplier = multiplier;

  this.interpret = function (context) {
    if (context.input.length == 0) {
      return;
    }
    else if (context.startsWith(this.nine)) {
      context.output += (9 * this.multiplier);
      context.input = context.input.substr(2);
    }
    else if (context.startsWith(this.four)) {
      context.output += (4 * this.multiplier);
      context.input = context.input.substr(2);
    }
    else if (context.startsWith(this.five)) {
      context.output += (5 * this.multiplier);
      context.input = context.input.substr(1);
    }
    while (context.startsWith(this.one)) {
      context.output += (1 * this.multiplier);
      context.input = context.input.substr(1);
    }
  }
}



function run() {
  var roman = "MCMXXVIII"
  var context = new Context(roman); // global inplementation
  var tree = []; // AST assembled from instances of Terminal and NonTerminalExpressions.
  // here I can build an AST as an array because the ordering matters on Roman numbers
  // the order of the expressions matters.

  tree.push(new Expression("thousand", "M", " " , " ", " " , 1000));
  tree.push(new Expression("hundred",  "C", "CD", "D", "CM", 100));
  tree.push(new Expression("ten",      "X", "XL", "L", "XC", 10));
  tree.push(new Expression("one",      "I", "IV", "V", "IX", 1));

  for (var i = 0, len = tree.length; i < len; i++) {
    tree[i].interpret(context);
  }
  console.log(roman + " = " + context.output);
}
run()