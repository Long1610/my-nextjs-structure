import { useEffect, useState } from "react";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "app/store";
import Layout from "layouts";
import { useRouter } from "next/router";
import "styles/global.scss";
import TokenService from "services/token.service";
import { UserProvider } from "providers/userContext";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  console.log("router.asPath", router.asPath);

  useEffect(() => {
    // on initial load - run auth check
    authCheck(router.asPath);

    // on route change start - hide page content by setting authorized to false
    const hideContent = () => setAuthorized(false);
    router.events.on("routeChangeStart", hideContent);

    // on route change complete - run auth check
    router.events.on("routeChangeComplete", authCheck);

    // unsubscribe from events in useEffect return function
    return () => {
      router.events.off("routeChangeStart", hideContent);
      router.events.off("routeChangeComplete", authCheck);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function authCheck(url: any) {
    // redirect to login page if accessing a private page and not logged in
    const publicPaths = ["/signin", "/signup", "/"];
    const path = url.split("?")[0];
    if (!TokenService.getUser() && !publicPaths.includes(path)) {
      console.log("vao day");
      setAuthorized(false);
      router.push({
        pathname: "/signin",
        query: { returnUrl: router.asPath },
      });
    } else {
      setAuthorized(true);
    }
  }

  return (
    <Provider store={store}>
      <UserProvider>
        <Layout>{authorized && <Component {...pageProps} />}</Layout>
      </UserProvider>
    </Provider>
  );
}

export default MyApp;
