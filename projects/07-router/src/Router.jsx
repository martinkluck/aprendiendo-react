import { EVENTS } from './consts';
import { useEffect, useState } from 'react';
import { match } from 'path-to-regexp';
import { Children } from 'react';
import { getCurrentPath } from './utils';
export default function Router({
  children,
  routes = [],
  defaultComponent: DefaultComponent = () => null,
}) {
  const [currentPath, setCurrentPath] = useState(getCurrentPath());
  useEffect(() => {
    const onNavigation = () => {
      setCurrentPath(getCurrentPath());
    };
    window.addEventListener(EVENTS.PUSHSTATE, onNavigation);
    window.addEventListener(EVENTS.POPSTATE, onNavigation);
    return () => {
      window.removeEventListener(EVENTS.PUSHSTATE, onNavigation);
      window.removeEventListener(EVENTS.POPSTATE, onNavigation);
    };
  }, []);

  let routeParams = {};

  // add routes from children <Route /> components
  const routesFromChildren = Children.map(children, ({ props, type }) => {
    const { name } = type;
    const isRoute = name === 'Route';
    return isRoute ? props : null;
  });

  const routesToUse = routes.concat(routesFromChildren).filter(Boolean);

  const Page = routesToUse.find(({ path }) => {
    if (path === currentPath) return true;

    const matcherUrl = match(path, { decode: decodeURIComponent });
    const matched = matcherUrl(currentPath);
    if (!matched) return false;
    routeParams = matched.params;
    return true;
  })?.component;
  return Page ? (
    <Page routeParams={routeParams} />
  ) : (
    <DefaultComponent routeParams={routeParams} />
  );
}
