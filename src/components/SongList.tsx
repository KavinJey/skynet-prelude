//  @ts-nocheck
// TODO: make typesafe
import {
  List,
  Image,
  Menu,
  Segment,
  Divider,
  Icon,
  Container,
  Placeholder,
  Modal,
} from "semantic-ui-react";
import { useState } from "react";
import { useStoreState, useStoreActions } from "../state/easy-peasy-typed";
import "react-jinke-music-player/assets/index.css";
import EditSongForm from "./EditSongForm";

import { NavLink, useLocation } from "react-router-dom";

const NavMenuItem = ({ title, route, currentRoute }) => {
  const active = currentRoute === `/${route}`;
  return (
    <Menu.Item as={active ? null : NavLink} to={route} active={active}>
      {title}
    </Menu.Item>
  );
};

const SongList = () => {
  const [openSongEditModal, setSongEditModal] = useState(false);
  const location = useLocation();

  const audioFiles = useStoreState((state) => state.music.audioLibrary);
  const { deleteAudioFile, playSong, addToQueue } = useStoreActions(
    (actions) => actions.music
  );
  const isPlaying = useStoreState((state) => state.music.playing);

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
        {Object.keys(audioFiles).map((audioFile, i) => (
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
                    Name: {audioFile.songName}{" "}
                  </h5>
                  <h5>Artist: {audioFile.songArtist} </h5>
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
                      {isPlaying ? (
                        <Icon name="pause circle" />
                      ) : (
                        <Icon name="play circle" />
                      )}
                    </Menu.Item>
                    <Menu.Item
                      name="Edit Song"
                      onClick={() => {
                        setSongEditModal(true);
                      }}
                    >
                      <Icon name="edit" />
                    </Menu.Item>{" "}
                    <NavMenuItem
                      currentRoute={location.pathname}
                      route={`/edit-song/${audioFile}/`}
                      title="edit-song"
                      key={i}
                    />
                    <Menu.Item
                      name="Delete"
                      onClick={(event) => deleteAudioFile({ index: i })}
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
                  {openSongEditModal && (
                    <EditSongForm
                      key={i}
                      title={`${audioFiles[audioFile].title}.${audioFiles[audioFile].ext}`}
                    />
                  )}
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
        <Modal.Header>
          Edit Song {"-" || currentSongEdit.songName} ({currentSongEdit.srcLink}
          )
        </Modal.Header>
        <Modal.Content>
          <Image size="medium" src={currentSongEdit.cover} wrapped />
          <Modal.Description>
            <EditSongForm
              modalToggle={setSongEditModal}
              audioFile={currentSongEdit}
            />
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions></Modal.Actions>
      </Modal>
    </>
  );
};

export default SongList;
