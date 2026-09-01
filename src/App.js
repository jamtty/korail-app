import { useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Routes, Route } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/locale';
import InputData from './admin/InputData';
import TrainSchedule from './admin/TrainSchedule';
import TrainSpeed from './admin/TrainSpeed';
import BlockSection from './admin/BlockSection';
import StationInfo from './admin/StationInfo';
import OutputData from './admin/OutputData';
import WeatherInfo from './admin/WeatherInfo';
import RailTemp from './admin/RailTemp';
import TrainOpBase from './admin/TrainOpBase';
import TrainDriveTime from './admin/TrainDriveTime';
import TrainCompAlloc from './admin/TrainCompAlloc';
import StationBase from './admin/StationBase';
import LineInfo from './admin/LineInfo';
import CommonCode from './admin/CommonCode';
import KorailMap from './components/KorailMap';
import MapLegend, { CTRL_LEGEND } from './components/MapLegend';
import RailRouteMap from './components/RailRouteMap';
import Simulation from './scenario/Simulation';
import icoLogo from './assets/images/ico_logo.svg';
import icoTrain from './assets/images/ico_train.svg';
import icoTrainPlain from './assets/images/ico_train_transparency.svg';
import './assets/css/App.css';

/* ══════════ 통제방안 데이터 ══════════ */
const CTRL_STATIONS = [
	{ id: '행신', x: 40, km: 0, major: false },
	{ id: '서울', x: 130, km: 15, major: true },
	{ id: '광명', x: 220, km: 35, major: false },
	{ id: '천안아산', x: 330, km: 100, major: true },
	{ id: '오송', x: 430, km: 130, major: true },
	{ id: '대전', x: 530, km: 165, major: true },
	{ id: '김천구미', x: 640, km: 250, major: false },
	{ id: '동대구', x: 750, km: 295, major: true },
	{ id: '경주', x: 850, km: 370, major: false },
	{ id: '울산', x: 940, km: 415, major: false },
	{ id: '부산', x: 1020, km: 450, major: true },
];
const CTRL_OPTS = ['미지정', '정차 대기', '서행', '우회', '순서 변경', '운행 중지'];
const CTRL_LINES = ['경부고속선', '경부선', '호남고속선', '호남선', '수서평택선', '전라선', '동해선', '경전선', '경의선'];
const CTRL_SPEEDS = [170, 120, 90, 60, 45];
const CTRL_SECTYPE = [
	{ v: '구간폐색', label: '구간 폐색(차단)' },
	{ v: '서행', label: '구간 서행' },
	{ v: '단선운행', label: '단선 양방향 운행' },
	{ v: '교호운행', label: '교호 운행' },
];

function ctrlMk(no, formation, dir, seg, frac, delay) {
	const loc = dir === 'down'
		? CTRL_STATIONS[seg].id + ' → ' + CTRL_STATIONS[seg + 1].id
		: CTRL_STATIONS[seg + 1].id + ' → ' + CTRL_STATIONS[seg].id;
	return { no, formation, dir, seg, frac, delay, loc, pos: seg + frac };
}

const CTRL_TRAINS = [
	/* 하행 (서울→부산 방향) */
	ctrlMk('101', 'KTX-산천 08', 'down', 0, 0.6, 3),
	ctrlMk('105', 'KTX 12', 'down', 1, 0.45, 0),
	ctrlMk('109', 'KTX-이음 21', 'down', 2, 0.3, 7),
	ctrlMk('113', 'KTX 27', 'down', 3, 0.7, 0),
	ctrlMk('117', 'KTX-산천 05', 'down', 4, 0.5, 15),
	ctrlMk('121', 'KTX 33', 'down', 5, 0.35, 27),
	ctrlMk('125', 'KTX-산천 19', 'down', 6, 0.6, 4),
	ctrlMk('129', 'KTX 41', 'down', 7, 0.25, 0),
	ctrlMk('133', 'KTX-이음 09', 'down', 8, 0.55, 9),
	ctrlMk('137', 'KTX 15', 'down', 9, 0.4, 0),
	/* 상행 (부산→서울 방향) */
	ctrlMk('102', 'KTX 02', 'up', 9, 0.7, 0),
	ctrlMk('106', 'KTX-산천 14', 'up', 8, 0.45, 6),
	ctrlMk('110', 'KTX 22', 'up', 7, 0.6, 0),
	ctrlMk('114', 'KTX-이음 30', 'up', 6, 0.35, 11),
	ctrlMk('118', 'KTX 07', 'up', 5, 0.55, 0),
	ctrlMk('122', 'KTX-산천 26', 'up', 4, 0.3, 2),
	ctrlMk('126', 'KTX 18', 'up', 3, 0.65, 0),
	ctrlMk('130', 'KTX-산천 11', 'up', 2, 0.4, 19),
	ctrlMk('134', 'KTX 36', 'up', 1, 0.5, 0),
	ctrlMk('138', 'KTX-이음 04', 'up', 0, 0.7, 5),
];

function ctrlSegKey(i) { return CTRL_STATIONS[i].id + '-' + CTRL_STATIONS[i + 1].id; }
function ctrlKeyLabel(k) { return k.replace('-', ' ~ '); }
// km ↔ 폐색구간 변환
function ctrlSegOfKm(km) {
	if (km === '' || km === null || km === undefined) return null;
	const k = Number(km);
	if (isNaN(k)) return null;
	for (let i = 0; i < CTRL_STATIONS.length - 1; i++) {
		if (k >= CTRL_STATIONS[i].km && k <= CTRL_STATIONS[i + 1].km) return i;
	}
	return k < CTRL_STATIONS[0].km ? 0 : CTRL_STATIONS.length - 2;
}
function ctrlKmOfSeg(i) {
	return Math.round((CTRL_STATIONS[i].km + CTRL_STATIONS[i + 1].km) / 2);
}
function ctrlFmtDate(d) {
	const y = d.getFullYear();
	const m = String(d.getMonth() + 1).padStart(2, '0');
	const dd = String(d.getDate()).padStart(2, '0');
	return `${y}-${m}-${dd}`;
}

function MainPage() {
	const PopperContainer = ({ children }) => createPortal(children, document.body);
	const [startDate, setStartDate] = useState(new Date());
	const mapRef1 = useRef(null);
	
	// 워크플로우 1 state
	const [activeTab1, setActiveTab1] = useState('지도');
	const [isSimulationActive1, setIsSimulationActive1] = useState(true);
	const [dangerTrainIds1, setDangerTrainIds1] = useState(["KTX1001", "KTX2020"]); // 사고기차 아이디값 배열
	const [isSliderActive1, setIsSliderActive1] = useState(false);
	const [isPanelOpen1, setIsPanelOpen1] = useState(true);
	const [scale1, setScale1] = useState(1);
	const [position1, setPosition1] = useState({ x: 0, y: 0 });
	const [isDragging1, setIsDragging1] = useState(false);
	const [dragStart1, setDragStart1] = useState({ x: 0, y: 0 });

	// 통제방안 state
	const [ctrlMode, setCtrlMode] = useState('train');      // 'train' | 'section'
	const [refNo, setRefNo] = useState(null);               // 기점 열차번호
	const [trainCtrl, setTrainCtrl] = useState({});         // { 열차번호: 통제방안 }
	const [rangeStart, setRangeStart] = useState('');       // 시작 폐색구간
	const [rangeEnd, setRangeEnd] = useState('');           // 종료 폐색구간
	const [startKm, setStartKm] = useState('');             // 시작 지점(km) 입력
	const [endKm, setEndKm] = useState('');                 // 종료 지점(km) 입력
	const [clickPhase, setClickPhase] = useState(0);        // 0:다음 클릭=시작, 1:다음 클릭=종료
	const [selSecCtrl, setSelSecCtrl] = useState(null);     // 구간 통제 유형
	const [secSpeed, setSecSpeed] = useState(170);          // 제한 속도
	const [ctrlStartDate, setCtrlStartDate] = useState(new Date('2026-08-08')); // 적용 시각(일)
	const [ctrlHH, setCtrlHH] = useState('00');             // 적용 시각(시)
	const [ctrlMM, setCtrlMM] = useState('00');             // 적용 시각(분)
	const [secDur, setSecDur] = useState('');               // 통제 예정 시간(분)
	const [appliedList, setAppliedList] = useState([]);     // 적용된 통제방안
	const [ctrlScale, setCtrlScale] = useState(1);          // 통제 노선도 확대 배율
	const [ctrlPos, setCtrlPos] = useState({ x: 0, y: 0 }); // 통제 노선도 드래그 위치
	const [ctrlDragging, setCtrlDragging] = useState(false);// 통제 노선도 드래그 여부
	const [ctrlDragStart, setCtrlDragStart] = useState({ x: 0, y: 0 }); // 드래그 시작 지점

	const handleScenarioOpen = () => {
		window.open(window.location.origin + '/korail-app/scenario/simulation', '_blank');
	};

	// 워크플로우 1 handlers
	const handleSimulationStart1 = (e) => {
		e.preventDefault();
		setIsSimulationActive1(true);
	};
	
	const handleDangerTrainClick1 = () => {
		setIsSliderActive1(true);
	};
	
	const handleMapClick1 = () => {
		setIsSliderActive1(false);
	};
	
	const handleWheel1 = (e) => {
		e.preventDefault();
		const delta = e.deltaY > 0 ? -0.1 : 0.1;
		setScale1(prevScale => Math.min(Math.max(0.5, prevScale + delta), 5));
	};
	
	const handleMouseDown1 = (e) => {
		if (e.target.tagName === 'IMG' && scale1 > 1) {
			setIsDragging1(true);
			setDragStart1({
				x: e.clientX - position1.x,
				y: e.clientY - position1.y
			});
		}
	};
	
	const handleMouseMove1 = (e) => {
		if (!isDragging1) return;
		e.preventDefault();
		requestAnimationFrame(() => {
			setPosition1({
				x: e.clientX - dragStart1.x,
				y: e.clientY - dragStart1.y
			});
		});
	};
	
	const handleMouseUp1 = () => {
		setIsDragging1(false);
	};
	
	const handleRouteTabClick1 = () => {
		setActiveTab1('노선');
		setIsSliderActive1(false);
		setScale1(1);
		setPosition1({ x: 0, y: 0 });
	};
	
	const handleRouteMapClick1 = () => {
		setIsSliderActive1(true);
	};
	
	const handlePanelToggle1 = () => {
		setIsPanelOpen1(v => !v);
	};

	// ── 통제방안 handlers ──
	const switchCtrlMode = (m) => setCtrlMode(m);

	// 노선도 열차 클릭 → 기점 지정 + 열차별 모드
	const handleTrainClick = (no) => {
		setRefNo(no);
		setCtrlMode('train');
	};

	// 노선도 선로(폐색구간) 클릭 → 1회차=시작, 2회차=종료 (km 입력값도 함께 갱신)
	const handleBlockClick = (key) => {
		if (ctrlMode !== 'section') setCtrlMode('section');
		const i = CTRL_STATIONS.findIndex((_, idx) => ctrlSegKey(idx) === key);
		const km = i >= 0 ? ctrlKmOfSeg(i) : '';
		if (clickPhase === 0) {
			setRangeStart(key);
			setStartKm(String(km));
			setRangeEnd('');
			setEndKm('');
			setClickPhase(1);
		} else {
			setRangeEnd(key);
			setEndKm(String(km));
			setClickPhase(0);
		}
	};

	// km 입력 → 폐색구간 자동 변환
	const handleStartKmChange = (e) => {
		const v = e.target.value;
		setStartKm(v);
		const i = ctrlSegOfKm(v);
		setRangeStart(i === null ? '' : ctrlSegKey(i));
	};

	const handleEndKmChange = (e) => {
		const v = e.target.value;
		setEndKm(v);
		const i = ctrlSegOfKm(v);
		setRangeEnd(i === null ? '' : ctrlSegKey(i));
	};

	// 통제 노선도 확대/축소/드래그 (노선 탭과 동일)
	const handleCtrlWheel = (e) => {
		e.preventDefault();
		const delta = e.deltaY > 0 ? -0.1 : 0.1;
		setCtrlScale(prev => Math.min(Math.max(0.5, prev + delta), 5));
	};

	const handleCtrlMouseDown = (e) => {
		if (ctrlScale > 1) {
			setCtrlDragging(true);
			setCtrlDragStart({
				x: e.clientX - ctrlPos.x,
				y: e.clientY - ctrlPos.y
			});
		}
	};

	const handleCtrlMouseMove = (e) => {
		if (!ctrlDragging) return;
		e.preventDefault();
		requestAnimationFrame(() => {
			setCtrlPos({
				x: e.clientX - ctrlDragStart.x,
				y: e.clientY - ctrlDragStart.y
			});
		});
	};

	const handleCtrlMouseUp = () => {
		setCtrlDragging(false);
	};

	const listByDir = (dir) => {
		const ref = CTRL_TRAINS.find(t => t.no === refNo);
		if (!ref) return [];
		return CTRL_TRAINS
			.filter(t => t.dir === dir)
			.sort((a, b) => Math.abs(a.pos - ref.pos) - Math.abs(b.pos - ref.pos))
			.slice(0, 10)
			.sort((a, b) => (dir === 'down' ? b.pos - a.pos : a.pos - b.pos));
	};

	const handleTrainCtrlChange = (no, val) => {
		setTrainCtrl(prev => ({ ...prev, [no]: val }));
	};

	const ctrlRangeIdx = () => {
		if (!rangeStart || !rangeEnd) return null;
		const a = CTRL_STATIONS.findIndex(s => s.id === rangeStart.split('-')[0]);
		const b = CTRL_STATIONS.findIndex(s => s.id === rangeEnd.split('-')[0]);
		return a <= b ? [a, b] : [b, a];
	};

	const canApplyControl = () => {
		if (ctrlMode === 'train') return !!refNo && Object.values(trainCtrl).some(c => c && c !== '미지정');
		return !!ctrlRangeIdx() && !!selSecCtrl;
	};

	const applyControl = () => {
		if (ctrlMode === 'train') {
			const items = Object.entries(trainCtrl)
				.filter(([, c]) => c && c !== '미지정')
				.map(([no, c]) => {
					const t = CTRL_TRAINS.find(x => x.no === no);
					return {
						type: 'train',
						target: `${no} 열차 (${t.dir === 'down' ? '하행' : '상행'})`,
						ctrl: c,
						detail: `${t.formation} · ${t.loc}`,
						at: `${ctrlFmtDate(ctrlStartDate)} ${ctrlHH}:${ctrlMM}`,
						active: true,
					};
				});
			setAppliedList(prev => [...prev, ...items]);
			setTrainCtrl({});
		} else {
			const ri = ctrlRangeIdx();
			const needSpeed = selSecCtrl === '서행' || selSecCtrl === '단선운행';
			const detail = needSpeed
				? `제한 ${secSpeed}km/h${secDur ? ` · ${secDur}분` : ''}`
				: (secDur ? `${secDur}분 예정` : '수동 해제');
			setAppliedList(prev => [...prev, {
				type: 'section',
				range: [ri[0], ri[1]],
				target: `${CTRL_STATIONS[ri[0]].id} ~ ${CTRL_STATIONS[ri[1] + 1].id} (${ri[1] - ri[0] + 1}개 폐색)`,
				ctrl: selSecCtrl,
				detail,
				at: `${ctrlFmtDate(ctrlStartDate)} ${ctrlHH}:${ctrlMM}`,
				active: true,
			}]);
			setRangeStart(''); setRangeEnd(''); setStartKm(''); setEndKm(''); setSelSecCtrl(null);
		}
	};

	const releaseControl = (i) => {
		setAppliedList(prev => prev.map((c, idx) => (idx === i ? { ...c, active: false } : c)));
	};

	// 통제방안 파생 값
	const upTrains = listByDir('up');
	const downTrains = listByDir('down');
	const ctrlRange = ctrlRangeIdx();
	let rangeSummaryText = '시작/종료 지점을 km 단위로 입력하세요.';
	if (startKm && !endKm) rangeSummaryText = `시작: ${startKm}km · 종료 지점을 입력하세요.`;
	else if (!startKm && endKm) rangeSummaryText = `종료: ${endKm}km · 시작 지점을 입력하세요.`;
	else if (ctrlRange) {
		const n = ctrlRange[1] - ctrlRange[0] + 1;
		rangeSummaryText = `통제 범위: ${startKm}km ~ ${endKm}km (${CTRL_STATIONS[ctrlRange[0]].id} ~ ${CTRL_STATIONS[ctrlRange[1] + 1].id} · 폐색구간 ${n}개)`;
	}
	const impactTrains = ctrlRange
		? CTRL_TRAINS.filter(t => t.seg >= ctrlRange[0] && t.seg <= ctrlRange[1])
		: [];
	const timeOptsHH = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0'));
	const timeOptsMM = Array.from({ length: 12 }, (_, i) => String(i * 5).padStart(2, '0'));

	return (
	<div className="container">
		<div className="header">
			<div className="logo">
				<img src={icoLogo} alt="Korail 로고" />
			</div>
            <p className='txt'>열차지연시간 예측시스템</p>
		</div>
		{/* 워크플로우 1 */}
		<div className="wrap">
			<div className="map-area">
				<div className="panel-info">
					<div className="inner">
						<ul className="tab">
					<li className={activeTab1 === '지도' ? 'active' : ''} onClick={() => { setActiveTab1('지도'); setIsSliderActive1(false); }}>지도</li>
							<li className={activeTab1 === '노선' ? 'active' : ''} onClick={handleRouteTabClick1}>노선</li>
								<li onClick={handleScenarioOpen}>시뮬레이션</li>
								<li className={activeTab1 === '통제방안' ? 'active' : ''} onClick={() => { setActiveTab1('통제방안'); setIsSliderActive1(false); }}>통제방안</li>
							<li className={activeTab1 === '관리자' ? 'active' : ''} onClick={() => window.open(window.location.origin + '/korail-app/admin/input-data', '_blank')}>관리자</li>
						</ul>
						<div className={`info-slider ${isSliderActive1 ? 'active' : ''}`}>
							<div className="tit">
								<div className="name">
									<i><img src={icoTrain} alt="" /></i> KTX 경부고속선
								</div>
								<div className="num">
									KTX00185
								</div>
							</div>
							<div className="train-station">
								<ul>
									<li className="s-start">
										<div>출발</div>
										<div>
											<p>
												06:10<strong>행신</strong>
											</p>
										</div>
									</li>
									<li className="s-end">
										<div>도착</div>
										<div>
											<p>
												09:16<strong>부산</strong>
											</p>
										</div>
									</li>
								</ul>
								<p className="s-time"><strong>2</strong>분 지연됨</p>
							</div>
							<div className="station-list">
								<ul>
									<li>
										<p className="name">행신</p>
										<p className="time">06:10<span>지연없음</span></p>
									</li>
									<li>
										<p className="name">서울<span>3번 플랫폼</span></p>
										<p className="time">06:10<span>지연없음</span></p>
									</li>
									<li>
										<p className="name">금천구청<span>3번 플랫폼</span></p>
										<p className="time">06:10<span>지연없음</span></p>
									</li>
									<li>
										<p className="name">남산 IEC<span>3번 플랫폼</span></p>
										<p className="time">06:10<span>지연없음</span></p>
									</li>
									<li>
										<p className="name">오송<span>3번 플랫폼</span></p>
										<p className="time">06:10<span className="danger">일부구간점검 / 5분지연</span></p>
									</li>
									<li>
										<p className="name">대전<span>3번 플랫폼</span></p>
										<p className="time">06:10<span className="danger">5분지연</span></p>
									</li>
									<li>
										<p className="name">동대구<span>3번 플랫폼</span></p>
										<p className="time">06:10<span className="danger">일부구간점검 / 5분지연</span></p>
									</li>
									<li>
										<p className="name">경주<span>3번 플랫폼</span></p>
										<p className="time">06:10<span className="danger">일부구간점검 / 5분지연</span></p>
									</li>
									<li>
										<p className="name">부산</p>
										<p className="time">06:10<span className="danger">일부구간점검 / 5분지연</span></p>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
				{activeTab1 === '지도' && (
					<div className="map">
					<KorailMap ref={mapRef1} isSimulationActive={isSimulationActive1} onDangerTrainClick={handleDangerTrainClick1} onMapClick={handleMapClick1} dangerTrainIndex={1} dangerTrainIds={dangerTrainIds1} />
					<MapLegend />
					</div>
				)}
				{activeTab1 === '노선' && (
					<div className="routemap" onClick={() => setIsSliderActive1(false)}>
						<div className="routemap-zoom-con" onClick={(e) => e.stopPropagation()}>
							<button type="button" className="btn-zoom" onClick={() => setScale1(s => Math.min(3, s + 0.2))} title="줌 인">+</button>
							<button type="button" className="btn-zoom" onClick={() => setScale1(s => Math.max(0.5, s - 0.2))} title="줌 아웃">−</button>
							<button type="button" className="btn-zoom btn-zoom-reset" onClick={() => { setScale1(1); setPosition1({x:0, y:0}); }} title="전체보기">전체</button>
						</div>
						<div 
							onWheel={handleWheel1} 
							onMouseDown={handleMouseDown1}
							onMouseMove={handleMouseMove1}
							onMouseUp={handleMouseUp1}
							onMouseLeave={handleMouseUp1}
							style={{
								width: 'calc(100% - 40px)',
								height: '100%',
								overflow: 'hidden',
                                cursor: scale1 > 1 ? (isDragging1 ? 'grabbing' : 'grab') : 'default',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								zIndex: 10,
								transition: 'width 0.3s',
								//backgroundColor: '#fff',
								//boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
								//borderRadius: '8px',
								marginRight: '20px'
							}}
							onClick={(e) => e.stopPropagation()}
						>
							<RailRouteMap
                                width="100%"
                                height="100%"
                                scale={scale1}
                                onStationClick={(station) => { console.log(station); setIsSliderActive1(v => !v); }}
                                onSectionClick={(section) => console.log(section)}
                                onEmptyClick={() => setIsSliderActive1(false)}
                                highlightStations={[]}
                                highlightSections={[]}
                                trainPositions={[]}
                            />
						</div>
                        <MapLegend />
                    </div>
				)}
				{activeTab1 === '통제방안' && (
					<div className="ctrl-map">
						<div className="ctrl-hint">
							{ctrlMode === 'train' ? (
								<><b>열차 아이콘</b>을 클릭하면 해당 열차를 기점으로 상행/하행 열차 목록이 표시됩니다.</>
							) : (
								<><b>선로(폐색구간)</b>를 클릭하세요. 첫 클릭이 <b>시작 구간</b>, 두 번째 클릭이 <b>종료 구간</b>으로 지정됩니다.</>
							)}
						</div>
						<div className="routemap-zoom-con ctrl-zoom" onClick={(e) => e.stopPropagation()}>
							<button type="button" className="btn-zoom" onClick={() => setCtrlScale(s => Math.min(3, s + 0.2))} title="줌 인">+</button>
							<button type="button" className="btn-zoom" onClick={() => setCtrlScale(s => Math.max(0.5, s - 0.2))} title="줌 아웃">−</button>
							<button type="button" className="btn-zoom btn-zoom-reset" onClick={() => { setCtrlScale(1); setCtrlPos({x:0, y:0}); }} title="전체보기">전체</button>
						</div>
						<div className="ctrl-diagram"
							onWheel={handleCtrlWheel}
							onMouseDown={handleCtrlMouseDown}
							onMouseMove={handleCtrlMouseMove}
							onMouseUp={handleCtrlMouseUp}
							onMouseLeave={handleCtrlMouseUp}
							style={{ cursor: ctrlScale > 1 ? (ctrlDragging ? 'grabbing' : 'grab') : 'default' }}
						>
							<svg viewBox="0 0 1060 320" style={{ transform: `translate(${ctrlPos.x}px, ${ctrlPos.y}px) scale(${ctrlScale})` }}>
								<g>
									{CTRL_STATIONS.slice(0, -1).map((_, i) => {
										const a = CTRL_STATIONS[i];
										const b = CTRL_STATIONS[i + 1];
										const key = ctrlSegKey(i);
										const inRange = ctrlRange && i >= ctrlRange[0] && i <= ctrlRange[1];
										const applied = appliedList.some(c => c.type === 'section' && c.active && i >= c.range[0] && i <= c.range[1]);
										return (
											<g key={key}>
												<line x1={a.x + 9} y1={160} x2={b.x - 9} y2={160} className={`ctrl-blk${inRange ? ' range' : ''}${applied ? ' applied' : ''}`} />
												<line x1={a.x + 9} y1={160} x2={b.x - 9} y2={160} className="ctrl-blk-hit" onClick={() => handleBlockClick(key)} />
											</g>
										);
									})}
								</g>
								<g>
									{CTRL_STATIONS.map(st => (
										<g key={st.id} className={`ctrl-stn${st.major ? ' major' : ''}`}>
											<circle cx={st.x} cy={160} r={st.major ? 8 : 6} />
											<text x={st.x} y={st.major ? 144 : 186} textAnchor="middle">{st.id}</text>
										</g>
									))}
								</g>
								<g>
									{CTRL_TRAINS.map(tr => {
										const a = CTRL_STATIONS[tr.seg];
										const b = CTRL_STATIONS[tr.seg + 1];
										const x = a.x + (b.x - a.x) * tr.frac;
										const y = tr.dir === 'down' ? 120 : 200;
										const ctrlSet = trainCtrl[tr.no] && trainCtrl[tr.no] !== '미지정';
										return (
											<g key={tr.no} className={`ctrl-train${tr.dir === 'up' ? ' up' : ''}${refNo === tr.no ? ' sel' : ''}${ctrlSet ? ' ctrl' : ''}`} onClick={() => handleTrainClick(tr.no)}>
												<rect x={x - 13} y={y - 10} width={26} height={20} rx={4} />
												<image href={icoTrainPlain} x={x - 6} y={y - 6} width={12} height={12} />
												<text x={x} y={tr.dir === 'down' ? y - 15 : y + 24} className="tno" textAnchor="middle">{tr.no}</text>
											</g>
										);
									})}
								</g>
							</svg>
						</div>
						<div className="ctrl-help">스크롤: 확대 · 드래그: 이동 · 열차 클릭: 기점 지정 · 선로 클릭: 시작→종료 구간 지정</div>
						<MapLegend title="통제 범례" className="ctrl-legend" items={CTRL_LEGEND} />
						<div className="ctrl-applied-wrap">
							<div className="ctrl-applied-hd">적용된 통제방안<span className="cnt">{appliedList.length}</span></div>
							<div className="ctrl-applied-scroll">
								<table className="ctrl-tbl">
									<thead><tr><th>구분</th><th>대상</th><th>통제 유형</th><th>세부</th><th>적용 시각</th><th>상태</th><th>관리</th></tr></thead>
									<tbody>
										{appliedList.length === 0 ? (
											<tr><td colSpan="7" className="ctrl-empty">적용된 통제방안이 없습니다.</td></tr>
										) : appliedList.map((c, i) => (
											<tr key={i}>
												<td><span className={`ctrl-tag ${c.type}`}>{c.type === 'train' ? '열차별' : '구간별'}</span></td>
												<td><b>{c.target}</b></td>
												<td>{c.ctrl}</td>
												<td>{c.detail || '-'}</td>
												<td>{c.at}</td>
												<td><span className={`ctrl-st ${c.active ? 'on' : 'off'}`}>{c.active ? '적용 중' : '해제됨'}</span></td>
												<td>{c.active ? <button type="button" className="ctrl-btn-x" onClick={() => releaseControl(i)}>해제</button> : '-'}</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						</div>
					</div>
				)}
			</div>
			<div className={`panel-area-con${isPanelOpen1 ? '' : ' hide'}`}>
				<button type="button" className="panel-toggle" onClick={handlePanelToggle1}>
					{isPanelOpen1 ? '▶' : '◀'}
				</button>
				<div className="panel-area">
				{activeTab1 === '통제방안' ? (
					<>
					<div className="tit">
						<h2>통제 방안 설정</h2>
					</div>
					<div className="inner ctrl-inner">
						<div className="ctrl-subtabs">
							<button type="button" className={ctrlMode === 'train' ? 'active' : ''} onClick={() => switchCtrlMode('train')}>열차별 통제방안</button>
							<button type="button" className={ctrlMode === 'section' ? 'active' : ''} onClick={() => switchCtrlMode('section')}>구간별 통제방안 (폐색)</button>
						</div>
						<div className="ctrl-scroll">
						{ctrlMode === 'train' ? (
							<div className="ctrl-body">
								<div className="rows">
									<div className="col">
									<label>기점 열차 <span className="sub">노선도 열차 클릭 시 자동 선택</span></label>
										<div>
											<select className="select" value={refNo || ''} onChange={(e) => setRefNo(e.target.value || null)}>
												<option value="">기점 열차 선택</option>
												{CTRL_TRAINS.map(t => (
													<option key={t.no} value={t.no}>{t.no} ({t.dir === 'down' ? '하행' : '상행'} · {t.loc} · {t.delay ? '+' + t.delay + '분' : '정시'})</option>
												))}
											</select>
										</div>
									</div>
								</div>
								<div className="ctrl-dir">
									<div className="ctrl-dir-hd up">상행 열차 <span className="cnt">{upTrains.length}</span></div>
									<table className="ctrl-tbl">
										<thead><tr><th>열차번호</th><th>편성번호</th><th>현재위치</th><th>통제방안</th></tr></thead>
										<tbody>
											{!refNo ? (
												<tr><td colSpan="4" className="ctrl-empty">기점 열차를 선택하세요.</td></tr>
											) : upTrains.length === 0 ? (
												<tr><td colSpan="4" className="ctrl-empty">해당 없음</td></tr>
											) : upTrains.map(t => (
												<tr key={t.no} className={t.no === refNo ? 'ref' : ''}>
													<td><b>{t.no}</b></td>
													<td>{t.formation}</td>
													<td>{t.loc} <span className={t.delay ? 'ctrl-delay' : 'ctrl-ontime'}>{t.delay ? '+' + t.delay + '분' : '정시'}</span></td>
													<td>
														<select className={`select ctrl-set${trainCtrl[t.no] && trainCtrl[t.no] !== '미지정' ? ' set' : ''}`} value={trainCtrl[t.no] || '미지정'} onChange={(e) => handleTrainCtrlChange(t.no, e.target.value)}>
															{CTRL_OPTS.map(o => <option key={o}>{o}</option>)}
														</select>
													</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>
								<div className="ctrl-dir">
									<div className="ctrl-dir-hd down">하행 열차 <span className="cnt">{downTrains.length}</span></div>
									<table className="ctrl-tbl">
										<thead><tr><th>열차번호</th><th>편성번호</th><th>현재위치</th><th>통제방안</th></tr></thead>
										<tbody>
											{!refNo ? (
												<tr><td colSpan="4" className="ctrl-empty">기점 열차를 선택하세요.</td></tr>
											) : downTrains.length === 0 ? (
												<tr><td colSpan="4" className="ctrl-empty">해당 없음</td></tr>
											) : downTrains.map(t => (
												<tr key={t.no} className={t.no === refNo ? 'ref' : ''}>
													<td><b>{t.no}</b></td>
													<td>{t.formation}</td>
													<td>{t.loc} <span className={t.delay ? 'ctrl-delay' : 'ctrl-ontime'}>{t.delay ? '+' + t.delay + '분' : '정시'}</span></td>
													<td>
														<select className={`select ctrl-set${trainCtrl[t.no] && trainCtrl[t.no] !== '미지정' ? ' set' : ''}`} value={trainCtrl[t.no] || '미지정'} onChange={(e) => handleTrainCtrlChange(t.no, e.target.value)}>
															{CTRL_OPTS.map(o => <option key={o}>{o}</option>)}
														</select>
													</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>
								<div className="rows">
									<div className="col">
										<label>적용 시각</label>
										<div className="d-flex">
											<DatePicker
												selected={ctrlStartDate}
												onChange={(date) => setCtrlStartDate(date)}
												popperContainer={PopperContainer}
												className="calendar"
												dateFormat="yyyy-MM-dd"
												showMonthDropdown
												showYearDropdown
												dropdownMode="select"
												locale={ko}
												dateFormatCalendar="yyyy년 MM월"
												onChangeRaw={(e) => e.preventDefault()}
											/>
											<select className="select" value={ctrlHH} onChange={(e) => setCtrlHH(e.target.value)}>
												{timeOptsHH.map(h => <option key={h}>{h}</option>)}
											</select>
											<select className="select" value={ctrlMM} onChange={(e) => setCtrlMM(e.target.value)}>
												{timeOptsMM.map(m => <option key={m}>{m}</option>)}
											</select>
										</div>
									</div>
								</div>
							</div>
						) : (
							<div className="ctrl-body">
								<div className="rows">
									<div className="col">
										<label>대상 노선</label>
										<div>
											<select className="select" defaultValue="경부고속선">
												{CTRL_LINES.map(l => <option key={l}>{l}</option>)}
											</select>
										</div>
									</div>
									<div className="col">
										<label>통제 구간 지정 <span className="sub">노선도 선로 클릭: 1회차=시작, 2회차=종료</span></label>
										<div className="ctrl-range-card">
											<div className="ctrl-range-row">
											<span className="ctrl-tag start">시작 지점</span>
											<input type="number" className="frm-input" placeholder="예: 100" min="0" max="1000" step="1" value={startKm} onChange={handleStartKmChange} />
											<span className="ctrl-km-unit">km</span>
										</div>
										<div className="ctrl-range-row">
											<span className="ctrl-tag end">종료 지점</span>
											<input type="number" className="frm-input" placeholder="예: 130" min="0" max="1000" step="1" value={endKm} onChange={handleEndKmChange} />
											<span className="ctrl-km-unit">km</span>
											</div>
										</div>
										<p className="ctrl-range-summary">{rangeSummaryText}</p>
									</div>
									<div className="col">
										<label>통제 유형</label>
										<div className="ctrl-seg">
											{CTRL_SECTYPE.map(s => (
												<button key={s.v} type="button" className={selSecCtrl === s.v ? 'on' : ''} onClick={() => setSelSecCtrl(s.v)}>{s.label}</button>
											))}
										</div>
									</div>
									{(selSecCtrl === '서행' || selSecCtrl === '단선운행') && (
										<div className="col">
											<label>제한 속도(km/h)</label>
											<div>
												<select className="select" value={secSpeed} onChange={(e) => setSecSpeed(Number(e.target.value))}>
													{CTRL_SPEEDS.map(s => <option key={s}>{s}</option>)}
												</select>
											</div>
										</div>
									)}
									<div className="col">
										<label>적용 시각</label>
										<div className="d-flex">
											<DatePicker
												selected={ctrlStartDate}
												onChange={(date) => setCtrlStartDate(date)}
												popperContainer={PopperContainer}
												className="calendar"
												dateFormat="yyyy-MM-dd"
												showMonthDropdown
												showYearDropdown
												dropdownMode="select"
												locale={ko}
												dateFormatCalendar="yyyy년 MM월"
												onChangeRaw={(e) => e.preventDefault()}
											/>
											<select className="select" value={ctrlHH} onChange={(e) => setCtrlHH(e.target.value)}>
												{timeOptsHH.map(h => <option key={h}>{h}</option>)}
											</select>
											<select className="select" value={ctrlMM} onChange={(e) => setCtrlMM(e.target.value)}>
												{timeOptsMM.map(m => <option key={m}>{m}</option>)}
											</select>
										</div>
									</div>
									<div className="col">
										<label>통제 예정 시간(분)</label>
										<div>
											<input type="number" className="frm-input" placeholder="분" min="1" value={secDur} onChange={(e) => setSecDur(e.target.value)} />
										</div>
									</div>
									<div className="col">
										<label>영향 열차 미리보기 <span className="ctrl-cnt-blue">{impactTrains.length}편성</span></label>
										<div className="ctrl-impact">
											<table className="ctrl-tbl">
												<thead><tr><th>열차번호</th><th>편성번호</th><th>현재 위치</th><th>예상 영향</th></tr></thead>
												<tbody>
													{impactTrains.length === 0 ? (
														<tr><td colSpan="4" className="ctrl-empty">통제 구간을 지정하면 영향 열차가 표시됩니다.</td></tr>
													) : impactTrains.map(t => (
														<tr key={t.no}>
															<td><b>{t.no}</b> ({t.dir === 'down' ? '하행' : '상행'})</td>
															<td>{t.formation}</td>
															<td>{t.loc}</td>
															<td className="ctrl-delay">지연 확대 예상</td>
														</tr>
													))}
												</tbody>
											</table>
										</div>
									</div>
								</div>
							</div>
						)}
						</div>
						<div className="btn-area">
							<button type="button" className="btn-primary" disabled={!canApplyControl()} onClick={applyControl}>통제방안 적용</button>
						</div>
					</div>
					</>
				) : (
					<>
					<div className="tit">
						<h2>이례상황 입력 시나리오</h2>
					</div>
					<div className="inner">
					<form>
						<div className="rows">
							<div className="col">
								<label>유형</label>
								<div>
									<select name="" className="select">
										<option value="">단선 불통</option>
										<option value="">이상기후(강풍,폭설 등)</option>
										<option value="">선로 장애(탈선, 낙석)</option>
										<option value="">우회운전</option>
									</select>
								</div>
							</div>
							<div className="col">
								<label>대상 노선</label>
								<div>
									<select name="" className="select">
										<option value="">경부선</option>
										<option value="">호남선</option>
									</select>
								</div>
							</div>
							<div className="col">
								<label>발생 위치(상세)</label>
								<div>
									<select name="" className="select">
										<option value="">대전역-김천구미역 사이 50KM 지점</option>
										<option value="">서울역-부산역 사이 10KM 지점</option>
									</select>
								</div>
							</div>
							<div className="col">
								<label>발생 시간</label>
								<div className="d-flex">
								<DatePicker
									selected={startDate}
									onChange={(date) => setStartDate(date)}
									popperContainer={PopperContainer}
									className="calendar"
									dateFormat="yyyy-MM-dd"
									showMonthDropdown
									showYearDropdown
									dropdownMode="select"
									locale={ko}
									dateFormatCalendar="yyyy년 MM월"
									onChangeRaw={(e) => e.preventDefault()}
								/>
									<select name="" className="select">
										<option value="">시</option>
									</select>
									<select name="" className="select">
										<option value="">분</option>
									</select>
								</div>
							</div>
							<div className="col">
								<label>예상 지속시간(분)</label>
								<div>
									<input type="text" name="" className="frm-input" placeholder="분" />
								</div>
							</div>
							<div className="col">
								<label>운전정리 시나리오 선택</label>
								<div className="d-flex">
                                    <div className="chkBox">
                                        <input type="checkbox" name="scenario1" id="w1-1" />
                                        <label htmlFor="w1-1">단선운행</label>
                                    </div>
                                    <div className="chkBox">
                                        <input type="checkbox" name="scenario1" id="w1-2" />
                                        <label htmlFor="w1-2">우회운전</label>
                                    </div>
                                    <div className="chkBox">
                                        <input type="checkbox" name="scenario1" id="w1-3" />
                                        <label htmlFor="w1-3">서행</label>
                                    </div>
                                    <div className="chkBox">
                                        <input type="checkbox" name="scenario1" id="w1-4" />
                                        <label htmlFor="w1-4">열차정차</label>
                                    </div>
                                    <div className="chkBox">
                                        <input type="checkbox" name="scenario1" id="w1-5" />
                                        <label htmlFor="w1-5">퇴행</label>
                                    </div>
                                    <div className="chkBox">
                                        <input type="checkbox" name="scenario1" id="w1-6" />
                                        <label htmlFor="w1-6">운행중지(타절)</label>
                                    </div>
								</div>
							</div>
							<div className="btn-area">
							<button type="button" className="btn-primary" onClick={handleSimulationStart1}>실행 하기</button>
							</div>
						</div>
					</form>
					</div>
					</>
				)}
			</div>
			</div>
		</div>

	</div>
	);
}

function App() {
	return (
		<Routes>
			<Route path="/" element={<MainPage />} />
			<Route path="/admin/input-data" element={<InputData />} />
			<Route path="/admin/train-schedule" element={<TrainSchedule />} />
			<Route path="/admin/train-speed" element={<TrainSpeed />} />
			<Route path="/admin/block-section" element={<BlockSection />} />
			<Route path="/admin/station-info" element={<StationInfo />} />
			<Route path="/admin/output-data" element={<OutputData />} />
			<Route path="/admin/weather" element={<WeatherInfo />} />
			<Route path="/admin/rail-temp" element={<RailTemp />} />
			<Route path="/admin/train-op-base" element={<TrainOpBase />} />
			<Route path="/admin/train-drive-time" element={<TrainDriveTime />} />
			<Route path="/admin/train-comp-alloc" element={<TrainCompAlloc />} />
			<Route path="/admin/station-base" element={<StationBase />} />
			<Route path="/admin/line-info" element={<LineInfo />} />
			<Route path="/admin/common-code" element={<CommonCode />} />
			<Route path="/scenario/simulation" element={<Simulation />} />
		</Routes>
	);
}

export default App;
