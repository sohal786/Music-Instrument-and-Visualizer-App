import * as Tone from 'tone';
import React, { useEffect, useState } from 'react';
import { Instrument, InstrumentProps } from '../Instruments';
import './flute.css';

interface FluteString {
    path: string;
    label: string;
}

function Flute({ synth, setSynth }: InstrumentProps): JSX.Element {
    const soundForFlute: FluteString[] = [
        { path: require('./fluteSoundPack/flute1.wav'), label: 'A' },
        { path: require('./fluteSoundPack/flute2.wav'), label: 'B' },
        { path: require('./fluteSoundPack/flute3.wav'), label: 'C' },
        { path: require('./fluteSoundPack/flute4.wav'), label: 'D' },
        { path: require('./fluteSoundPack/flute5.wav'), label: 'E' },
    ];

    const [player, setPlayer] = useState<Tone.Player[]>([]);

    useEffect(() => {
        setPlayer(soundForFlute.map((flute) => loadSample(flute.path)));
    }, []);

    const loadSample = (url: string) => {
        return new Tone.Player(url).toDestination();
    };

    const handleStringClick = (index: number) => {
        if (player[index]) {
            player[index].start();
        }
    };

    return (
        <div className='pv3'>
            <span className='flute'></span>
            <span className='key5' onMouseOver={() => handleStringClick(0)}></span>
            <span className='key4' onMouseOver={() => handleStringClick(1)}></span>
            <span className='key3' onMouseOver={() => handleStringClick(2)}></span>
            <span className='key2' onMouseOver={() => handleStringClick(3)}></span>
            <span className='key1' onMouseOver={() => handleStringClick(4)}></span>
            <span className='center-flute'></span>
            <span className='first-hole'></span>
        </div>
    );
}

export default Flute;

export const FluteInstrument = new Instrument('Flute', Flute);