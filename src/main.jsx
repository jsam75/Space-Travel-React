import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);

/*Notes:

General Architecture-
main.jsx is the entry point to the React app.  This file only contains wrappers for 
items required to "set up shop". 

This file is scaffolded by the build tool and typically includes:

createRoot allows React to take control of a specific DOM element and render the app into it.  

strictMode which enables double rendering and other bug detection strategies, in dev mode only.

imports from App.jsx (root app component) and index.css (for global CSS styles)

For SPA, must add the <BrowserRouter /> which wraps top-level components and gives 
routing context to all descendant components. This allows users to navigate between pages
without full page reloads.

*/
