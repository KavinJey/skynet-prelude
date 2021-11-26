import { Container, Menu, Icon, Rail } from "semantic-ui-react";
import { useStoreActions, useStoreState } from "../state/easy-peasy-typed";
import { useContext, useEffect } from "react";
import { SkynetContext } from "../state/SkynetContext";

const PreludeMusicBar = ({ currentQueue }: { currentQueue: Array<any> }) => {
  const { loggedIn } = useStoreState((state) => state.mySky);
  const { mySky, player } = useContext(SkynetContext);
  const { fetchMusicDirectory } = useStoreActions((state) => state.mySky);

  useEffect(() => {
    // if we have MySky loaded
    if (mySky) {
      mySky.checkLogin().then((result) => {
        if (result) {
          fetchMusicDirectory({ mySky, player });
        }
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
