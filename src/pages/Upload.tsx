import { Header, Container } from "semantic-ui-react";
import Uploader from "../components/Uploader";

const Upload = () => {
  return (
    <Container text style={{ marginTop: "25%" }}>
      <Header as="h1" color="violet">
        Upload Your Music
      </Header>
      {/* @ts-ignore */}
      <Uploader uploadMode="directoryS" />
    </Container>
  );
};

export default Upload;
