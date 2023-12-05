import * as Tone from 'tone';
import React, { useEffect, useState } from 'react';
import { Instrument, InstrumentProps } from '../Instruments';
import './harp.css';

function Harp({ synth, setSynth }: InstrumentProps): JSX.Element {
	const stringsForHarp = [
		{ path: require('./harpSoundPack/8.e3.wav'), label: 'E3' },
		{ path: require('./harpSoundPack/9.f3.wav'), label: 'F3' },
		{ path: require('./harpSoundPack/10.b3.wav'), label: 'B3' },
		{ path: require('./harpSoundPack/11.d4.wav'), label: 'D4' },
		{ path: require('./harpSoundPack/12.e4.wav'), label: 'E4' },
		{ path: require('./harpSoundPack/13.a4.wav'), label: 'A4' },
		{ path: require('./harpSoundPack/14.c5.wav'), label: 'C5' },
		{ path: require('./harpSoundPack/15.e5.wav'), label: 'E5' },
		{ path: require('./harpSoundPack/16.f5.wav'), label: 'F5' },
		{ path: require('./harpSoundPack/17.b5.wav'), label: 'B5' },
		{ path: require('./harpSoundPack/18.d6.wav'), label: 'D6' },
		{ path: require('./harpSoundPack/19.e6.wav'), label: 'E6' },
		{ path: require('./harpSoundPack/20.a6.wav'), label: 'A6' },
		{ path: require('./harpSoundPack/21.b6.wav'), label: 'B6' },
		{ path: require('./harpSoundPack/22.d7.wav'), label: 'D7' },
		{ path: require('./harpSoundPack/23.e7.wav'), label: 'E7' },
	];

	const [player, setPlayer] = useState<Tone.Player[]>([]);

	useEffect(() => {
		setPlayer(stringsForHarp.map((Harp) => loadSample(Harp.path)));
	}, []);

	const loadSample = (url: string) => {
		return new Tone.Player(url).toDestination();
	};

	const handleStringClick = (player: Tone.Player) => {
		player.start();
	};

	return (
		<div className='pv3'>
			<div className='triangle-border'></div>
			<div className='triangle'></div>
			<span className='top'></span>
			<span className='bottom'></span>
			<div>
				{stringsForHarp.map((harp, index) => {
					const player = loadSample(harp.path);
					return (
						<span
							key={index}
							onMouseOver={() => handleStringClick(player)}
							className='strings'
						></span>
					);
				})}
			</div>
		</div>
	);
}

export default Harp;

export const HarpInstrument = new Instrument('Harp', Harp);
