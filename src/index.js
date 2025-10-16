import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import theme from './theme';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';

// 👇 Create right-to-left cache for Emotion
const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [(stylis) => stylis.__insert = (rule) => {
    if (rule.includes('left')) rule = rule.replace(/left/g, 'right');
    if (rule.includes('right')) rule = rule.replace(/right/g, 'left');
    document.head.appendChild(document.createElement('style')).innerHTML = rule;
  }],
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <CacheProvider value={cacheRtl}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </CacheProvider>
);
