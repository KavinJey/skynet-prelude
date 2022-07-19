import { Header, Container, Divider } from "semantic-ui-react";
import Uploader from "../components/Uploader";

const Upload = () => {
  return (
    <Container text style={{ padding: "0.5em" }}>
      <Header as="h1" color="violet">
        Upload Your Music
      </Header>
      <Header color="violet" as="h5">
        Files uploaded here will be available on{" "}
        <a href="http://vup.app/">Vup</a> under the directory{" "}
        <code>prelude/</code>. You can also add music files to this directory to
        sync between Vup and Prelude.
      </Header>
      <Divider />
      {/* @ts-ignore */}
      <Uploader />
    </Container>
  );
};

export default Upload;
