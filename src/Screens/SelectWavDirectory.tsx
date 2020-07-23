import React from "react";
import Container from "@material-ui/core/Container";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import FolderOpenIcon from "@material-ui/icons/FolderOpen";
import Button from "@material-ui/core/Button";

interface Props {
  onClickSelectDir: () => void;
  onBeginExperiment: () => void;
  wavDirectory: string;
}

const SelectWavDirectory: React.FC<Props> = ({
  onClickSelectDir,
  onBeginExperiment,
  wavDirectory,
}) => {
  return (
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
  );
};

export default SelectWavDirectory;
