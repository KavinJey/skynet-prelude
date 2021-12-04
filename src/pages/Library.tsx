import {
  Header,
  Container,
  Tab,
  Dimmer,
  Loader,
  Label,
  Segment,
} from "semantic-ui-react";
import { useEffect } from "react";
import "react-jinke-music-player/assets/index.css";
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
  const library = useStoreState((state) => state.music.audioLibrary);
  const loading = useStoreState((state) => state.music.loading);
  const isLoggedIn = useStoreState((state) => state.mySky.loggedIn);

  useEffect(() => {}, [library]);

  return (
    <Container style={{ marginTop: "15%" }}>
      <Dimmer active={loading}>
        <Loader indeterminate>
          {" "}
          Logging into MySky... &amp; <br /> loading Music Library...{" "}
        </Loader>
      </Dimmer>
      <Tab style={{ border: "1 solid #000" }} panes={panes} />

      {!isLoggedIn && (
        <Segment>
          {" "}
          <Label color="purple" as="h1">
            {" "}
            Please login to access library{" "}
          </Label>
        </Segment>
      )}
    </Container>
  );
};

export default Library;
