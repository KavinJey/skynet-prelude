import React from "react";
import { Tab, Header, Container, Card, Divider } from "semantic-ui-react";
import SongList from "./SongList";
import PlaylistList from "./PlaylistList";

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
      <Divider />
      <Container>
        <SongList />
      </Container>
    </Tab.Pane>
  );
};

const PlaylistPane = () => {
  return (
    <Tab.Pane>
      <Header as="h1" color="violet" style={tabTitleStyling}>
        My Library
      </Header>
      <p> Your collection of playlists</p>
      <Container>
        <SongList />
      </Container>
    </Tab.Pane>
  );
};

export default LibraryPane;
