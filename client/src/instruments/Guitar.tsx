import * as Tone from 'tone';
import React, { useEffect, useState } from 'react';
import { Instrument, InstrumentProps } from '../Instruments';
import './guitar.css';

interface GuitarKeyProps {
  note: string;
  audioFile: string;
}

const GuitarKey: React.FC<GuitarKeyProps> = ({ note, audioFile }) => {
  const [player, setPlayer] = useState<Tone.Player>();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Create a new Tone.Player for each key
    const newPlayer = new Tone.Player(audioFile, () => {
      // This function is called when the buffer is loaded
      setIsLoaded(true);
    }).toDestination();

    setPlayer(newPlayer);

    // Cleanup
    return () => {
      newPlayer.dispose();
    };
  }, [audioFile]);

  const playSound = () => {
    if (Tone.context.state !== 'running') {
      Tone.context.resume();
    }
    if (isLoaded) {
      player?.start();
    } else {
      console.log('Buffer not loaded for', note);
    }
  };

  return (
    <div onClick={playSound} className={`guitar-key ${isLoaded ? 'loaded' : 'loading'}`}>
      {isLoaded ? note : 'Loading...'}
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
    <div className="guitar-container">
      <div className="guitar">
        <div className="guitar-neck"></div>
        <div className="guitar-body">
          <div className="guitar-hole"></div>
        </div>
        <div className="guitar-strings">
          {Object.entries(strings).map(([stringName, notes]) => (
            <div key={stringName} className="guitar-string">
              {notes.map(note => (
                <GuitarKey key={`${stringName}-${note}`} note={note} audioFile={`/guitarAudio/${note}.mp3`} />
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="visualizer">
        {/* Visualizer component */}
      </div>
    </div>
  );
};

export const GuitarInstrument = new Instrument('Guitar', Guitar);








// import * as Tone from 'tone';
// import React, { useEffect, useState } from 'react';
// import { Instrument, InstrumentProps } from '../Instruments';

// interface GuitarKeyProps {
//   note: string;
//   player: Tone.Player;
//   analyzer: Tone.Analyser;
// }
// const GuitarKey: React.FC<GuitarKeyProps> = ({ note, player, analyzer }) => {
//   const playSound = () => {
//     // Ensure the audio context is running
//     if (Tone.context.state !== 'running') {
//       Tone.context.resume();
//     }
    
//     // Connect the player to the analyzer and start it
//     player.connect(analyzer);
//     player.start();

//     // Optionally, disconnect after playing if needed
//     // player.onended = () => {
//     //   player.disconnect(analyzer);
//     // };
//   };


//   return (
//     <div onClick={playSound} className="guitar-key">
//       {note}
//     </div>
//   );
// };

// const Guitar: React.FC<InstrumentProps> = ({ analyzer }) => { // <-- Accepting analyzer prop
//   const [players, setPlayers] = useState<Tone.Player[]>([]);

  
// const strings = {
//   E: ['E2', 'F2', 'Fs2', 'G2', 'Gs2', 'A2', 'As2', 'B2', 'C3', 'Cs3', 'D3', 'Ds3', 'E3'],
//   A: ['A2', 'As2', 'B2', 'C3', 'Cs3', 'D3', 'Ds3', 'E3', 'F3', 'Fs3', 'G3', 'Gs3', 'A3'],
//   D: ['D3', 'Ds3', 'E3', 'F3', 'Fs3', 'G3', 'Gs3', 'A3', 'As3', 'B3', 'C4', 'Cs4', 'D4'],
//   G: ['G3', 'Gs3', 'A3', 'As3', 'B3', 'C4', 'Cs4', 'D4', 'Ds4', 'E4', 'F4', 'Fs4', 'G4'],
//   B: ['B3', 'C4', 'Cs4', 'D4', 'Ds4', 'E4', 'F4', 'Fs4', 'G4', 'Gs4', 'A4', 'As4', 'B4'],
//   E_high: ['E4', 'F4', 'Fs4', 'G4', 'Gs4', 'A4', 'As4', 'B4', 'C5', 'Cs5', 'D5', 'Ds5', 'E5']
// };

//   const convertNoteToFileName = (note: string) => {
//     return `/guitarAudio/${note}.mp3`;
//   };

//   const guitarAudioFiles = Object.values(strings).flat().map(note => {
//     return { note: note, audioFile: convertNoteToFileName(note) };
//   });

//   useEffect(() => {
//     // Load and prepare the audio files
//     const newPlayers = guitarAudioFiles.map(({ audioFile }) => {
//       const player = new Tone.Player(audioFile, () => {
//         // Audio file is loaded
//         player.connect(analyzer);
//     });
    
//       player.connect(analyzer); // Connect the player to the analyzer
//       return player;
//     });

//     setPlayers(newPlayers);

//     // Cleanup on component unmount
//     return () => {
//       newPlayers.forEach(player => player.disconnect()); // Cleanup
//     };
//   }, [analyzer]); // Dependency on analyzer

//   return (
//     <div className="guitar">
//       {players.map((player, index) => (
//         <GuitarKey
//           key={`guitar-key-${index}`}
//           note={guitarAudioFiles[index].note}
//           player={player}
//           analyzer={analyzer}
//         />
//       ))}
//     </div>
//   );
// };

// export const GuitarInstrument = new Instrument('Guitar', Guitar);
