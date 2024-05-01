import Link from "next/link";
import { ImageContainer, SuccessContainer } from "../styles/pages/success";
import { GetServerSideProps } from "next";
import { stripe } from "../lib/stripe";
import Image from "next/image";
import Stripe from "stripe";

interface SuccessProps {
  customerName: string;
  productDescription: string;
  productImage: string;
}

export default function Success(props: SuccessProps) {
  return (
    <SuccessContainer>
      <h1>Compra efetuada!</h1>
      <ImageContainer>
        <Image
          src={props.productImage}
          alt={props.productDescription}
          width={200}
          height={200}
        />
      </ImageContainer>

      <p>
        Uhul <strong>{props.customerName}</strong>, sua compra de{" "}
        <strong>{props.productDescription}</strong> foi realizada com sucesso!
      </p>

      <Link href="/">Voltar ao catálogo</Link>
    </SuccessContainer>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (!query.session_id) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const sessionId = String(query.session_id);

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["line_items", "line_items.data.price.product"],
  });

  const customerName = session.customer_details?.name;
  const productDescription = session.line_items?.data[0].description;
  const productImage = // @ts-ignore
    session.line_items?.data[0].price?.product.images[0] as Stripe.File;

  return {
    props: {
      customerName,
      productDescription,
      productImage,
    },
  };
};
