import { Container, Menu, Icon, Rail, Image } from "semantic-ui-react";
import { NavLink, useLocation } from "react-router-dom";
import MySkyButton from "./MySkyButton";
import MessageDisplay from "./MessageDisplay";
import Logo from "../assets/logo.png";

const NavMenuItem = ({ title, route, currentRoute }) => {
  const active = currentRoute === `/${route}`;
  return (
    <Menu.Item as={active ? null : NavLink} to={route} active={active}>
      {title}
    </Menu.Item>
  );
};

const NavigationBar = () => {
  const location = useLocation();

  return (
    <Container>
      <Menu style={{ background: "#413d5c" }} fixed="top">
        <Container>
          <Menu.Item header>
            <Image src={Logo} width="150" style={{ marginRight: "2em" }} />
            Music Player
          </Menu.Item>
          <NavMenuItem
            title="Home"
            route="home"
            currentRoute={location.pathname}
          />
          <NavMenuItem
            title="My Library"
            route="library"
            currentRoute={location.pathname}
          />
          <NavMenuItem
            title="Playlists"
            route="playlists"
            currentRoute={location.pathname}
          />
          {/* <NavMenuItem
            title="Search"
            route="search"
            currentRoute={location.pathname}
          /> */}
          <NavMenuItem
            title="Profile"
            route="profile"
            currentRoute={location.pathname}
          />
          <Menu.Menu position="right">
            <Menu.Item>
              <MySkyButton />
            </Menu.Item>
            <Menu.Item>
              <Image
                as="a"
                src="https://img.shields.io/badge/Skynet-Add%20To%20Homescreen-00c65e?logo=skynet&labelColor=0d0d0d"
                href="https://homescreen.hns.siasky.net/#/skylink/AQDRh7aTcPoRFWp6zbsMEA1an7iZx22DBhV_LVbyPPwzzA"
              />
            </Menu.Item>
          </Menu.Menu>
        </Container>
        <MessageDisplay />
      </Menu>
    </Container>
  );
};

export default NavigationBar;
