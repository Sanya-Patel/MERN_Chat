// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import { ChakraProvider } from '@chakra-ui/react';
// import { BrowserRouter } from 'react-router-dom';
// import ChatProvider from './Context/ChatProvider';

// ReactDOM.render(
//   <BrowserRouter>
//     <ChatProvider>
//       <ChakraProvider>
//         <App />
//       </ChakraProvider>
//     </ChatProvider>
//   </BrowserRouter>,
//   document.getElementById('root')
// );



import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';
import ChatProvider from './Context/ChatProvider';

const root = document.getElementById('root');

// Replace ReactDOM.render with createRoot
const rootElement = (
  <BrowserRouter>

  <ChatProvider>
    
      <ChakraProvider>
        <App />
      </ChakraProvider>
  
  </ChatProvider>
  </BrowserRouter>

);

ReactDOM.createRoot(root).render(rootElement);
