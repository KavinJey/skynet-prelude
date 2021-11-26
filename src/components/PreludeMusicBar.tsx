// @ts-nocheck
import { Container, Menu, Icon, Rail } from "semantic-ui-react";
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
    <div>
      <h1> Oh shit </h1>
    </div>
  );
};

export default PreludeMusicBar;
