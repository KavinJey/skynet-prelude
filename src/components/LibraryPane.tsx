import { Tab, Header, Container } from "semantic-ui-react";
import SongList from "./SongList";

const tabTitleStyling = {
  padding: "1em",
};

const LibraryPane = () => {
  return (
    <Tab.Pane>
      <Header as="h1" color="violet" style={tabTitleStyling}>
        My Library
      </Header>
      <p> Your collection of music</p>
      <Container>
        <SongList />
      </Container>
    </Tab.Pane>
  );
};

export default LibraryPane;
