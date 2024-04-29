import { AppProps } from "next/app";
import { globalStyles } from "../styles/global";
import { Container, Header, Image } from "../styles/pages/app";

import shopSvg from "../../public/shop.svg";
globalStyles();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Container>
        <Header>
          <Image src={shopSvg.src} alt="logo" />
        </Header>
        <Component {...pageProps} />
      </Container>
    </>
  );
}

export default MyApp;
