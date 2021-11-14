//  @ts-nocheck
// TODO: make typesafe
import { Checkbox, List, Button, Loader } from "semantic-ui-react";
import { useStoreState, useStoreActions } from "easy-peasy";

const SongList = () => {
  const audioFiles = useStoreState((state) => state.music.audioFileItems);
  const { updateAudioFile, deleteAudioFile } = useStoreActions(
    (actions) => actions.music
  );

  return (
    <List divided relaxed>
      {audioFiles.map((todo, i) => (
        <List.Item key={i}>
          This Rendered a song 
          <Button
            compact
            basic
            color="red"
            icon="delete"
            floated="right"
            onClick={(e, elem) => {
              deleteAudioFile({ elem, i });
            }}
          />
        </List.Item>
      ))}
    </List>
  );
};

export default SongList;
