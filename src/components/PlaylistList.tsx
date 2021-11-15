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
import { useStoreState, useStoreActions } from "easy-peasy";
import ReactJkMusicPlayer from "react-jinke-music-player";
import "react-jinke-music-player/assets/index.css";
import EditSongForm from "./EditSongForm";

const PlaylistList = () => {
  const [openSongEditModal, setSongEditModal] = useState(false);
  const audioFiles = useStoreState((state) => state.music.audioFileItems);
  const { updateAudioFile, deleteAudioFile, playSong, addToQueue } =
    useStoreActions((actions) => actions.music);
  const currentQueue = useStoreState((state) => state.music.currentQueue);
  const addAudioPlayerInstance = useStoreActions(
    (state) => state.music.addAudioPlayerInstance
  );

  const [currentSongEdit, setCurrentSongEdit] = useState({});

  //   const { client } = useContext

  //   useEffect(() => {
  //     // if we have MySky loaded
  //     setLoading(true);
  //     if (mySky) {

  //     }
  //   }, [mySky]);

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
                      style={{ height: 75, width: 75, marginRight: "2em" }}
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
                <a href={audioFile.srcLink}> Sia Link {audioFile.srcLink}</a>{" "}
                <br /> <br />
                <a href={audioFile.browserUrl}> Portal URL </a>
                <Segment>
                  <Menu icon="labeled">
                    <Menu.Item
                      name="Play Song"
                      onClick={(event) =>
                        playSong({
                          name: audioFile.name,
                          singer: audioFile.singer,
                          musicSrc: audioFile.browserUrl,
                          cover: audioFile.cover,
                        })
                      }
                    >
                      <Icon name="play circle" />
                    </Menu.Item>

                    <Menu.Item
                      name="Edit Song"
                      onClick={(event) => console.log(event)}
                    >
                      <Icon
                        name="edit"
                        onClick={() => {
                          setCurrentSongEdit(audioFile);
                          setSongEditModal(true);
                        }}
                      />
                    </Menu.Item>

                    <Menu.Item
                      name="Delete"
                      onClick={(event) => console.log(event)}
                    >
                      <Icon name="delete" />
                    </Menu.Item>
                    <Menu.Item
                      name="Add"
                      onClick={(event) =>
                        addToQueue({
                          name: audioFile.name,
                          singer: audioFile.singer,
                          musicSrc: audioFile.browserUrl,
                          cover: audioFile.cover,
                        })
                      }
                    >
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

      <Modal
        onClose={() => setSongEditModal(false)}
        onOpen={() => setSongEditModal(true)}
        open={openSongEditModal}
      >
        <Modal.Header>Edit Song {currentSongEdit.srcLink}</Modal.Header>
        <Modal.Content>
          <Image size="medium" src={currentSongEdit.cover} wrapped />
          <Modal.Description>
            <EditSongForm
              modalToggle={setSongEditModal}
              songTitle={currentSongEdit.songTitle}
              songArtist={currentSongEdit.songArtist}
              cover={currentSongEdit.cover}
            />
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions></Modal.Actions>
      </Modal>
    </>
  );
};

export default PlaylistList;
