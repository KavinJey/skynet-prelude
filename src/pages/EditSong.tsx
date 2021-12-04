import { Button, Container, Segment } from "semantic-ui-react";
import { useHistory, useParams } from "react-router-dom";
import EditSongForm from "../components/EditSongForm";
import { useEffect } from "react";
import { useStoreState } from "../state/easy-peasy-typed";

const EditSong = () => {
  const { skylink } = useParams<{ skylink: string }>();
  const songTitle = useStoreState((state) => {
    return state.music.audioLibrary[
      Object.keys(state.music.audioLibrary)[
        Object.keys(state.music.audioLibrary).findIndex((songTitle) => {
          console.log(songTitle, skylink);
          return state.music.audioLibrary[songTitle].skylink.includes(skylink);
        })
      ]
    ];
  });

  const history = useHistory();

  useEffect(() => {
    console.log("this is handle", songTitle);
  }, [songTitle]);

  return (
    <Segment style={{ marginTop: "15%" }}>
      <Container>
        <Button
          color="purple"
          onClick={() => history.goBack()}
          content="Back"
          icon="left arrow"
          labelPosition="left"
        />

        {/* <EditSongForm pageMode title={songTitle[0]} /> */}
      </Container>
    </Segment>
  );
};

export default EditSong;
