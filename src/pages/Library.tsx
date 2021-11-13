import { Header, Container, Tab } from "semantic-ui-react";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import ReactJkMusicPlayer from "react-jinke-music-player";
import "react-jinke-music-player/assets/index.css";
import PreludeMusicBar from "../components/PreludeMusicBar";
import Uploader from "../components/Uploader";

const tabTitleStyling = {
  padding: "1em",
};

const panes = [
  {
    menuItem: "My Library",
    render: () => (
      <Tab.Pane>
        <Header as="h1" color="violet" style={tabTitleStyling}>
          My Library
        </Header>
        <p> Your collection of files uploaded.</p>
      </Tab.Pane>
    )
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
      <Tab panes={panes} />
      <PreludeMusicBar />
    </Container>
  );
};

export default Library;
