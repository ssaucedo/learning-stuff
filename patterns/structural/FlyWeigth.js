/**
 The Flyweight (195) pattern defines a structure for sharing objects.
 Objects are shared for at least two reasons: efficiency and consistency.
 Flyweight focuses on sharing for space efficiency. Applications that use lots of objects must pay careful attention to
 the cost of each object.
 Substantial savings can be had by sharing objects instead of replicating them.
 But objects can be shared only if they don't define context-dependent state.
 Flyweight objects have no such state. Any additional information they need to
 perform their task is passed to them when needed. With no context-dependent state,
 Flyweight objects may be shared freely.
 */
