import React, { useState, useEffect } from 'react';
import PlayerSlider from '../components/PlayerSlider';
import Button from '@material-ui/core/Button';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Container from '@material-ui/core/Container';
import getCombinations from '../utils/getCombinations';
import shuffle from '../utils/shuffle';
const { ipcRenderer } = require('electron');

interface Props {
  participant: string;
}

const Production: React.FC<Props> = ({ participant }) => {
  const [filesSet, setFilesSet] = useState(false);
  const [combinations, setCombinations] = useState([[]] as string[][])
  const [numWavCombination, setNumCombination] = useState(0);
  const [value, setValue] = useState(5);
  const [counter, setCounter] = useState(1);
  useEffect(() => {
    ipcRenderer.send('request-production-wav-list');
    ipcRenderer.on('production-wav-list-reply', (event: any, arg: any) => {
      const cmb = shuffle(getCombinations(arg))
      setCombinations(cmb)
      setNumCombination(cmb.length)
      setFilesSet(true);
    })
  }, [])
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

  const onClickNext = () => {
    setCounter(counter + 1)
  };

  return (
      <>
        { filesSet && (
          <>
            No. {counter} / {numWavCombination}
            <Container>
              <div style={{ textAlign: 'center', marginTop: '50px', marginBottom: '70px', fontSize: '30px' }}>
                <p>Hello {participant}</p>
                You are selecting <span style={{ fontWeight: 'bold' }}>{value}</span>
              </div>
            <PlayerSlider
              aFileName={combinations[counter - 1][0]}
              bFileName={combinations[counter - 1][1]}
              onClickPlayButton={playAudio}
              onSliderChange={handleChange}
            />
              <div style={{ textAlign: 'center', marginTop: '150px' }}>
                <Button
                  onClick={onClickNext}
                  size="large"
                  variant="contained"
                  color="secondary"
                  endIcon={<NavigateNextIcon />}
                >
                  Next
                </Button>
              </div>
            </Container>
          </>
        )}
      </>
  );
}

export default Production;