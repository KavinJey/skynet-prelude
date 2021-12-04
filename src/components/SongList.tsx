import { List, Divider } from "semantic-ui-react";
import { useStoreState } from "../state/easy-peasy-typed";
import "react-jinke-music-player/assets/index.css";
import SongElement from "./SongElement";

const SongList = () => {
  const audioFiles = useStoreState((state) => state.music.audioLibrary);

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
