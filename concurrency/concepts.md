
### Books

[Thinking In Java](https://sophia.javeriana.edu.co/~cbustaca/docencia/POO-2016-01/documentos/Thinking_in_Java_4th_edition.pdf)

[Concurrent Programming in Java](https://pdfs.semanticscholar.org/2565/03a8676b78ecf8745fa88940eb92416b9fa7.pdf)

[Java Concurrency In Practice](http://www.periodicooficial.oaxaca.gob.mx/files/2011/05/EXT02-2011-05-19.pdf)

[Java performance](http://1.droppdf.com/files/iTkkV/oreilly-java-performance-the-definitive-guide-2014.pdf)


### Basics

### Thread states:

Thread states
A thread can be in any one of four states:

1. *New:* A thread remains in this state only momentarily, as it is being created. It allocates
any necessary system resources and performs initialization. At this point it becomes
eligible to receive CPU time. The scheduler will then transition this thread to the
runnable or blocked state.

2. *Runnable:* This means that a thread can be run when the time-slicing mechanism has
CPU cycles available for the thread. Thus, the thread might or might not be running at
any moment, but there’s nothing to prevent it from being run if the scheduler can arrange
it. That is, it’s not dead or blocked.

3. *Blocked:* The thread can be run, but something prevents it. While a thread is in the
blocked state, the scheduler will simply skip it and not give it any CPU time. Until a
thread reenters the runnable state, it won’t perform any operations.

4. *Dead:* A thread in the dead or terminated state is no longer schedulable and will not
receive any CPU time. Its task is completed, and it is no longer runnable. One way for a
task to die is by returning from its run( ) method, but a task’s thread can also be
interrupted, as you’ll see shortly. 


Runnable -> void 

Callable -> Future


#### Resolving shared resource contention
 
 For concurrency to work you need some way to prevent two tasks from accessing the same resource, at least during
 critical periods. Preventing this kind of collision is simply a matter of putting a
 lock on a resource when one task is using it.
 The first task that accesses a resource must lock it, and then the other tasks
 cannot access that resource until it is unlocked
 To solve the problem of thread collision, virtually all concurrency schemes serialize access to
 shared resources. This means that only one task at a time is allowed to access the shared
 resource. This is ordinarily accomplished by putting a clause around a piece of code that only
 allows one task at a time to pass through that piece of code. Because this clause produces
 mutual exclusion, a common name for such a mechanism is mutex. 
 
 To prevent collisions over resources, Java has built-in support in the form of the
 **synchronized** keyword. When a task wishes to execute a piece of code guarded by the
 synchronized keyword, it checks to see if the lock is available, then acquires it, executes the
 code, and releases it. 

##### Synchronized methods:
 
 All objects automatically contain a single lock (also referred to as a monitor). When you call
 any synchronized method, that object is locked and no other synchronized method of
 that object can be called until the first one finishes and releases the lock. 
 
 Note that it’s especially important to make fields private when working with concurrency;
 otherwise the synchronized keyword cannot prevent another task from accessing a field
 directly, and thus producing collisions. 

##### Synchronized Statements

```
synchronized(syncObject) {
 // This code can be accessed by only one task at a time
} 
```

#### Atomicity and volatility 

*An atomic operation is one that cannot be
interrupted by the thread scheduler; if the operation begins, then it will run to completion
before the possibility of a context switch.*
 
*Atomic operations are thus not interruptible by the threading mechanism. Expert
programmers can take advantage of this to write lock-free code, which does not need to be
synchronized*

*On multiprocessor systems (which are now appearing in the form of multicore processors—
multiple CPUs on a single chip), visibility rather than atomicity is much more of an issue
than on single-processor systems. Changes made by one task, even if they’re atomic in the
sense of not being interruptible, might not be visible to other tasks (the changes might be
temporarily stored in a local processor cache, for example), so different tasks will have a
different view of the application’s state. The synchronization mechanism, on the other hand,
forces changes by one task on a multiprocessor system to be visible across the application.
Without synchronization, it’s indeterminate when changes become visible.
The volatile keyword also ensures visibility across the application. If you declare a field to be
volatile, this means that as soon as a write occurs for that field, all reads will see the change.
This is true even if local caches are involved—volatile fields are immediately written through
to main memory, and reads occur from main memory.* 
 

*The lock must be acquired on syncObject. If some other task already has this lock, then the critical section cannot be
entered until the lock is released.*

#### Thread local storage:


*A way to prevent tasks from colliding over shared resources is to eliminate the
sharing of variables. Thread local storage is a mechanism that automatically creates
different storage for the same variable, for each different thread that uses an object. Thus, if
you have five threads using an object with a variable x, thread local storage generates five
different pieces of storage for x. Basically, they allow you to associate state with a thread.*

#### Wait() and NotifyAll()
 
*So wait( ) suspends the task while waiting for the world
  to change, and only when a notify( ) or notifyAll( ) occurs—suggesting that something of
  interest may have happened—does the task wake up and check for changes. Thus, wait( )
  provides a way to synchronize activities between tasks.*
  
#### Joining a thread
*One thread may call join( ) on another thread to wait for the second thread to complete
before proceeding*


#### Lock and Condition

[Conditions docs](https://docs.oracle.com/javase/8/docs/api/java/util/concurrent/locks/Condition.html)

Condition factors out the Object monitor methods (wait, notify and notifyAll)
into distinct objects to give the effect of having multiple wait-sets per object,
by combining them with the use of arbitrary Lock implementations.
**Where a Lock replaces the use of synchronized methods and statements, a Condition replaces the use of the Object monitor methods.**

```

#await -> Causes the current thread to wait until it is signalled or interrupted.

#signal -> Wakes up one waiting thread. If any threads are waiting on this condition then one is selected for waking up. That thread must then re-acquire the lock before returning from await.

#signalAll -> Wakes up all waiting threads. If any threads are waiting on this condition then they are all woken up. Each thread must re-acquire the lock before it can return from await.              

```


#### Producer-consumers and queues

[Concurrency patterns](https://en.wikipedia.org/wiki/Concurrency_pattern)

*The wait( ) and notifyAll( ) methods solve the problem of task cooperation in a rather low
level fashion, handshaking every interaction.
In many cases, you can move up a level of abstraction and solve task cooperation problems
using a **synchronized queue**, which only allows one task at a time to insert or remove an element.
This is provided for you in the java.util.concurrent.BlockingQueue interface, which has a number of standard
implementations. You’ll usually use the LinkedBlockingQueue, which is an unbounded
queue; the ArrayBlockingQueue has a fixed size, so you can only put so many elements in
it before it blocks.
These queues also suspend a consumer task if that task tries to get an object from the queue
and the queue is empty, and resume when more elements become available. Blocking queues
can solve a remarkable number of problems in a much simpler and more reliable fashion
than wait( ) and notifyAll( ).*

- BlockingQueue
      - take
      - put

- PipeWriter
- PipeReader

      - write
      - read  // Blocks until characters are there.

- Semaphore
    A normal lock (from concurrent.locks or the built-in synchronized lock) only allows one
    task at a time to access a resource.
    A counting semaphore allows n tasks to access the resource at the same time.
    You can also think of a semaphore as handing out "permits" to use a resource, although no actual permit objects are used.


Java has an awesome api for Semaphores:
     constructor: new Semaphore(size, true);
     semaphore.acquire(); // Acquires a permit from this semaphore, blocking until one is available, or the thread is interrupted.
     semaphore.release(); // Releases a permit, returning it to the semaphore.
     availablePermits(); // return the number of permits.
     tryAcquire; // if possible acquires a permit and return true else it returns false an continues execution.

- Exchanger

An Exchanger is a barrier that swaps objects between two tasks. When the tasks enter the
barrier, they have one object, and when they leave, they have the object that was formerly
held by the other task. Exchangers are typically used when one task is creating objects that
are expensive to produce and another task is consuming those objects; this way, more objects
can be created at the same time as they are being consumed. 

When you call the Exchanger.exchange( ) method, it blocks until the partner task calls its exchange()
method, and when both exchange( ) methods have completed, the List<T> has been swapped.
 
 
The ExchangerProducer fills a List, then swaps the full list for the empty one that the ExchangerConsumer hands it.
Because of the Exchanger, the filling of one list and consuming of the other list can happen simultaneously.
 
 
 Notes:
 
check CountDownLatch and Phaser patterns (barriers)

[SyncQueue vs Exchanger](https://stackoverflow.com/questions/9735709/synchronousqueue-vs-exchanger)

[Exchanger and GC](http://vanillajava.blogspot.com.ar/2011/09/exchange-and-gc-less-java.html?z=)













