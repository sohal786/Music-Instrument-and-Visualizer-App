// 3rd party
import { List, Map } from 'immutable';

// project dependencies
import { PianoInstrument } from './instruments/Piano';
import { WaveformVisualizer } from './visualizers/Waveform';
<<<<<<< HEAD

=======
>>>>>>> elliptical_visualizer
import { HarpInstrument } from './instruments/Harp';
import { FluteInstrument } from './instruments/Flute';
import { DrumInstrument } from './instruments/drum';

<<<<<<< HEAD
import { GuitarInstrument } from './instruments/Guitar';




import { EllipticalVisualizer } from './visualizers/drums'
import { multipleVisualizer } from './visualizers/itsAhmato';
=======

import { EllipticalVisualizer } from './visualizers/drums'
>>>>>>> elliptical_visualizer

/** ------------------------------------------------------------------------ **
 * The entire application state is stored in AppState.
 ** ------------------------------------------------------------------------ */
export type AppState = Map<string, any>; // similar to { [id: string]: any }

/**
 * Start with the default piano instrument.
 * Add your instruments to this list.
 */
<<<<<<< HEAD
const instruments = List([PianoInstrument, HarpInstrument, FluteInstrument, DrumInstrument, GuitarInstrument]); // similar to Instrument[]
      // similar to Instrument[]
=======
const instruments = List([PianoInstrument, HarpInstrument, FluteInstrument, DrumInstrument]); // similar to Instrument[]
>>>>>>> elliptical_visualizer

/**
 * Start with the default waveform visualizer.
 * Add your visualizers to this list.
 */
<<<<<<< HEAD
const visualizers = List([WaveformVisualizer, EllipticalVisualizer, multipleVisualizer]); // similar to Visualizer[]
=======
const visualizers = List([WaveformVisualizer, EllipticalVisualizer]); // similar to Visualizer[]
>>>>>>> elliptical_visualizer

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
