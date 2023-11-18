// 3rd party library imports
import React, { useState, useEffect } from 'react';
import * as Tone from 'tone';

// project imports
import { DispatchAction } from './Reducer';
import { AppState } from './State';

/** ------------------------------------------------------------------------ **
 * Contains base implementation of an Instrument.
 ** ------------------------------------------------------------------------ */

export interface InstrumentProps {
  state: AppState;
  dispatch: React.Dispatch<DispatchAction>;
  name: string;
  synth: Tone.MembraneSynth;
  setSynth: (f: (oldSynth: Tone.Synth) => Tone.MembraneSynth) => void;
}

export class InstrumentDrum {
  public readonly name: string;
  public readonly component: React.FC<InstrumentProps>;

  constructor(name: string, component: React.FC<InstrumentProps>) {
    this.name = name;
    this.component = component;
  }
}

function TopNav({ name }: { name: string }) {
  return (
    <div
      className={
        'w-100 h3 bb b--light-gray flex justify-between items-center ph4'
      }
    >
      <div>{name}</div>
    </div>
  );
}

interface InstrumentContainerProps {
  state: AppState;
  dispatch: React.Dispatch<DispatchAction>;
  instrument: InstrumentDrum;
}

export const InstrumentContainer: React.FC<InstrumentContainerProps> = ({
  instrument,
  state,
  dispatch,
}: InstrumentContainerProps) => {
  const InstrumentComponent = instrument.component;
  const [synth, setSynth] = useState(
    new Tone.MembraneSynth({
      oscillator: { type: "sine" } as Tone.OmniOscillatorOptions,
      "envelope": {
        "attack": 0.001,
        "decay": 0.4,
        "sustain": 0.01,
        "release": 1.4,
        "attackCurve": "exponential"
      },
      "octaves": 10,
      "pitchDecay": 0.1,
    }).toDestination(),
  );

  const notes = state.get('notes');

  useEffect(() => {
    if (notes && synth) {
      let eachNote = notes.split(' ');
      let noteObjs = eachNote.map((note: string, idx: number) => ({
        idx,
        time: `+${idx / 4}`,
        note,
        velocity: 1,
      }));

      new Tone.Part((time, value) => {
        // the value is an object which contains both the note and the velocity
        synth.triggerAttackRelease(value.note, '4n', time, value.velocity);
        if (value.idx === eachNote.length - 1) {
          dispatch(new DispatchAction('STOP_SONG'));
        }
      }, noteObjs).start(0);

      Tone.Transport.start();

      return () => {
        Tone.Transport.cancel();
      };
    }

    return () => { };
  }, [notes, synth, dispatch]);

  return (
    <div>
      <TopNav name={instrument.name} />
      <div
        className={'bg-white absolute right-0 left-0'}
        style={{ top: '4rem' }}
      >
        <InstrumentComponent
          name={instrument.name}
          state={state}
          dispatch={dispatch}
          synth={synth}
          setSynth={setSynth}
        />
      </div>
    </div>
  );
};