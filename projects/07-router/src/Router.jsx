import { EVENTS } from './consts';
import { useEffect, useState } from 'react';
import { match } from 'path-to-regexp';
export default function Router({
  routes = [],
  defaultComponent: DefaultComponent = () => null,
}) {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  useEffect(() => {
    const onNavigation = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener(EVENTS.PUSHSTATE, onNavigation);
    window.addEventListener(EVENTS.POPSTATE, onNavigation);
    return () => {
      window.removeEventListener(EVENTS.PUSHSTATE, onNavigation);
      window.removeEventListener(EVENTS.POPSTATE, onNavigation);
    };
  }, []);

  let routeParams = {};

  const Page = routes.find(({ path }) => {
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
