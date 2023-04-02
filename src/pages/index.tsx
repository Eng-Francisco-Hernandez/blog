import Navigation from "@/components/navigation/Navigation";
import { Inter } from "next/font/google";
import { Col, Container, Row, ThemeProvider } from "react-bootstrap";
import Landing from "./landing";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <ThemeProvider
      breakpoints={["xxxl", "xxl", "xl", "lg", "md", "sm", "xs", "xxs"]}
      minBreakpoint="xxs"
    >
      <Landing />
    </ThemeProvider>
  );
}
