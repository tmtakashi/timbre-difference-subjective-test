import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { ipcRenderer } = require("electron");

interface Props {
  participant: string;
  setParticipant: React.Dispatch<React.SetStateAction<string>>;
  dataPath: string;
  setDataPath: React.Dispatch<React.SetStateAction<string>>;
}

const Home: React.FC<Props> = ({
  participant,
  setParticipant,
  dataPath,
  setDataPath,
}) => {
  const history = useHistory();
  const [isPathSelected, setIsPathSelected] = useState(false);
  const handleOnClickNext = async () => {
    const { goNext, dataFilePath } = await ipcRenderer.invoke(
      "request-save-file",
      {
        participant,
        dataPath,
      }
    );
    if (goNext) {
      setDataPath(dataFilePath);
      history.push("/production", { participant });
      return;
    }
    return;
  };

  const handleOnClickSelectPath = async () => {
    const path = await ipcRenderer
      .invoke("request-select-save-dir")
      .catch((err: Error) => {
        console.log(err);
        return;
      });
    setDataPath(path);
    setIsPathSelected(true);
  };

  return (
    <>
      <div
        style={{
          textAlign: "center",
          marginTop: "100px",
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
        <Button
          disabled={!participant}
          onClick={handleOnClickSelectPath}
          variant="outlined"
        >
          Select result file path
        </Button>
        <br></br>
        {Boolean(dataPath) && dataPath}
        <br></br>
        <Button
          disabled={!isPathSelected}
          onClick={handleOnClickNext}
          variant="contained"
        >
          Start experiment
        </Button>
      </div>
    </>
  );
};

export default Home;
