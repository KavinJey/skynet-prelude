import { NavLink } from "react-router-dom";
import {
  Header,
  Container,
  Button,
  Icon,
  Segment,
  Image,
} from "semantic-ui-react";
import Logo from "../assets/logo.png";

const HomepageHeading = ({ mobile }) => (
  <Container text style={{ paddingBottom: "3em" }}>
    <Header
      as="h1"
      content="You're an artist and need a space to keep your WIP tunes."
      inverted
      style={{
        fontSize: mobile ? "2em" : "4em",
        fontWeight: "normal",
        marginBottom: 0,
        marginTop: mobile ? "1.5em" : "3em",
      }}
    />
    <Header
      as="h2"
      content="Introducing"
      inverted
      style={{
        fontSize: mobile ? "1.5em" : "1.7em",
        fontWeight: "normal",
        marginTop: mobile ? "0.5em" : "1.5em",
        marginBottom: mobile ? "0.5em" : "1.5em",
      }}
    />

    <Image src={Logo} width="65%" style={{ margin: "0 auto" }} />

    <p style={{ fontSize: mobile ? "1.2em" : "1.4em", marginTop: "2em" }}>
      A web app to manage, share and collaborate on tracks without stress
    </p>
    <Button color="purple" size="huge" as={NavLink} to="library">
      Get Started
      {/* @ts-ignore */}
      <Icon name="right arrow" />
    </Button>
  </Container>
);

const Home = () => {
  return (
    <Segment
      inverted
      color="pink"
      textAlign="center"
      style={{ minHeight: 700, paddingBottom: "1em" }}
      vertical
    >
      {/* @ts-ignore */}
      <HomepageHeading />
      {/* // <Container text>
    //   <Header>Home</Header>
    // </Container> */}
    </Segment>
  );
};

export default Home;
