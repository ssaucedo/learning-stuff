


Polymorphism

It provides another dimension of separation of interface from implementation, to decouple
what from how. Polymorphism allows improved code organization and readability as well as
the creation of extensible programs that can be “grown” not only during the original creation
of the project, but also when new features are desired.

Encapsulation creates new data types by combining characteristics and behaviors.
Implementation hiding separates the interface from the implementation by making the
details private. This sort of mechanical organization makes ready sense to someone with a
procedural programming background. But polymorphism deals with decoupling in terms of
types. In the last chapter, you saw how inheritance allows the treatment of an object as its
own type or its base type. This ability is critical because it allows many types (derived from
the same base type) to be treated as if they were one type, and a single piece of code to work
on all those different types equally. The polymorphic method call allows one type to express
its distinction from another, similar type, as long as they’re both derived from the same base
type. This distinction is expressed through differences in behavior of the methods that you
can call through the base class. 


Polymorphism means “different forms.” In object-oriented programming, you have the same
interface from the base class, and different forms using that interface: the different versions
of the dynamically bound methods. 

early binding,
late binding,

All method binding in Java happens polymorphically via late binding,

 
 
```
Because of polymorphism, you can add
as many new types as you want to the system without changing the tune( ) method. In a
well-designed OOP program, most or all of your methods will follow the model of tune( )
and communicate only with the base-class interface.

Such a program is extensible because
you can add new functionality by inheriting new data types from the common base class. The
methods that manipulate the base-class interface will not need to be changed at all to
accommodate the new classes.
 ```
 
 
 
 
 
 
 
 
 
 ### SOLID

- S	SRP	
    Single responsibility principle
    la noción de que un objeto solo debería tener una única responsabilidad.

- O	OCP	
    Open/closed principle
    la noción de que las “entidades de software … deben estar abiertas para su extensión, pero cerradas para su modificación”.

- L	LSP	
    Liskov substitution principle
    la noción de que los “objetos de un programa deberían ser reemplazables por instancias de sus subtipos sin alterar el correcto funcionamiento del programa”. Ver también diseño por contrato.

- I	ISP	
    Interface segregation principle
    la noción de que “muchas interfaces cliente específicas son mejores que una interfaz de propósito general”.5​

- D	DIP	
    Dependency inversion principle
    la noción de que se debe “depender de abstracciones, no depender de implementaciones”.5​
    La Inyección de Dependencias es uno de los métodos que siguen este principio.