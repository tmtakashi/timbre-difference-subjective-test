import React, { useRef, useEffect, useState } from "react";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Slider from "@material-ui/core/Slider";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { ipcRenderer } = require("electron");

interface Props {
  counter: number;
  setCounter: React.Dispatch<React.SetStateAction<number>>;
  aFileName: string;
  bFileName: string;
  value: number;
  setValue: React.Dispatch<React.SetStateAction<number>>;
  dataPath: string;
  onSliderChange: (event: any, newValue: any) => void;
}

interface IsPlayed {
  [key: string]: boolean;
}

const PlayerSlider: React.FC<Props> = ({
  counter,
  setCounter,
  aFileName,
  bFileName,
  value,
  setValue,
  dataPath,
  onSliderChange,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPlayed, setIsPlayed] = useState<IsPlayed>({ A: false, B: false });
  const [isBothPlayed, setIsBothPlayed] = useState(false);
  const sliderRef = useRef<HTMLSpanElement>(null);
  const refA = useRef<HTMLAudioElement>(null);
  const refB = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const nodeA = refA.current;
    const nodeB = refB.current;
    const onEndedA = () => {
      setIsPlaying(false);
      if (!isPlayed.A) {
        setIsPlayed({ ...isPlayed, A: true });
      }
    };
    const onEndedB = () => {
      setIsPlaying(false);
      if (!isPlayed.B) {
        setIsPlayed({ ...isPlayed, B: true });
      }
    };
    if (nodeA && nodeB) {
      nodeA.addEventListener("ended", onEndedA);
      nodeB.addEventListener("ended", onEndedB);
      return () => {
        nodeA.removeEventListener("ended", onEndedA);
        nodeB.removeEventListener("ended", onEndedB);
      };
    }
  }, [refA, refB, isPlayed, setIsPlayed]);

  useEffect(() => {
    console.log(isPlayed);
    const bothPlayed = isPlayed.A && isPlayed.B;
    if (bothPlayed) {
      console.log("foo");
      setIsBothPlayed(true);
    }
  }, [isPlayed, setIsBothPlayed]);

  const playAudio = (selection: "A" | "B") => {
    const nodeA = refA.current;
    const nodeB = refB.current;
    if (nodeA && nodeB) {
      switch (selection) {
        case "A":
          nodeA.load();
          nodeA.play();
          break;
        case "B":
          nodeB.load();
          nodeB.play();
          break;
        default:
          break;
      }
      setIsPlaying(true);
    }
  };

  const onClickNext = () => {
    const nodeA = refA.current;
    const nodeB = refB.current;
    if (nodeA && nodeB) {
      nodeA.pause();
      nodeB.pause();
    }
    ipcRenderer.send("write-value-to-file", {
      dataPath,
      counter,
      value,
      aFileName,
      bFileName,
    });
    setCounter(counter + 1);
    setIsPlaying(false);
    setValue(5);
    setIsPlayed({ A: false, B: false });
    setIsBothPlayed(false);
  };

  return (
    <>
      <Grid
        style={{ textAlign: "center" }}
        alignItems="center"
        justify="center"
        container
      >
        <Grid item xs={2}>
          <p>A</p>
          <Button
            onClick={() => playAudio("A")}
            disabled={isPlaying}
            variant="contained"
            color="primary"
            endIcon={<PlayCircleFilledIcon />}
          >
            Play
          </Button>
          <audio ref={refA} id="A" src={aFileName}></audio>
        </Grid>
        <Grid item xs={6}>
          <Slider
            defaultValue={5}
            ref={sliderRef}
            onChange={onSliderChange}
            value={value}
            aria-labelledby="discrete-slider"
            valueLabelDisplay="auto"
            step={1}
            marks
            min={0}
            max={10}
          />
        </Grid>
        <Grid item xs={2}>
          <p>B</p>
          <Button
            onClick={() => playAudio("B")}
            disabled={isPlaying}
            variant="contained"
            color="primary"
            endIcon={<PlayCircleFilledIcon />}
          >
            Play
          </Button>
          <audio ref={refB} id="B" src={bFileName}></audio>
        </Grid>
      </Grid>
      <div style={{ textAlign: "center", marginTop: "150px" }}>
        <Button
          disabled={!isBothPlayed}
          onClick={onClickNext}
          size="large"
          variant="contained"
          color="secondary"
          endIcon={<NavigateNextIcon />}
        >
          Next
        </Button>
      </div>
    </>
  );
};

export default PlayerSlider;
