import { styled } from "../../../stitches.config";
import { keyframes } from "@stitches/react";

export const ProductContainer = styled("main", {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  alignItems: "stretch",
  gap: "4rem",

  maxWidth: 1180,
  margin: "0 auto",
});

export const ImageContainer = styled("div", {
  width: "100%",
  minWidth: 520,
  maxWidth: 576,
  height: 656,
  background: "linear-gradient(180deg, #1ea483 0%, #7465d4 100%)",
  borderRadius: 8,
  padding: "0,25rem",

  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  img: {
    objectFit: "contain",
  },
});

export const ProductDetails = styled("div", {
  display: "flex",
  flexDirection: "column",

  h1: {
    fontSize: "$2xl",
    color: "$gray300",
  },

  span: {
    marginTop: "1rem",
    display: "block",
    fontSize: "$2xl",
    color: "$green300",
  },

  p: {
    marginTop: "1rem",
    fontSize: "$md",
    color: "$gray300",
    lineHeight: 1.6,
  },

  button: {
    marginTop: "auto",
    backgroundColor: "$green500",
    border: 0,
    color: "$white",
    borderRadius: 8,
    padding: "1.25rem",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "$md",

    "&:hover": {
      backgroundColor: "$green300",
    },
  },
});

export const Loader = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: 656,
  "&::after": {
    content: " ' '",
    width: 40,
    height: 40,
    border: "2px solid $gray300",
    borderTopColor: "$green300",
    borderRadius: "50%",
    animation: `${keyframes({
      "0%": { transform: "rotate(0deg)" },
      "100%": { transform: "rotate(360deg)" },
    })} 1s linear infinite`,
  },
});
