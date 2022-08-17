//  @ts-nocheck
// TODO: make typesafe
import {
  Checkbox,
  List,
  Button,
  Image,
  Loader,
  Table,
  Menu,
  Segment,
  Divider,
  Icon,
  Container,
  Placeholder,
  Modal,
  Header,
} from "semantic-ui-react";
import { useState } from "react";
import { useStoreState, useStoreActions } from "../state/easy-peasy-typed";
import ReactJkMusicPlayer from "react-jinke-music-player";
import "react-jinke-music-player/assets/index.css";
import EditSongForm from "./EditSongForm";

const SongList = () => {
  const [openSongEditModal, setSongEditModal] = useState(false);

  const audioFiles = useStoreState((state) => state.music.audioFileItems);

  const { updateAudioFile, deleteAudioFile, playSong, addToQueue } =
    useStoreActions((actions) => actions.music);
  const isPlaying = useStoreState((state) => state.music.playing);

  const [currentSongEdit, setCurrentSongEdit] = useState({});

  return (
    <>
      <List divided relaxed>
        {audioFiles.map((audioFile, i) => (
          <List.Item key={i}>
            <List.Content>
              <List.Header as="a">
                <Container style={{ display: "flex" }}>
                  {audioFile.cover ? (
                    <Image
                      style={{ marginRight: "2em" }}
                      src={audioFile.cover}
                    />
                  ) : (
                    <Placeholder
                      style={{ height: 50, width: 50, marginRight: "2em" }}
                    >
                      <Placeholder.Image />
                      No Image
                    </Placeholder>
                  )}
                  <h5 style={{ marginRight: "2em" }}>
                    Name: {audioFile.name}{" "}
                  </h5>
                  <h5>Artist: {audioFile.singer} </h5>
                </Container>
              </List.Header>
              <List.Description>
                <p>{audioFile?.siaLink}</p>{" "}
                <Segment>
                  <Menu icon="labeled">
                    <Menu.Item name="Play Song">
                      {isPlaying ? (
                        <Icon name="pause circle" />
                      ) : (
                        <Icon name="play circle" />
                      )}
                    </Menu.Item>

                    <Menu.Item name="Edit Song">
                      <Icon name="edit" />
                    </Menu.Item>

                    <Menu.Item name="Delete">
                      <Icon name="delete" />
                    </Menu.Item>
                    <Menu.Item name="Add">
                      <Icon name="add" />
                    </Menu.Item>
                  </Menu>
                </Segment>
              </List.Description>
            </List.Content>
          </List.Item>
        ))}
        <Divider />
      </List>
    </>
  );
};

export default SongList;
