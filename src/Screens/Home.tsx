import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import FolderOpenIcon from "@material-ui/icons/FolderOpen";
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

  // for returning after ending
  useEffect(() => {
    setParticipant("");
    setDataPath("");
    setIsPathSelected(false);
  }, []);

  const handleOnClickStartMain = async () => {
    const { goNext, dataFilePath } = await ipcRenderer.invoke(
      "request-save-file",
      {
        participant,
        dataPath,
      }
    );
    if (goNext) {
      setDataPath(dataFilePath);
      history.push("/main", { participant });
      return;
    }
    return;
  };

  const handleOnClickStartPractice = async () => {
    history.push("/practice", { participant });
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
          marginTop: "80px",
        }}
      >
        <h2>Enter participant&apos;s name</h2>
        <TextField
          style={{ marginTop: "50px" }}
          onChange={(e) => setParticipant(e.target.value)}
          label="Participant"
          variant="outlined"
        />
      </div>
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <Button
          style={{ marginBottom: "50px" }}
          startIcon={<FolderOpenIcon />}
          disabled={!participant}
          onClick={handleOnClickSelectPath}
          variant="outlined"
        >
          Select result file path
        </Button>
        <div style={{ height: "50px" }}>{Boolean(dataPath) && dataPath}</div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            width: "60%",
            margin: "0 auto",
          }}
        >
          <Button
            color="primary"
            disabled={!(isPathSelected && participant)}
            onClick={handleOnClickStartMain}
            variant="contained"
          >
            Start main experiment
          </Button>
          <Button
            color="secondary"
            onClick={handleOnClickStartPractice}
            variant="contained"
          >
            Start practice experiment
          </Button>
        </div>
      </div>
    </>
  );
};

export default Home;
