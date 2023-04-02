import {
  Navbar,
  Container,
  Nav,
  Form,
  Button,
} from "react-bootstrap";
import { useRouter } from "next/router";

export default function Navigation() {
  const router = useRouter();
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container fluid>
        <Navbar.Brand>Start reading your posts!</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link onClick={() => router.push('/landing')}>All posts</Nav.Link>
            <Nav.Link onClick={() => router.push('/posts/create')}>Create post</Nav.Link>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search for a post"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-light">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
