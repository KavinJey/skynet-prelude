import { Input, Button, Form, Segment, Image } from "semantic-ui-react";
import { useEffect, useState } from "react";
import { useStoreState, useStoreActions } from "../state/easy-peasy-typed";

import copy from "copy-text-to-clipboard";

function EditSongForm({ title }: { title: string }) {
  const editSong = useStoreState((state) => state.music.audioLibrary[title]);
  const [localSongTitle, setSongTitle] = useState(editSong.title || "");
  const [localCover, setCover] = useState<File>();
  const [localArtist, setSongArtist] = useState(editSong?.artist || "");

  const [preview, setPreview] = useState(editSong?.cover || "");

  const addMessage = useStoreActions((actions) => actions.ui.addMessage);

  useEffect(() => {
    if (!localCover) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(localCover);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [localCover]);

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

            {preview && (
              <Image src={preview} size="medium" alt="album cover image" />
            )}
            <Input
              type="file"
              onChange={(e) => {
                if (!e.target.files || e.target.files.length === 0) {
                  setCover(undefined);
                  return;
                }

                // I've kept this example simple by using the first image instead of multiple
                setCover(e.target.files[0]);
                console.log("this is the image", e.target.files[0]);
              }}
            />
          </Form.Field>
        </Form.Group>
        <Form.Group>
          <Form.Field>
            <Input
              action={{
                color: "purple",
                labelPosition: "right",
                icon: "copy",
                content: "Skylink",
                onClick: async (e) => {
                  await copy(editSong.skylink);
                  addMessage({ message: "Skylink copied to clipboard!" });
                },
              }}
              defaultValue={editSong.skylink}
            />
          </Form.Field>

          <Form.Field>
            <Input
              action={{
                color: "purple",
                labelPosition: "right",
                icon: "copy",
                content: "Browser Link",
                onClick: async (e) => {
                  // src could be string array bc type is from kokoro player
                  copy(editSong.src as string);
                  addMessage({ message: "Browser link copied to clipboard!" });
                },
              }}
              defaultValue={editSong.src}
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
      </Form>
    </Segment>
  );
}

export default EditSongForm;
