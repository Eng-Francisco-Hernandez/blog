import NavbarLayout from "@/components/layout/NavbarLayout";
import React, { useEffect, useState } from "react";
import { Container, Row, Card, Button, Form, Alert } from "react-bootstrap";
// @ts-ignore
import { useRouter } from "next/router";
import sanitizeHtml from "sanitize-html";
import dynamic from "next/dynamic";
import SpinnerLayout from "@/components/spinner-layout/SpinnerLayout";

const Editor = dynamic(() => import("@/components/editor/Editor"), {
  ssr: false,
});

export default function CreatePost() {
  const router = useRouter();
  const {id} = router.query
  const [postTitle, setPostTitle] = useState("");
  const [postDescription, setPostDescription] = useState("");
  const [postBody, setPostBody] = useState("");
  const [showError, setShowError] = useState(false);
  const [isPostLoading, setIsPostLoading] = useState(false);

  const getPost = async () => {
    setIsPostLoading(true);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/${id}`
    );
    const parsedPost = await res.json();
    setPostTitle(parsedPost.title);
    setPostDescription(parsedPost.description);
    setPostBody(parsedPost.body);
    setIsPostLoading(false);
  };

  useEffect(() => {
    if(!id) {
      return;
    }
    if (id) getPost();
  }, [id]);

  const createPost = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: postTitle,
            description: postDescription,
            body: sanitizeHtml(postBody),
          }),
        }
      );
      if (response.status === 400) {
        setShowError(true);
      } else {
        setShowError(false);
        router.push("/landing");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const updatePost = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: postTitle,
            description: postDescription,
            body: sanitizeHtml(postBody),
          }),
        }
      );
      if (response.status === 400) {
        setShowError(true);
      } else {
        setShowError(false);
        router.push("/landing");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const savePost = async () => {
    if (!id) {
      await createPost();
    } else {
      await updatePost();
    }
  };

  return (
    <NavbarLayout>
      {isPostLoading ? (
        <SpinnerLayout />
      ) : (
        <Container>
          <Row>
            <Card>
              <Card.Body>
                {showError && (
                  <Alert variant="danger">
                    This title already exists. Please choose another one.
                  </Alert>
                )}
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Post title"
                      value={postTitle}
                      onChange={(e) => setPostTitle(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Post title"
                      value={postDescription}
                      onChange={(e) => setPostDescription(e.target.value)}
                    />
                  </Form.Group>
                  <h6 className="mt-10">Body</h6>
                  <Editor
                    value={postBody}
                    onChange={(data: any) => setPostBody(data)}
                  />
                  <Button
                    variant="dark"
                    disabled={
                      postTitle.trim() === "" ||
                      postDescription.trim() === "" ||
                      postBody.trim() === ""
                    }
                    onClick={savePost}
                    className="mt-10"
                  >
                    Save
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Row>
        </Container>
      )}
    </NavbarLayout>
  );
}
