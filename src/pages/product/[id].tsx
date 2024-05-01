import {
  ImageContainer,
  Loader,
  ProductContainer,
  ProductDetails,
} from "../../styles/pages/product";
import { GetStaticPaths, GetStaticProps } from "next";
import { stripe } from "../../lib/stripe";
import Stripe from "stripe";
import Image from "next/image";
import { useRouter } from "next/router";

interface ProductProps {
  product: {
    id: string;
    name: string;
    imageUrl: string;
    price: string;
    description: string;
  };
}

export default function Product({ product }: ProductProps) {
  const { isFallback } = useRouter();

  if (isFallback) {
    return (
      <ProductContainer>
        <Loader />
      </ProductContainer>
    );
  }

  return (
    <ProductContainer>
      <ImageContainer>
        <Image src={product.imageUrl} width={420} height={656} alt="" />
      </ImageContainer>

      <ProductDetails>
        <h1>{product.name}</h1>
        <span>{product.price}</span>
        <p>{product.description}</p>
      </ProductDetails>
    </ProductContainer>
  );
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({
  params,
}) => {
  const productId = params?.id as string;

  const productDetails = await stripe.products.retrieve(productId, {
    expand: ["default_price"],
  });

  const price = productDetails.default_price as Stripe.Price;

  const priceMask = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price);
  };

  if (!price.unit_amount) {
    return {
      props: {
        product: {
          id: productDetails.id,
          name: productDetails.name,
          imageUrl: productDetails.images[0],
          price: "Serviço indisponível",
          description: productDetails.description,
        },
      },
      revalidate: 60 * 60 * 1, // 1 hour
    };
  }

  return {
    props: {
      product: {
        id: productDetails.id,
        name: productDetails.name,
        imageUrl: productDetails.images[0],
        price: priceMask(price.unit_amount / 100),
        description: productDetails.description,
      },
    },
    revalidate: 60 * 60 * 1, // 1 hours
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const products = await stripe.products.list();
  const paths = products.data.map((product) => ({
    params: { id: product.id },
  }));

  return { paths, fallback: true };
};
