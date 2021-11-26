// @ts-nocheck
import { Container, Menu, Icon, Rail } from "semantic-ui-react";
import { useStoreActions, useStoreState } from "easy-peasy";
import { useState, useEffect } from "react";

const PreludeMusicBar = ({ currentQueue }: { currentQueue: Array<any> }) => {
  const { loggedIn } = useStoreState((state) => state.mySky);
  const { mySky, player } = useContext(SkynetContext);
  const { fetchMusicDirectory } = useStoreActions((state) => state.mySky);

  useEffect(() => {
    // if we have MySky loaded
    setLoading(true);
    if (mySky) {
      mySky.checkLogin().then((result) => {
        if (result) {
          fetchMusicDirectory({ mySky, player });
        }
        setLoading(false);
      });
    }
  }, [mySky]);

  useEffect(() => {}, [currentQueue]);

  return (
    <div>
      <h1> Oh shit </h1>
    </div>
  );
};

export default PreludeMusicBar;
