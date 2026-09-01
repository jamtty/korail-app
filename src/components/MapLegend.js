import { useState } from 'react';
import '../assets/css/App.css';

const LINES = [
	{ label: '경부고속선', up: '#e60012', down: '#ff4d63' },
	{ label: '경부',       up: '#003087', down: '#1a56c4' },
	{ label: '호남고속선', up: '#f47920', down: '#ffaa55' },
	{ label: '호남',       up: '#006400', down: '#2d9249' },
	{ label: '수서평택',   up: '#771dcd', down: '#a855f7' },
	{ label: '전라선',     up: '#5c8a0d', down: '#91c832' },
	{ label: '동해선',     up: '#0068a0', down: '#00a8d6' },
	{ label: '경전선',     up: '#7b3f00', down: '#c26a1a' },
	{ label: '경의선',     up: '#555555', down: '#999999' },
];

// 통제방안 범례 (단색 항목)
export const CTRL_LEGEND = [
	{ label: '정상 폐색구간', color: '#e02020' },
	{ label: '통제 지정 범위', color: '#f57c00' },
	{ label: '통제 적용 구간', color: '#8e24aa' },
	{ label: '하행 열차', color: '#2e9e44', square: true },
	{ label: '상행 열차', color: '#1e88e5', square: true },
];

function MapLegend({ lines = LINES, items = null, title = '노선 범례', defaultOpen = true, className = '' }) {
	const [isOpen, setIsOpen] = useState(defaultOpen);

	return (
		<div className={`map-legend ${className}${isOpen ? '' : ' hide'}`}>
			<button type='button' className='legend-toggle' onClick={() => setIsOpen(v => !v)}>
				{isOpen ? '▶' : '◀'}
			</button>
			<div className='legend-body'>
				<p className='legend-title'>{title}</p>
				{items ? items.map((it) => (
					<div key={it.label} className='legend-item'>
						<span
							className='legend-line'
							style={{
								background: it.color,
								...(it.square ? { height: 12, width: 12, borderRadius: 3 } : {}),
							}}
						></span>
						{it.label}
					</div>
				)) : lines.map((line) => (
					<div key={line.label} className='legend-item'>
						<span className='legend-swatch'>
							<i style={{ background: line.up }}></i>
							<i style={{ background: line.down }}></i>
						</span>
						{line.label}
					</div>
				))}
			</div>
		</div>
	);
}

export default MapLegend;
export { LINES };
