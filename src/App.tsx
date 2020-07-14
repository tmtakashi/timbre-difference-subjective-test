import React, { useState, useEffect } from 'react';
import Container from '@material-ui/core/Container'
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Slider from '@material-ui/core/Slider';

const App: React.FC = () => {
  const [value, setValue] = useState(5)
  const [isPlaying, setIsPlaying] = useState(false);
  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
  };

  const playAudio = (selection: 'A' | 'B') => {
    switch (selection) {
      case 'A':
        (document.getElementById('A') as HTMLAudioElement).play()
        break;
      case 'B':
        (document.getElementById('B') as HTMLAudioElement).play()
      default:
        break;
    }
  }

  return (
    <div>
      <Container>
        <h1>Drag the slider</h1>
        <Grid
          spacing={0}
          alignItems="center"
          justify="center"
          container
        >
          <Grid
            item 
            xs={2}>
              <Button
                onClick={() => playAudio('A')}
                variant="contained"
                color="primary"
                endIcon={<PlayCircleFilledIcon />}
              >
                Play
              </Button>
            <audio id="A" src="../public/conv_i.wav"></audio>
          </Grid>
          <Grid
            item
            xs={8}>
            <Slider
              defaultValue={5}
              onChange={handleChange}
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
            xs={2}
          >
            <Button
              onClick={() => playAudio('B')}
              variant="contained"
              color="primary"
              endIcon={<PlayCircleFilledIcon />}
            >
              Play
            </Button>
            <audio id="B" src="../public/conv_j.wav"></audio>
          </Grid>
        </Grid>
      </Container>
    </div>
  ) 
};

export default App;
