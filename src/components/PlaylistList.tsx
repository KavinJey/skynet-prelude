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
  Dropdown,
  Form,
} from "semantic-ui-react";
import { useState, useEffect } from "react";
import { useStoreState, useStoreActions } from "../state/easy-peasy-typed";
import ReactJkMusicPlayer from "react-jinke-music-player";
import "react-jinke-music-player/assets/index.css";
import EditSongForm from "./EditSongForm";

const PlaylistList = () => {
  const [openNewPlaylistModal, setNewPlaylistModal] = useState(false);
  const playlists = useStoreState((state) => state.music.playlists);
  const songs = useStoreState((state) => state.music.audioFileItems);
  const addPlaylist = useStoreActions(
    (actions) => actions.music.addNewPlaylist
  );

  const [playlistForm, setPlaylistForm] = useState({
    songs: [],
    playlistTitle: "",
  });

  //   const { client } = useContext

  //   useEffect(() => {
  //     // if we have MySky loaded
  //     setLoading(true);
  //     if (mySky) {

  //     }
  //   }, [mySky]);

  useEffect(() => {}, [openNewPlaylistModal, playlistForm]);

  const transformToOptions = (songs) => {
    if (songs) {
      const transformedSongs = songs.map((audioFile, i) => ({
        key: i,
        text: audioFile?.songName,
        value: {
          ...audioFile,
        },
      }));

      return transformedSongs;
    } else {
      return [
        {
          key: 1,
          text: "No songs loaded.",
        },
      ];
    }
  };

  return (
    <>
      <Modal
        onClose={() => setNewPlaylistModal(false)}
        onOpen={() => setNewPlaylistModal(true)}
        open={openNewPlaylistModal}
        trigger={<Button>Add New Playlist</Button>}
      >
        <Modal.Content>
          <Form
            style={{ display: "flex", flexDirection: "column" }}
            onSubmit={() => {
              addPlaylist({ playlistTitle: playlistForm.playlistTitle });
              setNewPlaylistModal(false);
            }}
          >
            <Form.Field>
              <label>Playlist Name</label>
              <input
                onChange={(e) =>
                  setPlaylistForm({
                    ...playlistForm,
                    playlistTitle: e.target.value,
                  })
                }
                name="playlistTitle"
                placeholder="Playlist Name"
              />
            </Form.Field>
            <Dropdown
              placeholder="Songs Select"
              fluid
              multiple
              selection
              onChange={(event, data) => {
                setPlaylistForm({
                  ...playlistForm,
                  songs: data.value,
                });
              }}
              options={transformToOptions(songs)}
            />
            <Button
              style={{ margin: "2em", alignSelf: "end" }}
              color="purple"
              content="Save"
              labelPosition="right"
              icon="checkmark"
              type="submit"
            />
          </Form>
        </Modal.Content>
      </Modal>
      <Segment raised>
        <List divided relaxed>
          {Object.keys(playlists).map((playlistKey, i) => (
            <List.Item key={i}>
              <List.Content>
                <List.Header as="h3">Playlist: {playlistKey}</List.Header>
                <List.Description>
                  <List relaxed>
                    {playlists[playlistKey].songs.map((song, i) => {
                      <List.Item key={i}>
                        <List.Content>
                          <List.Header as="a">
                            <Container style={{ display: "flex" }}>
                              {song.cover ? (
                                <Image
                                  style={{ marginRight: "2em" }}
                                  src={song.cover}
                                />
                              ) : (
                                <Placeholder
                                  style={{
                                    height: 75,
                                    width: 75,
                                    marginRight: "2em",
                                  }}
                                >
                                  <Placeholder.Image />
                                  No Image
                                </Placeholder>
                              )}
                              <h5 style={{ marginRight: "2em" }}>
                                Name: {song.songName}{" "}
                              </h5>
                              <h5>Artist: {song.songArtist} </h5>
                            </Container>
                          </List.Header>
                          <List.Description>
                            <a href={song.srcLink}> Sia Link {song.srcLink}</a>{" "}
                            <br /> <br />
                            <a href={song.browserUrl}> Portal URL </a>
                            <Segment>
                              <Menu icon="labeled">
                                <Menu.Item
                                  name="Play Song"
                                  onClick={(event) =>
                                    playSong({
                                      name: song.name,
                                      singer: song.singer,
                                      musicSrc: song.browserUrl,
                                      cover: song.cover,
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
                                    setCurrentSongEdit(song);
                                    setSongEditModal(true);
                                  }}
                                >
                                  <Icon name="edit" />
                                </Menu.Item>

                                <Menu.Item
                                  name="Delete"
                                  onClick={(event) => deletesong({ index: i })}
                                >
                                  <Icon name="delete" />
                                </Menu.Item>
                                <Menu.Item
                                  name="Add"
                                  onClick={(event) =>
                                    addToQueue({
                                      name: song.name,
                                      singer: song.singer,
                                      musicSrc: song.browserUrl,
                                      cover: song.cover,
                                    })
                                  }
                                >
                                  <Icon name="add" />
                                </Menu.Item>
                              </Menu>
                            </Segment>
                          </List.Description>
                        </List.Content>
                      </List.Item>;
                    })}
                  </List>
                </List.Description>
              </List.Content>
            </List.Item>
          ))}
        </List>
      </Segment>
    </>
  );
};

export default PlaylistList;
