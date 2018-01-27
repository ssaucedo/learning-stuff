

General:

[ACID Properties in DBMS](https://www.geeksforgeeks.org/acid-properties-in-dbms/)

A transaction is a single logical unit of work which accesses and possibly modifies the contents of a database.
Transactions access data using read and write operations.
In order to maintain consistency in a database, before and after transaction, certain properties are followed.
These are called ACID properties.

Atomicity: Transactions do not occur partially
It involves following two operations.
    —Abort: If a transaction aborts, changes made to database are not visible.
    —Commit: If a transaction commits, changes made are visible.
    
Consistency: This means that integrity constraints must be maintained so that the database
             is consistent before and after the transaction. It refers to correctness of a database.    

Isolation: This property ensures that multiple transactions can occur concurrently without leading to inconsistency of database state.
            Transactions occur independently without interference.
            Changes occurring in a particular transaction will not be visible to any other transaction until
            that particular change in that transaction is written to memory or has been committed.
            This property ensures that the execution of transactions concurrently will result in a state
            that is equivalent to a state achieved these were executed serially in some order.
            
Durability: This property ensures that once the transaction has completed execution,
            the updates and modifications to the database are stored in and written
            to disk and they persist even is system failure occurs.
            These updates now become permanent and are stored in a non-volatile memory.
            The effects of the transaction, thus, are never lost.


            
            







http://db.cs.berkeley.edu/papers/fntdb07-architecture.pdf

Database Management Systems (DBMSs)


Relational database management systems (RDBMSs).


Main components of a DBMS:

    Client communication manager.
        Local client protocols.
        Remote client protocols.    
    
    Relational query processor.
        Query parsing and authorization.
        Query rewrite
        Query optimizer.
        Plan executor.
        
    Transactional Storage Manager:
        Access methods.
        Lock manager.
        Buffer manager.
        Log manager.
    
    Process manager:
        Admission control.
        Dispatch and scheduling.
        
    Shared components and utilities:
        Catalog manager.
        Memory manager.
        Adminitration utilities.
        Replication and loading services.
        Batch utilities.
        
       
       
     

The life of a query:




1) The the “client”) calls an API that in turn communicates over a network to establish
a connection with the Client Communications Manager of a DBMS.

- “two-tier” or “client-server”
    In some cases, this connection is established between the client and the database server
    directly, e.g., via the ODBC or JDBC connectivity protocol.


- “three-tier”
    In other cases, the client may communicate with a “middle-tier server”
    (a web server, transaction processing monitor, or the like),
    which in turn uses a protocol to proxy the communication between the client and the DBMS.
    
*Client communications manager in all these protocols is roughly the
same: to establish and remember the connection state for
the caller (be it a client or a middleware server), to respond
to SQL commands from the caller, and to return both data
and control messages (result codes, errors, etc.) as appropriate.*


2) Upon receiving the client’s first SQL command, the DBMS
   must assign a “thread of computation” to the command.
   It must also make sure that the thread’s data and control outputs
   are connected via the communications manager to the
   client. These tasks are the job of the DBMS Process Manager
   
   The most important decision that the DBMS needs to make at this stage in the query
   regards admission control:
    - Should begin processing the query immediately, 
    - Defer execution until a time when enough system resources are available 


3) Once admitted and allocated as a thread of control, the gate
   agent’s query can begin to execute. It does so by invoking the
   code in the Relational Query Processor.

   This set of modules:
        - check that the user is authorized to run the query,
        - compiles the user’s SQL query text into an internal query plan.
        - handled the query plan to the plan executor
        
   The plan executor consists of a suite of “operators” for executing any query.
   Typical operators implement relational query processing tasks including joins, selection,
   projection, aggregation, sorting and so on, as well as calls to request
   data records from lower layers of the system.

4) At the base of the gate agent’s query plan, one or more
   operators exist to request data from the database.

    These operators make calls to fetch data from the
    DBMS’ Transactional Storage Manager, which manages
    all data access (read) and manipulation (create, update,
    delete) calls.
    
    The storage system includes algorithms and
    data structures for organizing and accessing data on disk
    (“access methods”), including basic structures like tables
    and indexes.
    It also includes a buffer management module
    that decides when and what data to transfer between
    disk and memory buffers.
    In the course of accessing data in the access methods,
    the gate agent’s query must invoke the transaction management code
    to ensure the well-known “ACID” properties of transactions.
 
    Before accessing data, locks are acquired from a lock manager to ensure
    correct execution in the face of other concurrent queries. If
    the gate agent’s query involved updates to the database,
    it would interact with the log manager to ensure that the transaction
    was durable if committed, and fully undone if aborted.

5)  At this point in the example query’s life, it has begun to
    access data records, and is ready to use them to compute
    results for the client.
    This is done by “unwinding the stack” of activities we described up to this point.
    
    The access methods return control to the query executor’s operators,
    which orchestrate the computation of result tuples from database data;
    As result tuples are generated, they are placed in a buffer for the client communications manager,
    which ships the results back to the caller.
    
    For large result sets, the client typically will make additional calls to fetch more data
    incrementally from the query, resulting in multiple iterations through the communications manager,
    query executor, and storage manager.
    In our simple example, at the end of the query the transaction is completed and the connection
    closed; this results in the transaction manager cleaning up state for the transaction.
    The process manager freeing any control structures for the query, and the communications
    manager cleaning up communication state for the connection.
    
    


































