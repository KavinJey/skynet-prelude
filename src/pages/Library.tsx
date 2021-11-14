import { Header, Container, Tab, Card, Dimmer, Loader, Segment } from "semantic-ui-react";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import ReactJkMusicPlayer from "react-jinke-music-player";
import "react-jinke-music-player/assets/index.css";
import PreludeMusicBar from "../components/PreludeMusicBar";
import Uploader from "../components/Uploader";
import LibraryPane from "../components/LibraryPane";
import { useStoreState } from "easy-peasy";

const tabTitleStyling = {
  padding: "1em",
};


const panes = [
  {
    menuItem: "My Library",
    render: () => (
      <LibraryPane />
    ),
  },

  {
    menuItem: "Upload",
    render: () => (
      <Tab.Pane>
        <Header as="h1" color="violet" style={tabTitleStyling}>
          Upload Your Music
        </Header>
        {/* @ts-ignore */}
        <Uploader />
      </Tab.Pane>
    ),
  },
];

const Library = () => {
   


  return (
      
    <Container style={{ marginTop: "15%" }}>
      <Tab style={{border: '1 solid #000;'}} panes={panes} />
      <PreludeMusicBar />
    </Container>

  );
};

export default Library;
