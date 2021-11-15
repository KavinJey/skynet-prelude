//  @ts-nocheck
// TODO: make typesafe
import { Input, Button, Form } from "semantic-ui-react";
import { useState } from "react";
import { useStoreActions } from "easy-peasy";

function TodoForm() {
  const addTodo = useStoreActions((actions) => actions.todos.addTodo);
  const [value, setValue] = useState("");
  return (
    <>
      <Input
        placeholder="Todo item..."
        onChange={(e) => setValue(e.target.value)}
        value={value}
      />
      <Button
        onClick={() => addTodo({ text: value, done: false })}
        style={{ marginLeft: "10px" }}
      >
        Add Todo
      </Button>
    </>
  );
}

export default TodoForm;

function EditSongForm({songTitle, songArtist, cover, srcLink, browserUrl}) {
  const addSongDetails = useStoreActions(
    (actions) => actions.music.addAudioFileDetails
  );

  const [localSongTitle, setSongTitle] = useState(songTitle)

  const [localCover, setCover] = useState(cover)
  const [localArtist, setSongArtist] = useState(songArtist)

  return (
    <Form>
      <Form.Group inline>
        <Form.Field>
          <label> Song Title</label>
          <Input  onChange={(e) => setSongTitle(e.target.value)} placeholder="Darude Sandstorm" />
        </Form.Field>
        <Form.Field>
          <label> Artist </label>
          <Input  onChange={(e) => setSongArtist(e.target.value)} placeholder="Queen" />
        </Form.Field>

        <Form.Field>
          <label> Cover </label>
          <Input  onChange={(e) => setCover(e.target.value)} placeholder="valid browser link" />
        </Form.Field>
      </Form.Group> 
      <Button onClick={() => addSongDetails({
          songName: localSongTitle,
          songArtist: localArtist,
          cover: localCover,
          srcLink: srcLink,
          browserUrl: browserUrl
      })}>Submit</Button>
    </Form>
  );
}

// export default EditSongForm;