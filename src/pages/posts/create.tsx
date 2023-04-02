import NavbarLayout from "@/components/layout/NavbarLayout";
import React, { useState } from "react";
import { Container, Row, Card, Button, Form, Alert } from "react-bootstrap";
// @ts-ignore
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useRouter } from "next/router";
import sanitizeHtml from "sanitize-html";

export default function CreatePost() {
  const router = useRouter();
  const [postTitle, setPostTitle] = useState("");
  const [postDescription, setPostDescription] = useState("");
  const [postBody, setPostBody] = useState("");
  const [showCreateError, setShowCreateError] = useState(false);

  const savePost = async () => {
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
        setShowCreateError(true);
      } else {
        setShowCreateError(false);
        router.push("/landing");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <NavbarLayout>
      <Container>
        <Row>
          <Card>
            <Card.Body>
              {showCreateError && (
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
                <CKEditor
                  editor={ClassicEditor}
                  data={postBody}
                  onChange={(event: any, editor: any) => {
                    const data = editor.getData();
                    setPostBody(data);
                  }}
                />
                <Button
                  disabled={
                    postTitle.trim() === "" ||
                    postDescription.trim() === "" ||
                    postBody.trim() === ""
                  }
                  onClick={savePost}
                  className="mt-10"
                  variant="primary"
                >
                  Save
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Row>
      </Container>
    </NavbarLayout>
  );
}
