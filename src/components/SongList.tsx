//  @ts-nocheck
// TODO: make typesafe
import { Checkbox, List, Button, Loader } from "semantic-ui-react";
import { useStoreState, useStoreActions } from "easy-peasy";
import ReactJkMusicPlayer from "react-jinke-music-player";
import "react-jinke-music-player/assets/index.css";

const SongList = () => {
  const audioFiles = useStoreState((state) => state.music.audioFileItems);
  const { updateAudioFile, deleteAudioFile, playSong } = useStoreActions(
    (actions) => actions.music
  );
  const currentQueue = useStoreState((state) => state.music.currentQueue)
  const addAudioPlayerInstance = useStoreActions((state) => state.music.addAudioPlayerInstance)
//   const { client } = useContext

//   useEffect(() => {
//     // if we have MySky loaded
//     setLoading(true);
//     if (mySky) {
      
//     }
//   }, [mySky]);


  return (
      <>
    <List divided relaxed>
      {audioFiles.map((audioFile, i) => (
        <List.Item key={i}>
          <List.Content>
            <List.Header as="a">
              Link: {audioFile.srcLink || "YEOOOOOO"}
            </List.Header>
            <List.Description>
              Last seen watching{" "}
              <a>
                <b>Arrested Development</b>
              </a>{" "}
              just now.
            </List.Description>
          </List.Content>
          <Button
            compact
            basic
            color="Play"
            icon="play"
            floated="right"
            onClick={(e, elem) => {
              playSong({
                name: "new song",
                singer: "me",
                musicSrc: audioFile.browserUrl,
                cover:
                  "https://siasky.net/OADDYlbpBCusBIF8TdxUV99r48ZM6qRy_MTwfQ1DJA85mQ",
              });
            }}
          />
        </List.Item>
      ))}
    </List>
    <ReactJkMusicPlayer
      audioLists={currentQueue}
      autoPlay={false}
      mode={"full"}
      showDownload={false}
      remember={true}
       getAudioInstance={(instance) => {
                addAudioPlayerInstance({audioPlayerInstance: instance})
          }}
    />
    </>
  );
};

export default SongList;
