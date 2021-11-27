import { useContext, useState, useEffect } from "react";
import { Header, Container } from "semantic-ui-react";
import { SkynetContext } from "../state/SkynetContext";
import { useStoreState } from "../state/easy-peasy-typed";

const Profile = () => {
  const { userProfile } = useContext(SkynetContext);
  const { userID } = useStoreState((store) => store.mySky);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    console.log("start userprofile");
    userProfile.getProfile(userID).then((profile) => {
      setProfile(profile);

      console.log(profile);
      console.log("end userprofile");
    });

    userProfile.getPreferences(userID, { skapp: "prelude" }).then((prefs) => {
      console.log("prefs:", prefs);
    });

    // userProfile
    //   .setProfile({
    //     version: 1,
    //     username: 'dghelm',
    //     aboutMe: 'Developer Evangelist | Skynet Labs',
    //     location: 'OKC, OK, USA',
    //   })
    //   .then(() => {
    //     console.log('profileSet');
    //   });
  }, [userID, userProfile]);

  return (
    <>
      <Container text style={{ marginTop: "7em" }}>
        <Header as="h2">Profile</Header>
        <Header as="h3">getProfile</Header>
      </Container>
    </>
  );
};

export default Profile;
