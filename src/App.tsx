import { Container, Header, Rail } from "semantic-ui-react";
import NavigationBar from "./components/NavigationBar";
import MessageDisplay from "./components/MessageDisplay";
import {
  Home,
  Playlists,
  Upload,
  Library,
  RecentlyPlayed,
  Search,
  Profile,
} from "./pages";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { SkynetProvider } from "./state/SkynetContext";
import { StoreProvider } from "easy-peasy";
import { store } from "./state/store";
import Todo from "./pages/Todo";

const App = () => {
  return (
    <SkynetProvider>
      <StoreProvider store={store}>
        <Router>
          <NavigationBar />
          <Container>
            <MessageDisplay />
            <Switch>
              <Route path="/playlists">
                <Playlists />
              </Route>
              <Route path="/upload">
                <Upload />
              </Route>
              <Route path="/library">
                <Library />
              </Route>
              <Route path="/recently-played">
                <RecentlyPlayed />
              </Route>
              <Route path="/search">
                <Search />
              </Route>
              <Route path="/profile">
                <Profile />
              </Route>

              <Route path="/todo">
                <Todo />
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </Container>
        </Router>
      </StoreProvider>
    </SkynetProvider>
  );
};

export default App;
