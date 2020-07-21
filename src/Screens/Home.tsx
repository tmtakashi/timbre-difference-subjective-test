import React from "react";
import { useHistory } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { ipcRenderer } = require("electron");

interface Props {
  participant: string;
  setParticipant: React.Dispatch<React.SetStateAction<string>>;
  setDataPath: React.Dispatch<React.SetStateAction<string>>;
}

const Home: React.FC<Props> = ({
  participant,
  setParticipant,
  setDataPath,
}) => {
  const history = useHistory();
  const handleOnClickNext = () => {
    ipcRenderer.send("request-save-file", participant);
    ipcRenderer.on("save-file-reply", (event: any, arg: any) => {
      if (arg.goNext) {
        setDataPath(arg.path);
        history.push("/production", { participant });
        return;
      }
      return;
    });
  };

  const handleOnClickSelectPath = () => {};

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "200px",
        }}
      >
        <h2>Enter participant&apos;s name</h2>
        <TextField
          onChange={(e) => setParticipant(e.target.value)}
          label="Participant"
          variant="outlined"
        />
      </div>
      <div style={{ textAlign: "center", marginTop: "120px" }}>
        <Button onClick={} variant="outlined">
          Select result file path
        </Button>
        <Button onClick={handleOnClickNext} variant="contained">
          Start experiment
        </Button>
      </div>
    </>
  );
};

export default Home;
