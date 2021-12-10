import { Page } from "@/modules/common/page";
import {
  ChakraProvider,
  extendTheme,
  Progress,
  withDefaultColorScheme
} from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

type Props = AppProps & {
  Component: Page;
};

const theme = extendTheme(
  withDefaultColorScheme({ colorScheme: "teal", components: ["Button"] })
);

const App: React.FC<Props> = ({ Component, pageProps }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const getLayout = Component.getLayout ?? ((page) => page);

  useEffect(() => {
    const handleStart = () => setIsLoading(true);
    const handleStop = () => setIsLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleStop);
    router.events.on("routeChangeError", handleStop);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleStop);
      router.events.off("routeChangeError", handleStop);
    };
  }, [router]);

  return (
    <>
      <Head>
        <title>Did I poop</title>
      </Head>
      <ChakraProvider resetCSS theme={theme}>
        {isLoading && (
          <Progress
            size="xs"
            isIndeterminate
            position="fixed"
            zIndex={999}
            width="full"
          />
        )}
        <SessionProvider session={pageProps.session}>
          {getLayout(<Component {...pageProps} />)}
        </SessionProvider>
      </ChakraProvider>
    </>
  );
};

export default App;
