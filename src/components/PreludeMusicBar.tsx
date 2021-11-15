// @ts-nocheck
import { Container, Menu, Icon, Rail } from "semantic-ui-react";
import ReactJkMusicPlayer from "react-jinke-music-player";
import "react-jinke-music-player/assets/index.css";
import { useStoreActions, useStoreState } from "easy-peasy";
import { useState, useEffect } from "react";

const PreludeMusicBar = ({ currentQueue }: { currentQueue: Array<any> }) => {
  // @ts-ignore

  const addAudioPlayerInstance = useStoreActions(
    (state) => state.music.addAudioPlayerInstance
  );

  const setPlaying = useStoreActions((state) => state.music.setPlaying);

  useEffect(() => {}, [currentQueue]);

  return (
    <ReactJkMusicPlayer
      audioLists={currentQueue}
      autoPlay={true}
      mode={"full"}
      showDownload={false}
      spaceBar={true}
      onAudioPlay={(audio) => {
        setPlaying({ playing: !audio.paused });
      }}
      getAudioInstance={(instance) => {
        addAudioPlayerInstance({ audioPlayerInstance: instance });
      }}
    />
  );
};

export default PreludeMusicBar;
