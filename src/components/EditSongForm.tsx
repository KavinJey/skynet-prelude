//  @ts-nocheck
// TODO: make typesafe
import { Input, Button, Form, Segment, Label, List } from "semantic-ui-react";
import { useState, useRef, useEffect } from "react";
import { useStoreState, useStoreActions } from "../state/easy-peasy-typed";
import clipboard from "clipboardy";

function EditSongForm({ title }: { title: string }) {
  const addSongDetails = useStoreActions(
    (actions) => actions.music.addAudioFileDetails
  );

  const editSong = useStoreState((state) => state.music.audioLibrary[title]);
  const [localSongTitle, setSongTitle] = useState(editSong.title || "");
  const [localCover, setCover] = useState(editSong?.cover || "");
  const [localArtist, setSongArtist] = useState(editSong?.artist || "");

  const addMessage = useStoreActions((actions) => actions.ui.addMessage);

  return (
    <Segment>
      <Form
        onSubmit={() => {
          // addSongDetails({
          //   ...audioFile,
          //   songName: localSongTitle,
          //   songArtist: localArtist,
          //   cover: localCover,
          // });
          // modalToggle(false);
        }}
      >
        <Form.Group>
          <Form.Field>
            <label>Song Title</label>
            <Input
              onChange={(e) => setSongTitle(e.target.value)}
              placeholder={editSong.title}
              value={localSongTitle}
            />
          </Form.Field>

          <Form.Field>
            <label>Artist</label>
            <Input
              onChange={(e) => setSongArtist(e.target.value)}
              placeholder={editSong.artist}
              value={localArtist}
            />
          </Form.Field>

          <Form.Field>
            <label>Cover</label>
            <Input
              type="file"
              onChange={(e) => setCover(e.target.value)}
              placeholder={editSong.cover}
              value={localCover}
            />
          </Form.Field>
          <Form.Field>
            <Input
              action={{
                color: "purple",
                labelPosition: "right",
                icon: "copy",
                content: "SkyLink (copy)",
                onclick: async (e) => {
                  await clipboard.write(editSong.skyLink);
                  addMessage({ message: "Skylink copied to clipboard!" });
                },
              }}
              defaultValue={editSong.skylink}
            />
          </Form.Field>

          <Button
            style={{ alignSelf: "end" }}
            color="purple"
            content="Save"
            labelPosition="right"
            icon="checkmark"
            type="submit"
          />
        </Form.Group>

        <List horizontal selection>
          <List.Item>
            <Label horizontal color="purple">
              SkyLink (click to copy)
            </Label>

            {/* <CopyToClipboard
              onCopy={() =>
                addMessage({ message: "Skylink copied to clipboard!" })
              }
              text={editSong.skylink}
            >
              <span> {editSong.skylink}</span>
            </CopyToClipboard> */}
          </List.Item>

          <List.Item>
            <Label horizontal color="purple">
              Browser Link
            </Label>
          </List.Item>
        </List>
      </Form>
    </Segment>
  );
}

export default EditSongForm;
