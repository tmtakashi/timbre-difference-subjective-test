import React, { useState } from "react";
import PlayerSlider from "../components/PlayerSlider";
import Container from "@material-ui/core/Container";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import FolderOpenIcon from "@material-ui/icons/FolderOpen";
import Button from "@material-ui/core/Button";
import getCombinations from "../utils/getCombinations";
import shuffle from "../utils/shuffle";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { ipcRenderer } = require("electron");

interface Props {
  dataPath: string;
}

const Production: React.FC<Props> = ({ dataPath }) => {
  const [filesSet, setFilesSet] = useState(false);
  const [wavDirectory, setWavDirectory] = useState("");
  const [combinations, setCombinations] = useState([[]] as string[][]);
  const [numWavCombination, setNumCombination] = useState(0);
  const [value, setValue] = useState(5);
  const [counter, setCounter] = useState(1);

  const onClickSelectDir = () => {
    ipcRenderer.send("request-production-wav-list");
    ipcRenderer.on("production-wav-list-reply", (event: any, arg: any) => {
      const cmb = shuffle(getCombinations(arg));
      setWavDirectory(arg);
      setCombinations(cmb);
      setNumCombination(cmb.length);
    });
  };

  const onBeginExperiment = () => {
    setFilesSet(true);
  };

  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
  };

  return (
    <>
      {!filesSet && (
        <Container>
          <div
            style={{
              textAlign: "center",
              marginTop: "200px",
            }}
          >
            <Button
              style={{ marginBottom: "50px" }}
              onClick={onClickSelectDir}
              variant="contained"
              startIcon={<FolderOpenIcon />}
            >
              Select sound file directory
            </Button>
            {wavDirectory && <div>{wavDirectory.length} wav files loaded.</div>}
            <br></br>
            <Button
              variant="contained"
              onClick={onBeginExperiment}
              endIcon={<NavigateNextIcon />}
            >
              Begin Experiment
            </Button>
          </div>
        </Container>
      )}
      {filesSet && (
        <>
          <Container>
            <div
              style={{
                textAlign: "center",
                marginTop: "50px",
                marginBottom: "70px",
                fontSize: "30px",
              }}
            >
              <p>
                No. {counter} / {numWavCombination}
              </p>
              You are selecting{" "}
              <span style={{ fontWeight: "bold" }}>{value}</span>
            </div>
            <PlayerSlider
              counter={counter}
              setCounter={setCounter}
              numWavCombination={numWavCombination}
              aFileName={combinations[counter - 1][0]}
              bFileName={combinations[counter - 1][1]}
              onSliderChange={handleChange}
              setValue={setValue}
              value={value}
              dataPath={dataPath}
            />
          </Container>
        </>
      )}
    </>
  );
};

export default Production;
