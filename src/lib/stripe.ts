import Stripe from "stripe";

const secretKey = process.env.SECRET_KEY;
if (!secretKey) {
  throw new Error("Stripe secret key not found");
}

export const stripe = new Stripe(secretKey, {
  apiVersion: "2024-04-10",
  appInfo: {
    name: "Ignite Shop",
  },
});
