import { Container, Row, Col } from "react-bootstrap";

function Footer() {
  return (
    <footer className="bg-light text-dark py-4">
      <Container>
        <Row className="mt-0">
          <Col className="text-center">
            <p className="mb-0">
              &copy; {new Date().getFullYear()} ShopEase. All Rights Reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
