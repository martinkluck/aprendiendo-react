import './App.css';
import { lazy } from 'react';
import Router from './Router';
import Route from './Route';
import { Suspense } from 'react';
// import AboutPage from './pages/About'; // import estático
const AboutPage = lazy(() => import('./pages/About')); // import dinámico
const HomePage = lazy(() => import('./pages/Home'));
const Page404 = lazy(() => import('./pages/404'));
const SearchPage = lazy(() => import('./pages/Search'));

const routes = [
  {
    path: '/search/:query',
    component: SearchPage,
  },
];

function App() {
  return (
    <main>
      <Suspense fallback={null}>
        <Router
          routes={routes}
          defaultComponent={Page404}
        >
          <Route
            path='/'
            component={HomePage}
          />
          <Route
            path='/about'
            component={AboutPage}
          />
        </Router>
      </Suspense>
    </main>
  );
}

export default App;
