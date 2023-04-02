import NavbarLayout from "@/components/layout/NavbarLayout";
import React from "react";
import { Container, Row, Button, Card } from "react-bootstrap";
import { Trash } from "react-bootstrap-icons";

export default function Landing({ posts = [] }) {
  return (
    <NavbarLayout>
      <Container>
        <Row>
          {posts.map((post: any, index) => {
            return (
              <Card className="mb-10" key={index}>
                <Card.Body>
                  <Card.Title>{post.title}</Card.Title>
                  <Card.Text>{post.description}</Card.Text>
                  <div className="post-card-footer">
                    <div>
                      <Button size="sm" className="mr-10" variant="primary">
                        View
                      </Button>
                      <Button size="sm" variant="warning">
                        Edit
                      </Button>
                    </div>
                    <div>
                      <Button size="sm" variant="danger">
                        <Trash />
                      </Button>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            );
          })}
        </Row>
      </Container>
    </NavbarLayout>
  );
}

export async function getServerSideProps() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts`);
  const posts = await res.json();
  return {
    props: {
      posts,
    },
  };
}
