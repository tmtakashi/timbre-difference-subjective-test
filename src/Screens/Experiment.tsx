import React, { useState } from "react";
import PlayerSlider from "../components/PlayerSlider";
import Container from "@material-ui/core/Container";
import getCombinations from "../utils/getCombinations";
import shuffle from "../utils/shuffle";
import SelectWavDirectory from "./SelectWavDirectory";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { ipcRenderer } = require("electron");

interface Props {
  dataPath: string;
  isMainExperiment: boolean;
}

const Experiment: React.FC<Props> = ({ dataPath, isMainExperiment }) => {
  const [filesSet, setFilesSet] = useState(false);
  const [wavDirectory, setWavDirectory] = useState("");
  const [combinations, setCombinations] = useState([[]] as string[][]);
  const [numWavCombination, setNumCombination] = useState(0);
  const [value, setValue] = useState(5);
  const [counter, setCounter] = useState(1);

  const onClickSelectDir = () => {
    ipcRenderer.send("request-wav-list");
    ipcRenderer.on("wav-list-reply", (event: any, arg: any) => {
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
        <SelectWavDirectory
          onClickSelectDir={onClickSelectDir}
          onBeginExperiment={onBeginExperiment}
          wavDirectory={wavDirectory}
        />
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
              isMainExperiment={isMainExperiment}
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

export default Experiment;
