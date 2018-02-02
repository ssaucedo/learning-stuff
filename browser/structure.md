

High level structure:





- **The user interface**:
    this includes the address bar,back/forward button, bookmarking menu, etc.
    Every part of the browser display except the window where you see the requested page.
- **The browser engine**: marshals actions between the UI and the rendering engine.
- **The rendering engine**: responsible for displaying requested content. For example if the requested content is HTML, the rendering engine parses HTML and CSS, and displays the parsed content on the screen.
- **Networking**: for network calls such as HTTP requests, using different implementations for different platform behind a platform-independent interface.
- **UI backend**: used for drawing basic widgets like combo boxes and windows. This backend exposes a generic interface that is not platform specific. Underneath it uses operating system user interface methods.
- **JavaScript interpreter**: Used to parse and execute JavaScript code.
- **Data storage**: This is a persistence layer. The browser may need to save all sorts of data locally, such as cookies. Browsers also support storage mechanisms such as localStorage, IndexedDB, WebSQL and FileSystem.




### Rendering engines:

- IE  -> Trident
- Firefox -> Gecko,
- Safari -> WebKit.
- Chrome/ Opera  ->  Blink (fork of WebKit)

#### Flow

- PARSING HTML TO CONSTRUCT DOM TREE
- RENDER TREE CONSTRUCTION
- LAYOUT OF THE RENDER TREE
- PAINTING THE RENDER TREE





The rendering engine will start parsing the HTML document and convert elements to DOM
nodes in a tree called the **content tree**.

The engine will parse the style data, both in external CSS files and in style elements.
Styling information together with visual instructions in the HTML will be used to
create another tree: **the render tree**.

The **render tree** contains rectangles with visual attributes like
color and dimensions.
The rectangles are in the right order to be displayed on the screen.

After the construction of the **render tree** it goes through a ***layout*** process.
This means giving each node the exact coordinates where it should appear on the screen.

The next stage is painting–the render tree will be traversed and each node will
be painted using the UI backend layer.


```
For better user experience, the rendering engine will try to display contents
on the screen as soon as possible.
It will not wait until all HTML is parsed before starting to build and layout the render tree.
Parts of the content will be parsed and displayed, while the process continues
with the rest of the contents that keeps coming from the network.
```