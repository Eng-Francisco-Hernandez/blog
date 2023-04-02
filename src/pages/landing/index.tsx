import NavbarLayout from "@/components/layout/NavbarLayout";
import React, { useEffect, useState } from "react";
import { Container, Row, Button, Card, Alert } from "react-bootstrap";
import { Trash } from "react-bootstrap-icons";
import { useRouter } from "next/router";

export default function Landing() {
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts`)
      .then(async (posts) => {
        const parsedPosts = await posts.json();
        setPosts(parsedPosts);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const deletePost = async (id: string) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/${id}`,
        {
          method: "DELETE",
        }
      );
      if (res.status === 204) {
        const newPosts = posts.filter((post: any) => post._id !== id);
        setPosts(newPosts);
        setShowErrorAlert(false);
      } else {
        setShowErrorAlert(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <NavbarLayout>
      <Container>
        <Row>
          {showErrorAlert && (
            <Alert variant="danger">
              There was an error deleting the post. Please try again.
            </Alert>
          )}
          {!posts.length && (
            <Alert>
              There are no posts published yet. Go ahead and{" "}
              <a
                style={{
                  cursor: "pointer",
                  textDecoration: "underline",
                }}
                onClick={() => router.push("/posts/create")}
              >
                create one!
              </a>
            </Alert>
          )}
          {posts.map((post: any, index) => {
            return (
              <Card className="mb-10" key={index}>
                <Card.Body>
                  <Card.Title>{post.title}</Card.Title>
                  <Card.Text>{post.description}</Card.Text>
                  <div className="post-card-footer">
                    <div>
                      <Button
                        onClick={() => router.push(`/posts/${post._id}`)}
                        size="sm"
                        className="mr-10"
                        variant="primary"
                      >
                        View
                      </Button>
                      <Button
                        size="sm"
                        variant="warning"
                        onClick={() => router.push(`/posts/${post._id}/edit`)}
                      >
                        Edit
                      </Button>
                    </div>
                    <div>
                      <Button
                        onClick={() => deletePost(post._id)}
                        size="sm"
                        variant="danger"
                      >
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
