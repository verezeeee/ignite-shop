import { AppProps } from "next/app";
import { globalStyles } from "../styles/global";
import { Container, Header, HeaderContainer, Image } from "../styles/pages/app";

import shopSvg from "../../public/shop.svg";
import Link from "next/link";
globalStyles();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Container>
        <Header>
          <Link href="/" passHref>
            <HeaderContainer>
              <Image src={shopSvg.src} alt="Shop" />
              <h1>Ignite Shop</h1>
            </HeaderContainer>
          </Link>
        </Header>
        <Component {...pageProps} />
      </Container>
    </>
  );
}

export default MyApp;
