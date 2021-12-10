import {
  List,
  Button,
  Image,
  Menu,
  Segment,
  Icon,
  Container,
  Placeholder,
  Modal,
  Dropdown,
  Form,
} from "semantic-ui-react";
import { useState, useEffect } from "react";
import { useStoreState, useStoreActions } from "../state/easy-peasy-typed";
import "react-jinke-music-player/assets/index.css";
import SongList from "./SongList";

const PlaylistList = () => {
  const [openNewPlaylistModal, setNewPlaylistModal] = useState(false);
  const playlists = useStoreState((state) => state.music.playlists);
  const songs = useStoreState((state) => state.music.audioLibrary);
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
      const transformedSongs = Object.keys(songs).map((audioFile, i) => ({
        key: i,
        text: songs[audioFile]?.title,
        value: {
          ...songs[audioFile],
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
        trigger={<Button color="purple">Add New Playlist</Button>}
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
                multiple
                options={transformToOptions(songs)}
                selection
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
                     <SongList />
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
