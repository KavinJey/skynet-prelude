import { Header, Container, Dimmer, Loader } from "semantic-ui-react";
import Uploader from "../components/Uploader";
import { useStoreState } from "../state/easy-peasy-typed";

const Upload = () => {
  const loading = useStoreState((state) => state.music.loading);
  return (
    <Container text style={{ marginTop: "25%" }}>
      <Dimmer active={loading}>
        <Loader indeterminate> Loading Music Library </Loader>
      </Dimmer>
      <Header as="h1" color="violet">
        Upload Your Music
      </Header>
      <Uploader uploadMode="directory" />
    </Container>
  );
};

export default Upload;
