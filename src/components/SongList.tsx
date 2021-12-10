import { List, Divider } from "semantic-ui-react";
import { useStoreActions, useStoreState } from "../state/easy-peasy-typed";
import "react-jinke-music-player/assets/index.css";
import SongElement from "./SongElement";
import { useEffect } from "react";

const SongList = () => {
  const audioFiles = useStoreState((state) => state.music.audioLibrary);
  const player = useStoreState((state) => state.music.player)
  const initPlayer = useStoreActions((actions) => actions.music.initializePlayer)

  useEffect(() => {
    if (!player) {
        initPlayer()
    }
  }, [player, initPlayer])

  return (
    <List divided relaxed>
      {Object.keys(audioFiles).map((audioFile, i) => (
        <SongElement key={i} song={audioFiles[audioFile]} />
      ))}
      <Divider />
    </List>
  );
};

export default SongList;
