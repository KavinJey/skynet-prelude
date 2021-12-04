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
import SongElement from "./SongElement";

import { NavLink, useLocation } from "react-router-dom";

const SongList = () => {
  const [openSongEditModal, setSongEditModal] = useState(false);

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
          <SongElement key={i} song={audioFiles[audioFile]} />
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
