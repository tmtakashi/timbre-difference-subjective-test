import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
const { ipcRenderer } = require('electron');

interface Props {
  participant: string;
  setParticipant: React.Dispatch<React.SetStateAction<string>>;
}

const Home: React.FC<Props> = ({participant, setParticipant}) => {
  const history = useHistory();
  const handleOnClick = () => {
    ipcRenderer.send('request-save-file', participant);
    ipcRenderer.on('save-file-reply', (event: any, arg: any) => {
      if (arg === 'next') {
        history.push('/production', { participant });
        return;
      }
      return;
    })
  }
  return (
    <>
      <div style={{display: "flex", justifyContent: 'center', marginTop: "200px"}}>
        <TextField
            onChange={(e) => setParticipant(e.target.value)}
            label="Participant"
            variant="outlined"
        />
      </div>
      <div style={{textAlign: 'center', marginTop: '120px'}}>
        <Button
          onClick={handleOnClick}
          variant="contained"
        >
              Start experiment
        </Button>
      </div>
    </>
  )
}

export default Home;
