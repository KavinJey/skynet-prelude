import { NavLink } from "react-router-dom";
import { Header, Container, Button, Icon, Segment } from "semantic-ui-react";

const HomepageHeading = ({ mobile }) => (
  <Container text>
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
      content="Introducing Prelude - a web app to manage, share and collaborate on tracks without stress."
      inverted
      style={{
        fontSize: mobile ? "1.5em" : "1.7em",
        fontWeight: "normal",
        marginTop: mobile ? "0.5em" : "1.5em",
        marginBottom: mobile ? "0.5em" : "1.5em",
      }}
    />
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
      style={{ minHeight: 700, padding: "1em 0em" }}
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
