import { Spinner } from "react-bootstrap";

export default function SpinnerLayout() {
  return (
    <div
      style={{
        height: "60vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Spinner animation="border" />
    </div>
  );
}
