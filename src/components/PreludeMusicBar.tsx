// @ts-nocheck
import { Container, Menu, Icon, Rail } from "semantic-ui-react";
import ReactJkMusicPlayer from "react-jinke-music-player";
import "react-jinke-music-player/assets/index.css";
import { useStoreActions, useStoreState } from "easy-peasy";

const PreludeMusicBar = () => {
  // @ts-ignore

  const currentQueue = useStoreState((state) => state.music.currentQueue)
//   const addAudioPlayerInstance = useStoreActions((state) => state.music.addAudioPlayerInstance)
  
  return (
    <ReactJkMusicPlayer
      audioLists={currentQueue}
      autoPlay={false}
      mode={"full"}
      showDownload={false}
      remember={true}
       
    />
  );
};

export default PreludeMusicBar;
