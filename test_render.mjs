import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './app/src/App.jsx';

try {
  const html = renderToString(React.createElement(App, null));
  console.log("Render successful!");
} catch (e) {
  console.error("Render failed:");
  console.error(e);
}
