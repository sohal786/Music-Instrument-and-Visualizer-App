// 3rd party
import { List, Map } from 'immutable';

// project dependencies
import { PianoInstrument } from './instruments/Piano';
import { WaveformVisualizer } from './visualizers/Waveform';

import { HarpInstrument } from './instruments/Harp';
import { FluteInstrument } from './instruments/Flute';
import { DrumInstrument } from './instruments/drum';

import { GuitarInstrument } from './instruments/Guitar';




import { EllipticalVisualizer } from './visualizers/drums'
import { ParticleSystemVisualizer  } from './visualizers/particle'


/** ------------------------------------------------------------------------ **
 * The entire application state is stored in AppState.
 ** ------------------------------------------------------------------------ */
export type AppState = Map<string, any>; // similar to { [id: string]: any }

/**
 * Start with the default piano instrument.
 * Add your instruments to this list.
 */
const instruments = List([PianoInstrument, HarpInstrument, FluteInstrument, DrumInstrument, GuitarInstrument]); // similar to Instrument[]
      // similar to Instrument[]

/**
 * Start with the default waveform visualizer.
 * Add your visualizers to this list.
 */
const visualizers = List([WaveformVisualizer, EllipticalVisualizer, ParticleSystemVisualizer ]); // similar to Visualizer[]

/**
 * The default application state contains a list of instruments and a list of visualizers.
 *
 * 'instrument': List<Instrument>
 * 'visualizer': List<Visualizer>
 */
export const defaultState: AppState = Map<string, any>({
	instruments: instruments,
	visualizers: visualizers,
});
