import NavbarLayout from "@/components/layout/NavbarLayout";
import React, { useEffect, useState } from "react";
import { Container, Row, Card, Alert, Form, Button } from "react-bootstrap";
import { useRouter } from "next/router";

export default function index() {
  const router = useRouter();
  const [postTitle, setPostTitle] = useState("");
  const [postDescription, setPostDescription] = useState("");
  const [postBody, setPostBody] = useState("");
  const [postDate, setPostDate] = useState("");

  const getPost = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/${router.query.id}`
    );
    const parsedPost = await res.json();
    setPostTitle(parsedPost.title);
    setPostDescription(parsedPost.description);
    setPostBody(parsedPost.body);
    setPostDate(parsedPost.createdAt);
  };

  useEffect(() => {
    if (router.query.id) getPost();
  }, []);
  return (
    <NavbarLayout>
      <Container>
        <Row>
          <Card>
            <Card.Body>
              <div className="medium-text">
                Publication date: {new Date(postDate).toLocaleDateString()}
              </div>
              <h2>{postTitle}</h2>
              <div className="medium-text">{postDescription}</div>
              <div dangerouslySetInnerHTML={{ __html: postBody }} />
            </Card.Body>
          </Card>
        </Row>
      </Container>
    </NavbarLayout>
  );
}
