import Image from "next/image";
import { HomeContainer, Product } from "../styles/pages/home";
import Head from "next/head";
import Link from "next/link";

import { useKeenSlider } from "keen-slider/react";
import { stripe } from "../lib/stripe";
import { GetStaticProps } from "next";
import Stripe from "stripe";

interface HomeProps {
  products: {
    id: string;
    name: string;
    imageUrl: string;
    price: string;
  }[];
}

export default function Home({ products }: HomeProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    },
  });

  return (
    <>
      <Head>
        <title>Home | Ignite Shop</title>
      </Head>
      <HomeContainer ref={sliderRef} className="keen-slider">
        {products.map((product) => {
          return (
            <Link
              prefetch={false}
              key={product.id}
              href={`/product/${product.id}`}
            >
              <Product className="keen-slider__slide">
                <Image
                  placeholder="blur"
                  blurDataURL="data:image/gif;base64,..."
                  src={product.imageUrl}
                  width={380}
                  height={400}
                  alt=""
                />
                <footer>
                  <strong>{product.name}</strong>
                  <span>{product.price}</span>
                </footer>
              </Product>
            </Link>
          );
        })}
      </HomeContainer>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ["data.default_price"],
  });

  const products = response.data.map((product) => {
    const price = product.default_price as Stripe.Price;

    const priceMask = (price: number) => {
      return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(price);
    };

    if (!price.unit_amount) {
      return {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: "Serviço indisponível",
      };
    }

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: priceMask(price.unit_amount / 100),
    };
  });

  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 2, // 2 hours
  };
};
