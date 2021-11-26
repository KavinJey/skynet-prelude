import { Header, Container, Tab, Dimmer, Loader } from "semantic-ui-react";
import { useEffect } from "react";
import "react-jinke-music-player/assets/index.css";
import PreludeMusicBar from "../components/PreludeMusicBar";
import Uploader from "../components/Uploader";
import LibraryPane from "../components/LibraryPane";
import { useStoreState } from "../state/easy-peasy-typed";
import PlaylistPane from "../components/PlaylistPane";

const tabTitleStyling = {
  padding: "1em",
};

const panes = [
  {
    menuItem: "My Library",
    render: () => <LibraryPane />,
  },
  {
    menuItem: "My Playlist",
    render: () => <PlaylistPane />,
  },
  {
    menuItem: "Upload",
    render: () => (
      <Tab.Pane>
        <Header as="h1" color="violet" style={tabTitleStyling}>
          Upload Your Music
        </Header>
        <Uploader uploadMode="file" />
      </Tab.Pane>
    ),
  },
];

const Library = () => {
  const currentQueue = useStoreState((state) => state.music.currentQueue);
  const loading = useStoreState((state) => state.music.loading);

  useEffect(() => {}, [currentQueue]);

  return (
    <Container style={{ marginTop: "15%" }}>
      <Dimmer active={loading}>
        <Loader indeterminate> Loading Music Library </Loader>
      </Dimmer>
      <Tab style={{ border: "1 solid #000" }} panes={panes} />
      {/* <PreludeMusicBar currentQueue={currentQueue} /> */}
    </Container>
  );
};

export default Library;
