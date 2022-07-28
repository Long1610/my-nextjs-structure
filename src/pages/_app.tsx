import { useEffect } from "react";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "app/store";
import Layout from "layouts";
import { useRouter } from "next/router";
import "styles/global.scss";
import TokenService from "services/token.service";

function MyApp({ Component, pageProps }: AppProps) {
  const isLogin = TokenService.getUser();
  const router = useRouter();

  useEffect(() => {
    if (pageProps.protected && !isLogin) {
      router.push("/signin");
    }
  }, [pageProps.protected, isLogin, router]);

  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
