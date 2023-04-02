import {
  Navbar,
  Container,
  Nav,
  Form,
  Button,
  Modal,
  ListGroup,
} from "react-bootstrap";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Navigation() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);

  const searchPosts = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/search`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: query.trim(),
          }),
        }
      );
      setSearchResults(await response.json());
      setShowSearchResults(true);
    } catch (error) {
      console.error(error);
    }
  };

  const onKeyDown = async (e: any) => {
    if (e.key === "Enter") {
      if (query.trim() === "") return;
      await searchPosts();
    }
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Modal
        show={showSearchResults}
        onHide={() => setShowSearchResults(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Posts found</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ListGroup>
            {searchResults.map((post: any, index) => {
              return (
                <ListGroup.Item>
                  <strong>{post.title}</strong>
                  <div>{post.description}</div>
                  <div className="mt-10">
                    <Button
                      onClick={() => router.push(`/posts/${post._id}`)}
                      size="sm"
                      className="mr-10"
                      variant="dark"
                    >
                      View
                    </Button>
                    <Button
                      size="sm"
                      variant="outline-dark"
                      onClick={() => router.push(`/posts/${post._id}/edit`)}
                    >
                      Edit
                    </Button>
                  </div>
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowSearchResults(false)}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Container fluid>
        <Navbar.Brand>Personal blog!</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link onClick={() => router.push("/landing")}>
              All posts
            </Nav.Link>
            <Nav.Link onClick={() => router.push("/posts/create")}>
              Create post
            </Nav.Link>
          </Nav>
          <div className="d-flex">
            <Form.Control
              type="text"
              placeholder="Search for a post"
              className="me-2"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => onKeyDown(e)}
            />
            <Button onClick={searchPosts} variant="outline-light">
              Search
            </Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
