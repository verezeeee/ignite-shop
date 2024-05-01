import { styled } from "..";

export const Container = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  minHeight: "100vh",
  justifyContent: "center",
});

export const Header = styled("header", {
  maxWidth: 1180,
  width: "100%",
  padding: "2rem 0",
  margin: "0 auto",
});

export const Image = styled("img", {
  width: 100,
  height: 100,
  filter: "invert(1)",
});

export const HeaderContainer = styled("div", {
  display: "flex",
  alignItems: "center",
  gap: "1rem",
  width: "min-content",
  cursor: "pointer",
  transition: "filter 0.2s",
  textDecoration: "none",
  h1: {
    fontSize: "$2xl",
    color: "$gray300",
  },

  "&:hover": {
    filter: "brightness(0.8)",
  },
});
