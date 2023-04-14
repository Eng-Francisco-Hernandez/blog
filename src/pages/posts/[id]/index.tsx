import NavbarLayout from "@/components/layout/NavbarLayout";
import React, { useEffect, useState } from "react";
import { Container, Row, Card } from "react-bootstrap";
import SpinnerLayout from "@/components/spinner-layout/SpinnerLayout";

export default function index({ id }: { id: string }) {
  const [postTitle, setPostTitle] = useState("");
  const [postDescription, setPostDescription] = useState("");
  const [postBody, setPostBody] = useState("");
  const [postDate, setPostDate] = useState("");
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
    setPostDate(parsedPost.createdAt);
    setIsPostLoading(false);
  };

  useEffect(() => {
    if (id) getPost();
  }, []);

  return (
    <NavbarLayout>
      {isPostLoading ? (
        <SpinnerLayout />
      ) : (
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
      )}
    </NavbarLayout>
  );
}

export async function getServerSideProps(context: any) {
  const { id } = context.query;
  return {
    props: {
      id,
    },
  };
}
