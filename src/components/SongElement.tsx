import { useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { List, Container, Placeholder, Segment, Menu, Icon, Image } from "semantic-ui-react";
import { ISongModel } from "../state/musicPlayerModel";

const NavMenuItem = ({ title, route, currentRoute }) => {
  const active = currentRoute === `/${route}`;
  return (
    <Menu.Item as={active ? null : NavLink} to={route} active={active}>
      {title}
    </Menu.Item>
  );
};

const SongElement: React.FC<{ song: ISongModel }> = ({ song }) => {

  const location = useLocation();

  useEffect(( ) => {
      console.log('this is props ', song)
  }, [song])

    return (
        <List.Item>
            <List.Content>
              <List.Header as="a">
                <Container style={{ display: "flex" }}>
                  {song?.cover ? (
                    <Image
                      style={{ marginRight: "2em" }}
                      src={song.cover}
                    />
                  ) : (
                    <Placeholder
                      style={{ height: 75, width: 75, marginRight: "2em" }}
                    >
                      <Placeholder.Image />
                      No Image
                    </Placeholder>
                  )}
                  <h5 style={{ marginRight: "2em" }}>
                    Name: {song.title}{" "}
                  </h5>
                  <h5>Artist: {song.artist} </h5>
                </Container>
              </List.Header>
              <List.Description>
                <a href={song.skylink}> Sia Link {song.skylink}</a>{" "}
                <br /> <br />
                <a href={song.src as string}> Portal URL </a>
                <Segment>
                  <Menu icon="labeled">
                    <Menu.Item
                      name="Play Song"
                    >
                      {/* {isPlaying ? (
                        <Icon name="pause circle" />
                      ) : (
                        <Icon name="play circle" />
                      )} */}
                    </Menu.Item>
                    <Menu.Item
                      name="Edit Song"
                    >
                    </Menu.Item>{" "}
                    <NavMenuItem
                      currentRoute={location.pathname}
                      route={`/edit-song/${song.skylink.split("sia://")[1]}/`}
                      title="edit"
                    /> <Menu.Item
                      name="Delete"
                    >
                      <Icon name="delete" />
                    </Menu.Item>
                    <Menu.Item
                      name="Add"
                    >
                      <Icon name="add" />
                    </Menu.Item>
                  </Menu>
                </Segment>
              </List.Description>
            </List.Content>
          </List.Item>
    )

}

export default SongElement