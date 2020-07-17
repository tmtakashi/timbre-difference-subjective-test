import React from 'react';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Slider from '@material-ui/core/Slider';

interface Props {
  aFileName: string;
  bFileName: string;
  onClickPlayButton: (selection: 'A' | 'B') => void;
  onSliderChange: (event: any, newValue: any) => void
}

const PlayerSlider: React.FC<Props> = ({ aFileName, bFileName, onClickPlayButton, onSliderChange }) => {
  return (
  <Grid
    style={{textAlign: 'center'}}
    alignItems="center"
    justify="center"
    container
  >
    <Grid
      item
      xs={2}>
        <p>A</p>
        <Button
          onClick={() => onClickPlayButton('A')}
          variant="contained"
          color="primary"
          endIcon={<PlayCircleFilledIcon />}
        >
          Play
        </Button>
      <audio id="A" src={aFileName}></audio>
    </Grid>
    <Grid
      item
      xs={6}>
      <Slider
        defaultValue={5}
        onChange={onSliderChange}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        step={1}
        marks
        min={0}
        max={10}
      />
    </Grid>
    <Grid
      item
      xs={2}>
      <p>B</p>
      <Button
        onClick={() => onClickPlayButton('B')}
        variant="contained"
        color="primary"
        endIcon={<PlayCircleFilledIcon />}
      >
        Play
      </Button>
      <audio id="B" src={bFileName}></audio>
    </Grid>
  </Grid>
  )
}

export default PlayerSlider;
