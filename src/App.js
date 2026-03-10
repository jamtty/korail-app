import { useState } from 'react';
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
import MapLegend from './components/MapLegend';
import Simulation from './scenario/Simulation';
import icoLogo from './assets/images/ico_logo.svg';
import icoTrain from './assets/images/ico_train.svg';
import imgRoutemap from './assets/images/img_routemap.png';
import './assets/css/App.css';

function MainPage() {
	const PopperContainer = ({ children }) => createPortal(children, document.body);
	const [startDate, setStartDate] = useState(new Date());
	
	// 워크플로우 1 state
	const [activeTab1, setActiveTab1] = useState('지도');
	const [isSimulationActive1, setIsSimulationActive1] = useState(true);
	const [dangerTrainIds1, setDangerTrainIds1] = useState(["KTX1001", "KTX2020"]); // 사고기차 아이디값 배열
	const [isSliderActive1, setIsSliderActive1] = useState(false);
	const [scale1, setScale1] = useState(1);
	const [position1, setPosition1] = useState({ x: 0, y: 0 });
	const [isDragging1, setIsDragging1] = useState(false);
	const [dragStart1, setDragStart1] = useState({ x: 0, y: 0 });
	
	// 워크플로우 2 state
	const [activeTab2, setActiveTab2] = useState('지도');
	const [isSimulationActive2, setIsSimulationActive2] = useState(true);
	const [dangerTrainIds2, setDangerTrainIds2] = useState([]); // 사고기차 아이디값 배열
	const [isSliderActive2, setIsSliderActive2] = useState(false);
	const [scale2, setScale2] = useState(1);
	const [position2, setPosition2] = useState({ x: 0, y: 0 });
	const [isDragging2, setIsDragging2] = useState(false);
	const [dragStart2, setDragStart2] = useState({ x: 0, y: 0 });
	
	// 워크플로우 3 state
	const [activeTab3, setActiveTab3] = useState('지도');
	const [isSimulationActive3, setIsSimulationActive3] = useState(true);
	const [dangerTrainIds3, setDangerTrainIds3] = useState([]); // 사고기차 아이디값 배열
	const [isSliderActive3, setIsSliderActive3] = useState(false);
	const [scale3, setScale3] = useState(1);
	const [position3, setPosition3] = useState({ x: 0, y: 0 });
	const [isDragging3, setIsDragging3] = useState(false);
	const [dragStart3, setDragStart3] = useState({ x: 0, y: 0 });

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
		setScale1(prevScale => Math.min(Math.max(0.5, prevScale + delta), 3));
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
	
	// 워크플로우 2 handlers
	const handleSimulationStart2 = (e) => {
		e.preventDefault();
		setIsSimulationActive2(true);
	};
	
	const handleDangerTrainClick2 = () => {
		setIsSliderActive2(true);
	};
	
	const handleMapClick2 = () => {
		setIsSliderActive2(false);
	};
	
	const handleWheel2 = (e) => {
		e.preventDefault();
		const delta = e.deltaY > 0 ? -0.1 : 0.1;
		setScale2(prevScale => Math.min(Math.max(0.5, prevScale + delta), 3));
	};
	
	const handleMouseDown2 = (e) => {
		if (e.target.tagName === 'IMG' && scale2 > 1) {
			setIsDragging2(true);
			setDragStart2({
				x: e.clientX - position2.x,
				y: e.clientY - position2.y
			});
		}
	};
	
	const handleMouseMove2 = (e) => {
		if (!isDragging2) return;
		e.preventDefault();
		requestAnimationFrame(() => {
			setPosition2({
				x: e.clientX - dragStart2.x,
				y: e.clientY - dragStart2.y
			});
		});
	};
	
	const handleMouseUp2 = () => {
		setIsDragging2(false);
	};
	
	const handleRouteTabClick2 = () => {
		setActiveTab2('노선');
		setIsSliderActive2(false);
		setScale2(1);
		setPosition2({ x: 0, y: 0 });
	};
	
	const handleRouteMapClick2 = () => {
		setIsSliderActive2(true);
	};
	
	// 워크플로우 3 handlers
	const handleSimulationStart3 = (e) => {
		e.preventDefault();
		setIsSimulationActive3(true);
	};
	
	const handleDangerTrainClick3 = () => {
		setIsSliderActive3(true);
	};
	
	const handleMapClick3 = () => {
		setIsSliderActive3(false);
	};
	
	const handleWheel3 = (e) => {
		e.preventDefault();
		const delta = e.deltaY > 0 ? -0.1 : 0.1;
		setScale3(prevScale => Math.min(Math.max(0.5, prevScale + delta), 3));
	};
	
	const handleMouseDown3 = (e) => {
		if (e.target.tagName === 'IMG' && scale3 > 1) {
			setIsDragging3(true);
			setDragStart3({
				x: e.clientX - position3.x,
				y: e.clientY - position3.y
			});
		}
	};
	
	const handleMouseMove3 = (e) => {
		if (!isDragging3) return;
		e.preventDefault();
		requestAnimationFrame(() => {
			setPosition3({
				x: e.clientX - dragStart3.x,
				y: e.clientY - dragStart3.y
			});
		});
	};
	
	const handleMouseUp3 = () => {
		setIsDragging3(false);
	};
	
	const handleRouteTabClick3 = () => {
		setActiveTab3('노선');
		setIsSliderActive3(false);
		setScale3(1);
		setPosition3({ x: 0, y: 0 });
	};
	
	const handleRouteMapClick3 = () => {
		setIsSliderActive3(true);
	};
	
	return (
	<div className="container">
		<div className="header">
			<div className="logo">
				<img src={icoLogo} alt="Korail 로고" />
			</div>
            <p className='txt'>열차지연시간 예측시스템 대시보드</p>
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
					<KorailMap isSimulationActive={isSimulationActive1} onDangerTrainClick={handleDangerTrainClick1} onMapClick={handleMapClick1} dangerTrainIndex={1} dangerTrainIds={dangerTrainIds1} />
					<MapLegend defaultOpen={false} />
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
								width: isSliderActive1 ? 'calc(100% - 450px)' : 'calc(100% - 40px)',
								height: '450px',
								overflow: 'hidden',
                                cursor: scale1 > 1 ? (isDragging1 ? 'grabbing' : 'grab') : 'default',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								zIndex: 10,
								transition: 'width 0.3s',
								backgroundColor: '#fff',
								boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
								borderRadius: '8px',
								marginRight: '20px'
							}}
							onClick={(e) => e.stopPropagation()}
						>
							<img 
								src={imgRoutemap} 
								alt="노선도" 
								onClick={(e) => {
									e.stopPropagation();
									handleRouteMapClick1();
								}}
								style={{
									transform: `translate(${position1.x}px, ${position1.y}px) scale(${scale1})`, 
									transformOrigin: 'center', 
									transition: isDragging1 ? 'none' : 'transform 0.1s',
									userSelect: 'none',
									pointerEvents: 'auto',
									maxWidth: '100%',
									maxHeight: '100%',
									cursor: 'pointer'
								}} 
							/>
						</div>						<MapLegend defaultOpen={false} />					</div>
				)}
			</div>
			<div className="panel-area">
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
			</div>
		</div>
		{/* 워크플로우 2 */}
		<div className="wrap">
			<div className="map-area">
				<div className="panel-info">
					<div className="inner">
						<ul className="tab">
					<li className={activeTab2 === '지도' ? 'active' : ''} onClick={() => { setActiveTab2('지도'); setIsSliderActive2(false); }}>지도</li>
							<li className={activeTab2 === '노선' ? 'active' : ''} onClick={handleRouteTabClick2}>노선</li>
								<li onClick={handleScenarioOpen}>시뮬레이션</li>
							<li className={activeTab2 === '관리자' ? 'active' : ''} onClick={() => window.open(window.location.origin + '/korail-app/admin/input-data', '_blank')}>관리자</li>
						</ul>
						<div className={`info-slider ${isSliderActive2 ? 'active' : ''}`}>
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
				{activeTab2 === '지도' && (
					<div className="map">
					<KorailMap isSimulationActive={isSimulationActive2} onDangerTrainClick={handleDangerTrainClick2} onMapClick={handleMapClick2} dangerTrainIndex={3} dangerTrainIds={dangerTrainIds2} />
					<MapLegend defaultOpen={false} />
					</div>
				)}
				{activeTab2 === '노선' && (
					<div className="routemap" onClick={() => setIsSliderActive2(false)}>
						<div className="routemap-zoom-con" onClick={(e) => e.stopPropagation()}>
							<button type="button" className="btn-zoom" onClick={() => setScale2(s => Math.min(3, s + 0.2))} title="줌 인">+</button>
							<button type="button" className="btn-zoom" onClick={() => setScale2(s => Math.max(0.5, s - 0.2))} title="줌 아웃">−</button>
							<button type="button" className="btn-zoom btn-zoom-reset" onClick={() => { setScale2(1); setPosition2({x:0, y:0}); }} title="전체보기">전체</button>
						</div>
						<div 
							onWheel={handleWheel2} 
							onMouseDown={handleMouseDown2}
							onMouseMove={handleMouseMove2}
							onMouseUp={handleMouseUp2}
							onMouseLeave={handleMouseUp2}
							style={{
								width: isSliderActive2 ? 'calc(100% - 450px)' : 'calc(100% - 40px)',
								height: '450px',
								overflow: 'hidden',
							cursor: scale2 > 1 ? (isDragging2 ? 'grabbing' : 'grab') : 'default',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								zIndex: 10,
								transition: 'width 0.3s',
								backgroundColor: '#fff',
								boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
								borderRadius: '8px',
								marginRight: '20px'
							}}
							onClick={(e) => e.stopPropagation()}
						>
							<img 
								src={imgRoutemap} 
								alt="노선도" 
								onClick={(e) => {
									e.stopPropagation();
									handleRouteMapClick2();
								}}
								style={{
									transform: `translate(${position2.x}px, ${position2.y}px) scale(${scale2})`, 
									transformOrigin: 'center', 
									transition: isDragging2 ? 'none' : 'transform 0.1s',
									userSelect: 'none',
									pointerEvents: 'auto',
									maxWidth: '100%',
									maxHeight: '100%',
									cursor: 'pointer'
								}} 
							/>
						</div>						<MapLegend defaultOpen={false} />					</div>
				)}
			</div>
			<div className="panel-area">
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
                                        <input type="checkbox" name="scenario2" id="w2-1" />
                                        <label htmlFor="w2-1">단선운행</label>
                                    </div>
                                    <div className="chkBox">
                                        <input type="checkbox" name="scenario2" id="w2-2" />
                                        <label htmlFor="w2-2">우회운전</label>
                                    </div>
                                    <div className="chkBox">
                                        <input type="checkbox" name="scenario2" id="w2-3" />
                                        <label htmlFor="w2-3">서행</label>
                                    </div>
                                    <div className="chkBox">
                                        <input type="checkbox" name="scenario2" id="w2-4" />
                                        <label htmlFor="w2-4">열차정차</label>
                                    </div>
                                    <div className="chkBox">
                                        <input type="checkbox" name="scenario2" id="w2-5" />
                                        <label htmlFor="w2-5">퇴행</label>
                                    </div>
                                    <div className="chkBox">
                                        <input type="checkbox" name="scenario2" id="w2-6" />
                                        <label htmlFor="w2-6">운행중지(타절)</label>
                                    </div>
								</div>
							</div>
							<div className="btn-area">
							<button type="button" className="btn-primary" onClick={handleSimulationStart2}>실행 하기</button>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
		{/* 워크플로우 3 */}
		<div className="wrap">
			<div className="map-area">
				<div className="panel-info">
					<div className="inner">
						<ul className="tab">
					<li className={activeTab3 === '지도' ? 'active' : ''} onClick={() => { setActiveTab3('지도'); setIsSliderActive3(false); }}>지도</li>
							<li className={activeTab3 === '노선' ? 'active' : ''} onClick={handleRouteTabClick3}>노선</li>
								<li onClick={handleScenarioOpen}>시뮬레이션</li>
							<li className={activeTab3 === '관리자' ? 'active' : ''} onClick={() => window.open(window.location.origin + '/korail-app/admin/input-data', '_blank')}>관리자</li>
						</ul>
						<div className={`info-slider ${isSliderActive3 ? 'active' : ''}`}>
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
				{activeTab3 === '지도' && (
					<div className="map">
					<KorailMap isSimulationActive={isSimulationActive3} onDangerTrainClick={handleDangerTrainClick3} onMapClick={handleMapClick3} dangerTrainIndex={6} dangerTrainIds={dangerTrainIds3} />
					<MapLegend defaultOpen={false} />
					</div>
				)}
				{activeTab3 === '노선' && (
					<div className="routemap" onClick={() => setIsSliderActive3(false)}>
						<div className="routemap-zoom-con" onClick={(e) => e.stopPropagation()}>
							<button type="button" className="btn-zoom" onClick={() => setScale3(s => Math.min(3, s + 0.2))} title="줌 인">+</button>
							<button type="button" className="btn-zoom" onClick={() => setScale3(s => Math.max(0.5, s - 0.2))} title="줌 아웃">−</button>
							<button type="button" className="btn-zoom btn-zoom-reset" onClick={() => { setScale3(1); setPosition3({x:0, y:0}); }} title="전체보기">전체</button>
						</div>
						<div 
							onWheel={handleWheel3} 
							onMouseDown={handleMouseDown3}
							onMouseMove={handleMouseMove3}
							onMouseUp={handleMouseUp3}
							onMouseLeave={handleMouseUp3}
							style={{
								width: isSliderActive3 ? 'calc(100% - 450px)' : 'calc(100% - 40px)',
								height: '450px',
								overflow: 'hidden',
							cursor: scale3 > 1 ? (isDragging3 ? 'grabbing' : 'grab') : 'default',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								zIndex: 10,
								transition: 'width 0.3s',
								backgroundColor: '#fff',
								boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
								borderRadius: '8px',
								marginRight: '20px'
							}}
							onClick={(e) => e.stopPropagation()}
						>
							<img 
								src={imgRoutemap} 
								alt="노선도" 
								onClick={(e) => {
									e.stopPropagation();
									handleRouteMapClick3();
								}}
								style={{
									transform: `translate(${position3.x}px, ${position3.y}px) scale(${scale3})`, 
									transformOrigin: 'center', 
									transition: isDragging3 ? 'none' : 'transform 0.1s',
									userSelect: 'none',
									pointerEvents: 'auto',
									maxWidth: '100%',
									maxHeight: '100%',
									cursor: 'pointer'
								}} 
							/>
						</div>
                        <MapLegend defaultOpen={false} />
                    </div>
				)}
			</div>
			<div className="panel-area">
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
                                        <input type="checkbox" name="scenario3" id="w3-1" />
                                        <label htmlFor="w3-1">단선운행</label>
                                    </div>
                                    <div className="chkBox">
                                        <input type="checkbox" name="scenario3" id="w3-2" />
                                        <label htmlFor="w3-2">우회운전</label>
                                    </div>
                                    <div className="chkBox">
                                        <input type="checkbox" name="scenario3" id="w3-3" />
                                        <label htmlFor="w3-3">서행</label>
                                    </div>
                                    <div className="chkBox">
                                        <input type="checkbox" name="scenario3" id="w3-4" />
                                        <label htmlFor="w3-4">열차정차</label>
                                    </div>
                                    <div className="chkBox">
                                        <input type="checkbox" name="scenario3" id="w3-5" />
                                        <label htmlFor="w3-5">퇴행</label>
                                    </div>
                                    <div className="chkBox">
                                        <input type="checkbox" name="scenario3" id="w3-6" />
                                        <label htmlFor="w3-6">운행중지(타절)</label>
                                    </div>
								</div>
							</div>
							<div className="btn-area">
							<button type="button" className="btn-primary" onClick={handleSimulationStart3}>실행 하기</button>
							</div>
						</div>
					</form>
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
