import { Tab, Header, Container, Divider } from "semantic-ui-react";
import SongList from "./SongList";

const tabTitleStyling = {
  paddingTop: "1em",
};

const LibraryPane = () => {
  return (
    <Tab.Pane>
      <Header as="h1" color="violet" style={tabTitleStyling}>
        My Library
      </Header>
      <p> Your collection of music</p>
      <Divider />
      <Container>
        <SongList />
      </Container>
    </Tab.Pane>
  );
};

export default LibraryPane;
