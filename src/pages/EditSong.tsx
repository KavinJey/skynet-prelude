import { Button, Container, Segment } from "semantic-ui-react";
import { useParams } from "react-router-dom";
import EditSongForm from "../components/EditSongForm";
import { useEffect } from "react";

const EditSong = () => {
  const { title } = useParams<{ title: string }>();

  useEffect(() => {
    console.log("this is handle", title);
  }, []);
  return (
    <Segment style={{ marginTop: "15%" }}>
      <Container>
              <Button content='Next' icon='right arrow' labelPosition='right' />

        <EditSongForm pageMode title={title} />
      </Container>
    </Segment>
  );
};

export default EditSong;
