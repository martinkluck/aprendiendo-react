import './App.css';
import HomePage from './pages/Home';
import AboutPage from './pages/About';
import Router from './Router';
import Page404 from './pages/404';
import SearchPage from './pages/Search';
import { useEffect } from 'react';

const routes = [
  {
    path: '/',
    component: HomePage,
  },
  {
    path: '/about',
    component: AboutPage,
  },
  {
    path: '/search/:query',
    component: SearchPage,
  }
];

function App() {
  return (
    <main>
      <Router routes={routes} defaultComponent={Page404} />
    </main>
  );
}

export default App;
