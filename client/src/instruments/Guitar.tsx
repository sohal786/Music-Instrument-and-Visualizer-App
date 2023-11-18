

import React from 'react';
import { InstrumentProps } from '../Instruments'; // Import InstrumentProps
import { Instrument } from '../Instruments'; // Adjust the path as necessary

interface GuitarKeyProps {
  note: string;  
  audioFile: string;  
}

const GuitarKey: React.FC<GuitarKeyProps> = ({ note, audioFile }) => {
  const playSound = () => {
    new Audio(audioFile).play();
  };

  return (
    <div onClick={playSound} className="guitar-key">
      {note}
    </div>
  );
};

// Update the Guitar component to accept InstrumentProps
const Guitar: React.FC<InstrumentProps> = ({ state, dispatch, synth, setSynth }) => {
  // Use state, dispatch, synth, and setSynth as needed
  // For now, it seems they're not used, but you can integrate them for more complex functionalities

  const strings = {
    E: ['E2', 'F2', 'Fs2', 'G2', 'Gs2', 'A2', 'As2', 'B2', 'C3', 'Cs3', 'D3', 'Ds3', 'E3'],
    A: ['A2', 'As2', 'B2', 'C3', 'Cs3', 'D3', 'Ds3', 'E3', 'F3', 'Fs3', 'G3', 'Gs3', 'A3'],
    D: ['D3', 'Ds3', 'E3', 'F3', 'Fs3', 'G3', 'Gs3', 'A3', 'As3', 'B3', 'C4', 'Cs4', 'D4'],
    G: ['G3', 'Gs3', 'A3', 'As3', 'B3', 'C4', 'Cs4', 'D4', 'Ds4', 'E4', 'F4', 'Fs4', 'G4'],
    B: ['B3', 'C4', 'Cs4', 'D4', 'Ds4', 'E4', 'F4', 'Fs4', 'G4', 'Gs4', 'A4', 'As4', 'B4'],
    E_high: ['E4', 'F4', 'Fs4', 'G4', 'Gs4', 'A4', 'As4', 'B4', 'C5', 'Cs5', 'D5', 'Ds5', 'E5']
  };

  return (
    <div className="guitar">
      {Object.entries(strings).map(([stringName, notes]) => (
        <div key={stringName} className="guitar-string">
          {notes.map(note => (
            <GuitarKey key={`${stringName}-${note}`} note={note} audioFile={`/guitarAudio/${note}.mp3`} />
          ))}
        </div>
      ))}
    </div>
  );
};

export const GuitarInstrument = new Instrument('Guitar', Guitar);