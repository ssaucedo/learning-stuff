




These methods are called when an instance of a component is being created and inserted into the DOM:

- Mounting:
    - constructor()
    - componentWillMount()
    - render()
    - componentDidMount()
    

An update can be caused by changes to props or state. These methods are called when a component is being re-rendered:

- Updating
    - componentWillReceiveProps()
    - shouldComponentUpdate()
    - componentWillUpdate()
    - render()
    - componentDidUpdate()
    
    
This method is called when a component is being removed from the DOM:

- Unmounting
    - componentWillUnmount()
    
    
  
  
setState:

```
setState(updater[, callback])
```

updater --->  (prevState, props) => stateChange

or you can pass an object:

this.setState({quantity: 2}) --> This performs a shallow merge of stateChange.
 


[React DOM](https://reactjs.org/docs/react-dom.html#render)


- render()
- hydrate()
- unmountComponentAtNode()
- findDOMNode()
- createPortal()

