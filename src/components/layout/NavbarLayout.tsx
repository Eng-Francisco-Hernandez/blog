import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Navigation from "../navigation/Navigation";
import { NavbarLayoutProps } from "@/types/components";

export default function NavbarLayout(props: NavbarLayoutProps) {
  const { children } = props;
  return (
    <>
      <Navigation />
      <Container className="main-container">{children}</Container>
    </>
  );
}
