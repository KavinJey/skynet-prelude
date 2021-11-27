//  @ts-nocheck
// TODO: make typesafe
import { useEffect, useContext } from "react";
import { Button, Icon, Loader } from "semantic-ui-react";
import { useStoreState, useStoreActions } from "../state/easy-peasy-typed";
import { SkynetContext } from "../state/SkynetContext";

const MySkyButton = () => {
  const { mySky, player, fileSystem } = useContext(SkynetContext);
  // const [loggedIn, setLoggedIn] = useState(false); //This will get moved to global state.
  const loading = useStoreState((state) => state.music.loading);
  const setLoading = useStoreActions((actions) => actions.music.setLoading);
  const { fetchUserID, logout } = useStoreActions((state) => state.mySky);
  const { loggedIn } = useStoreState((state) => state.mySky);

  useEffect(() => {
    // if we have MySky loaded
    setLoading(true);
    if (mySky) {
      mySky.checkLogin().then((result) => {
        if (result) {
          fetchUserID({ mySky, player, fileSystem });
        }
        setLoading(false);
      });
    }
  }, [fetchUserID, fileSystem, mySky, player, setLoading]);

  const onLogin = () => {
    setLoading(true);
    mySky.requestLoginAccess().then((result) => {
      if (result) {
        fetchUserID({ mySky });
      }
      setLoading(false);
    });
  };

  const onLogout = () => {
    logout({ mySky });
  };

  return (
    <>
      {loading && (
        <Button color="green" size="medium">
          <Loader inverted active inline="centered" size="tiny" />
        </Button>
      )}
      {!loading && !loggedIn && (
        <Button onClick={onLogin} color="green" size="medium">
          <Icon name="user" /> MySky Log In
        </Button>
      )}
      {!loading && loggedIn && (
        <Button onClick={onLogout} color="green" size="medium">
          <Icon name="user" /> Log Out
        </Button>
      )}
    </>
  );
};

export default MySkyButton;
