import { Tab, Header, Container } from "semantic-ui-react";
import PlaylistList from "./PlaylistList";

const tabTitleStyling = {
  padding: "1em",
};

const PlaylistPane = () => {
  return (
    <Tab.Pane>
      <Header as="h1" color="violet" style={tabTitleStyling}>
        My Library
      </Header>
      <p> Your collection of playlists</p>
      <Container><PlaylistList /></Container>
    </Tab.Pane>
  );
};

export default PlaylistPane;
