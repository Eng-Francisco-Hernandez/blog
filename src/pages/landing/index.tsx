import NavbarLayout from "@/components/layout/NavbarLayout";
import React, { useEffect, useState } from "react";
import { Container, Row, Button, Card, Alert, Col } from "react-bootstrap";
import { Trash } from "react-bootstrap-icons";
import { useRouter } from "next/router";
import SpinnerLayout from "@/components/spinner-layout/SpinnerLayout";

export default function Landing() {
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [isDataLoading, setIsDataLoading] = useState(false);

  useEffect(() => {
    async function getPostsFromApi() {
      try {
        setIsDataLoading(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts`
        );
        const parsedPosts = await response.json();
        setPosts(parsedPosts);
        setIsDataLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    getPostsFromApi();
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
      {isDataLoading ? (
        <SpinnerLayout />
      ) : (
        <Container>
          <Row>
            {showErrorAlert && (
              <Col>
                <Alert variant="danger">
                  There was an error deleting the post. Please try again.
                </Alert>
              </Col>
            )}
            {!posts.length && (
              <Col>
                <Alert variant="dark">
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
              </Col>
            )}
          </Row>
          <Row>
            {posts.map((post: any, index) => {
              return (
                <Col key={index} xs={6}>
                  <Card className="mb-10">
                    <Card.Body>
                      <Card.Title>{post.title}</Card.Title>
                      <Card.Text>{post.description}</Card.Text>
                      <div className="post-card-footer">
                        <div>
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
                            onClick={() =>
                              router.push(`/posts/${post._id}/edit`)
                            }
                          >
                            Edit
                          </Button>
                        </div>
                        <div>
                          <Button
                            onClick={() => deletePost(post._id)}
                            size="sm"
                            variant="outline-danger"
                            style={{
                              borderRadius: "50%",
                            }}
                          >
                            <Trash />
                          </Button>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </Container>
      )}
    </NavbarLayout>
  );
}
