import { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/locale';
import InputData from './admin/InputData';
import TrainSchedule from './admin/TrainSchedule';
import TrainSpeed from './admin/TrainSpeed';
import BlockSection from './admin/BlockSection';
import StationInfo from './admin/StationInfo';
import OutputData from './admin/OutputData';
import icoLogo from './assets/images/ico_logo.svg';
import icoTrain from './assets/images/ico_train.svg';
import './assets/css/App.css';

function MainPage() {
	const [startDate, setStartDate] = useState(new Date());
	const [activeTab, setActiveTab] = useState('지도');
	const navigate = useNavigate();
	
	return (
	<div className="container">
		<div className="header">
			<div className="logo">
				<img src={icoLogo} alt="Korail 로고" />
			</div>
			<p className="txt">한국 철도 네트워크, 지도 및 통관관제시스템 대시보드</p>
		</div>
		<div className="wrap">
			<div className="map-area">
				<div className="panel-info">
					<div className="inner">
						<ul className="tab">
							<li className={activeTab === '지도' ? 'active' : ''} onClick={() => setActiveTab('지도')}>지도</li>
							<li className={activeTab === '노선' ? 'active' : ''} onClick={() => setActiveTab('노선')}>노선</li>
						<li className={activeTab === '관리자' ? 'active' : ''} onClick={() => window.open(window.location.origin + '/korail-app/admin/input-data', '_blank')}>관리자</li>
						</ul>
						<div className="info-slider active">
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
				<div className="map">
					지도
				</div>
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
									<div class="radioBox">
										<input type="radio" name="scenario" id="1" />
										<label for="1">단선운행</label>
									</div>
									<div class="radioBox">
										<input type="radio" name="scenario" id="2" />
										<label for="2">우회운전</label>
									</div>
									<div class="radioBox">
										<input type="radio" name="scenario" id="3" />
										<label for="3">서행</label>
									</div>
									<div class="radioBox">
										<input type="radio" name="scenario" id="4" />
										<label for="4">열차정차</label>
									</div>
									<div class="radioBox">
										<input type="radio" name="scenario" id="5" />
										<label for="5">퇴행</label>
									</div>
									<div class="radioBox">
										<input type="radio" name="scenario" id="6" />
										<label for="6">운행중지(타절)</label>
									</div>
								</div>
							</div>
							<div className="btn-area">
								<button type="button" className="btn-primary">실행 하기</button>
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
		</Routes>
	);
}

export default App;
