import React, { useState } from "react";
import { HashRouter, withRouter, Link, Route } from "react-router-dom";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/core/styles";

import Home from "./Screens/Home";
import Experiment from "./Screens/Experiment";
import End from "./Screens/End";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#757ce8",
      main: "#3f50b5",
      dark: "#002884",
      contrastText: "#fff",
    },
    secondary: {
      light: "#4aedc4",
      main: "#1de9b6",
      dark: "#14a37f",
      contrastText: "#333",
    },
  },
});

const Main = withRouter(({ location }) => {
  const [participant, setParticipant] = useState("");
  const [dataPath, setDataPath] = useState("");
  return (
    <div>
      <Route path="/">
        {location.pathname === "/" && (
          <Home
            participant={participant}
            setParticipant={setParticipant}
            dataPath={dataPath}
            setDataPath={setDataPath}
          />
        )}
      </Route>
      <Route path="/main">
        <Experiment isMainExperiment={true} dataPath={dataPath} />
      </Route>
      <Route path="/practice">
        <Experiment isMainExperiment={false} dataPath={dataPath} />
      </Route>
      <Route path="/end">
        <End />
      </Route>
    </div>
  );
});

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <HashRouter>
        <Main />
      </HashRouter>
    </ThemeProvider>
  );
};

export default App;
