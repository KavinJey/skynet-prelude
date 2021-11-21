//  @ts-nocheck
// TODO: make typesafe
import { Input, Button, Form } from "semantic-ui-react";
import { useState } from "react";
import { useStoreActions } from "easy-peasy";

function EditSongForm({ modalToggle, audioFile }) {
  const addSongDetails = useStoreActions(
    (actions) => actions.music.addAudioFileDetails
  );

  const [localSongTitle, setSongTitle] = useState(audioFile.songName || "");
  const [localCover, setCover] = useState(audioFile.cover || "");
  const [localArtist, setSongArtist] = useState(audioFile.songArtist || "");

  console.log("this is file passed through", audioFile);

  return (
    <Form
      onSubmit={() => {
        addSongDetails({
          ...audioFile,
          songName: localSongTitle,
          songArtist: localArtist,
          cover: localCover,
        });
        modalToggle(false);
      }}
      style={{ display: "flex" }}
    >
      <Form.Group inline>
        <Form.Field>
          <label> Song Title</label>
          <Input
            onChange={(e) => setSongTitle(e.target.value)}
            placeholder="Darude Sandstorm"
            value={localSongTitle}
          />
        </Form.Field>
        <Form.Field>
          <label> Artist </label>
          <Input
            onChange={(e) => setSongArtist(e.target.value)}
            placeholder="Queen"
            value={localArtist}
          />
        </Form.Field>

        <Form.Field>
          <label> Cover </label>
          <Input
            onChange={(e) => setCover(e.target.value)}
            placeholder="valid browser link"
            value={localCover}
          />
        </Form.Field>
      </Form.Group>
      <Button
        style={{ alignSelf: "end" }}
        color="purple"
        content="Save"
        labelPosition="right"
        icon="checkmark"
        type="submit"
      />
    </Form>
  );
}

export default EditSongForm;
