import React from 'react'
import { Tab, Header, Container, Card } from 'semantic-ui-react'
import SongList from './SongList';

const tabTitleStyling = {
  padding: "1em",
};


const LibraryPane = () => {

    return (
        <Tab.Pane>
        <Header as="h1" color="violet" style={tabTitleStyling}>
          My Library
        </Header>
        <p> Your collection of files uploaded.</p>
        <Container>
            <SongList />
        </Container>
      </Tab.Pane>

    )
    
}

export default LibraryPane