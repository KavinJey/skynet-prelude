import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  List,
  Container,
  Placeholder,
  Image,
  Button,
  Modal,
  Header,
  Icon,
  Label,
} from "semantic-ui-react";
import { useStoreActions } from "../state/easy-peasy-typed";
import { ISongModel } from "../state/types";

const SongElement: React.FC<{ song: ISongModel }> = ({ song }) => {
  const [deleteSongConfirm, setDeleteSongConfirm] = useState(false);
  const title = `${song?.title}.${song?.ext}`;
  const deleteSong = useStoreActions(
    (actions) => actions.music.deleteAudioFile
  );

  const playSong = useStoreActions(
      (actions) => actions.music.playSong
  )

  useEffect(() => {
    console.log("this is props ", song);
  }, [song]);

  return (
    <List.Item>
      <Container
        fluid
        style={{
          float: "left",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex" }}>
          {song?.cover ? (
            <Image
              size="tiny"
              src={song.cover}
              style={{
                height: 50,
                width: 50,
                flexBasis: "4em",
                marginRight: "1em",
              }}
            />
          ) : (
            <Placeholder
              style={{
                height: 50,
                width: 50,
                flexBasis: "4em",
                marginRight: "1em",
              }}
            >
              <Placeholder.Image />
              No Image
            </Placeholder>
          )}

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flexBasis: "12em",
              width: "12em",
              height: "100%",
            }}
          >
            <h3 style={{ color: song.title ? null : "grey" }}>
              {song.title || "(unknown title)"}{" "}
              <Label horizontal color="purple">
                {song.ext}
              </Label>
            </h3>
            <p style={{ color: song.artist ? null : "gray" }}>
              {song.artist || "(unknown artist)"}
            </p>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1em",
            alignItems: "flex-end",
          }}
        >
          <Button.Group>
            <Button color="purple" icon="play" onClick={() => playSong({song}) }/>
            <Button color="purple" icon="pause" />
            <Button color="purple" icon="add" />

            <Button
              color="purple"
              icon="edit"
              to={`/edit-song/${song.skylink.split("sia://")[1]}/`}
              as={NavLink}
            />

            <Button
              color="purple"
              icon="delete"
              onClick={() => setDeleteSongConfirm(true)}
            />
          </Button.Group>

          <Button
            color="purple"
            label="Encrypted File"
            labelPosition="left"
            icon="download"
            as="a"
            href={song.src}
          />
        </div>
      </Container>

      <Modal
        basic
        onClose={() => setDeleteSongConfirm(false)}
        onOpen={() => setDeleteSongConfirm(true)}
        open={deleteSongConfirm}
        size="small"
      >
        <Header icon>
          <Icon name="archive" />
          Delete Song?
        </Header>
        <Modal.Content>
          <p>
            Are you sure you'd like to delete this file from your Prelude music
            library ?
          </p>
        </Modal.Content>
        <Modal.Actions>
          <Button basic inverted onClick={() => setDeleteSongConfirm(false)}>
            <Icon name="cancel" /> No
          </Button>
          <Button
            color="red"
            inverted
            onClick={() => {
              setDeleteSongConfirm(false);
              console.log("this is a title", title);
              deleteSong({ title });
            }}
          >
            <Icon name="remove" /> Yes
          </Button>
        </Modal.Actions>
      </Modal>
    </List.Item>
  );
};

export default SongElement;
