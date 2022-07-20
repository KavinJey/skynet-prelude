import {
  Header,
  Container,
  Tab,
  Card,
  Dimmer,
  Loader,
  Segment,
} from "semantic-ui-react";
import React, { Component, useEffect } from "react";
import ReactDOM from "react-dom";
import ReactJkMusicPlayer from "react-jinke-music-player";
import "react-jinke-music-player/assets/index.css";
import PreludeMusicBar from "../components/PreludeMusicBar";
import Uploader from "../components/Uploader";
import LibraryPane from "../components/LibraryPane";
import { useStoreState } from "easy-peasy";
import PlaylistPane from "../components/PlaylistPane";
import Upload from "./Upload";

const tabTitleStyling = {
  padding: "1em",
};

const panes = [
  {
    menuItem: "My Library",
    render: () => <LibraryPane />,
  },
  // {
  //   menuItem: "My Playlist",
  //   render: () => <PlaylistPane />,
  // },
  {
    menuItem: "Upload",
    render: () => (
      <Tab.Pane>
        <Upload />
      </Tab.Pane>
    ),
  },
];

const Library = () => {
  // @ts-ignore
  const currentQueue = useStoreState((state) => state.music.currentQueue);

  useEffect(() => {}, [currentQueue]);

  return (
    <Container style={{ marginTop: "15%" }}>
      <Tab style={{ border: "1 solid #000;" }} panes={panes} />
      <PreludeMusicBar currentQueue={currentQueue} />
    </Container>
  );
};

export default Library;
