import React, { useState, useEffect } from "react";
import PlayerSlider from "../components/PlayerSlider";
import Container from "@material-ui/core/Container";
import getCombinations from "../utils/getCombinations";
import shuffle from "../utils/shuffle";
const { ipcRenderer } = require("electron");

interface Props {
  dataPath: string;
}

const Production: React.FC<Props> = ({ dataPath }) => {
  const [filesSet, setFilesSet] = useState(false);
  const [combinations, setCombinations] = useState([[]] as string[][]);
  const [numWavCombination, setNumCombination] = useState(0);
  const [value, setValue] = useState(5);
  const [counter, setCounter] = useState(1);
  useEffect(() => {
    ipcRenderer.send("request-production-wav-list");
    ipcRenderer.on("production-wav-list-reply", (event: any, arg: any) => {
      const cmb = shuffle(getCombinations(arg));
      setCombinations(cmb);
      setNumCombination(cmb.length);
      setFilesSet(true);
    });
  }, []);

  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
  };

  return (
    <>
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
