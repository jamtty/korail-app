import { useState } from 'react';
import icoLogo from '../assets/images/ico_logo.svg';
import Modal from '../components/Modal';
import '../assets/css/App.css';

function Simulation() {
	const [sort1, setSort1] = useState('delay');   // 이례상황 시나리오 분석
	const [sort2, setSort2] = useState('delay');   // 상세 운영 조건별 결과
	const [tab3, setTab3] = useState('preview');   // 프리뷰 / 상세 열차 정보
	const [trainStep, setTrainStep] = useState(-1); // 열차 마커 위치 (-1=숨김)
	const [isPlaying, setIsPlaying] = useState(false); // 재생 중 여부
	const [isReportOpen, setIsReportOpen] = useState(false); // 리포트 모달

	const scenarios = [
		{ id: 1, label: '시나리오1', name: '교호운전', sub: '4:4', delay: 85, train: 32 },
		{ id: 2, label: '시나리오2', name: '교호운전', sub: '3:3', delay: 62, train: 28 },
		{ id: 3, label: '시나리오3', name: '교호운전', sub: '2:2', delay: 44, train: 20 },
		{ id: 4, label: '시나리오4', name: '교호운전', sub: '4:3', delay: 71, train: 25 },
		{ id: 5, label: '시나리오5', name: '교호운전', sub: '3:2', delay: 55, train: 18 },
		{ id: 6, label: '시나리오6', name: '비상대기', sub: '4:4', delay: 38, train: 15 },
		{ id: 7, label: '시나리오7', name: '비상대기', sub: '3:3', delay: 29, train: 12 },
		{ id: 8, label: '시나리오8', name: '단선운전', sub: '4:4', delay: 95, train: 40 },
		{ id: 9, label: '시나리오9', name: '단선운전', sub: '3:3', delay: 78, train: 35 },
	];

	const getSorted = (sortKey) =>
		[...scenarios].sort((a, b) =>
			sortKey === 'delay' ? b.delay - a.delay : b.train - a.train
		);

	const mapStations = [
		{ id: 'haengsin',   x: 50,  y: 150, name: '행신',    color: '#1e3a8a' },
		{ id: 'seoul',      x: 150, y: 150, name: '서울',    color: '#1e3a8a' },
		{ id: 'suseo',      x: 250, y: 80,  name: '수서',    color: '#7e22ce' },
		{ id: 'cheonan',    x: 350, y: 150, name: '천안아산', color: '#1e3a8a' },
		{ id: 'osong',      x: 450, y: 150, name: '오송',    color: '#1e3a8a' },
		{ id: 'daejeon',    x: 550, y: 150, name: '대전',    color: '#1e3a8a' },
		{ id: 'dongdaegu',  x: 650, y: 120, name: '동대구',  color: '#1e3a8a' },
		{ id: 'busan',      x: 750, y: 150, name: '부산',    color: '#1e3a8a' },
		{ id: 'iksan',      x: 400, y: 250, name: '익산',    color: '#f97316' },
		{ id: 'mokpo',      x: 700, y: 280, name: '목포',    color: '#f97316' },
	];

	const trainPathPoints = [
		{ x: 50,  y: 150 }, // 행신
		{ x: 150, y: 150 }, // 서울
		{ x: 250, y: 120 }, // (수서 경유)
		{ x: 350, y: 150 }, // 천안아산
		{ x: 450, y: 150 }, // 오송
		{ x: 550, y: 150 }, // 대전
		{ x: 650, y: 120 }, // 동대구
		{ x: 750, y: 150 }, // 부산
	];

	const playSimulation = () => {
		if (isPlaying) return;
		setIsPlaying(true);
		setTrainStep(-1); // 먼저 마커 숨김 (부산에 있던 마커 순간 제거)
		setTimeout(() => {
			let step = 0;
			setTrainStep(0);
			const iv = setInterval(() => {
				step++;
				if (step >= trainPathPoints.length) {
					clearInterval(iv);
					setIsPlaying(false);
				} else {
					setTrainStep(step);
				}
			}, 800);
		}, 50); // 한 프레임 뒤 행신에서 시작
	};

	const renderCardList = (sortKey) =>
		getSorted(sortKey).map((s) => (
			<li key={s.id}>
				<p className='txt-s'>{s.label}</p>
				<p className='txt-big'>{s.name}<span>{s.sub}</span></p>
				<ul className='mini-card'>
					<li>
						<p className='num-red'>{s.train}대</p>
						<p className='sm'>지연열차</p>
					</li>
					<li>
						<p className='num-blue'>{s.delay}분</p>
						<p className='sm'>지연시간</p>
					</li>
				</ul>
			</li>
		));
	return (
		<>
		<div className="Simulation">
			<div className="header">
                <div className="logo">
                    <img src={icoLogo} alt="Korail 로고" />
                </div>
                <p className='txt'>열차지연시간 예측시스템 시뮬레이션 대시보드</p>
                <div className='btn-wrap'>
                    <button type='button' className='btn-black'>대시보드</button>
                    <button type='button' className='btn-border' onClick={() => setIsReportOpen(true)}>리포트</button>
                </div>
            </div>
            <div className='si-container'>
                <aside className='si-list-wrap'>
                    <h2>시뮬레이션 목록</h2>
                    <ul className='card-list'>
                        <li>
                            <div className='si-d-flex'>
                                <p className='status'>완료</p>
                                <div className='name-wrap'>
                                    <p className='name'>SIM-20231024-001</p>
                                    <p className='date'>2023-10-24</p>
                                </div>
                            </div>
                            <p className='time'>동대구 분기점 (13:00~16:00)</p>
                        </li>
                        <li>
                            <div className='si-d-flex'>
                                <p className='status ing'>진행중</p>
                                <div className='name-wrap'>
                                    <p className='name'>SIM-20231024-001</p>
                                    <p className='date'>2023-10-24</p>
                                </div>
                            </div>
                            <p className='time'>동대구 분기점 (13:00~16:00)</p>
                        </li>
                        <li>
                            <div className='si-d-flex'>
                                <p className='status'>완료</p>
                                <div className='name-wrap'>
                                    <p className='name'>SIM-20231024-001</p>
                                    <p className='date'>2023-10-24</p>
                                </div>
                            </div>
                            <p className='time'>동대구 분기점 (13:00~16:00)</p>
                        </li>
                        <li>
                            <div className='si-d-flex'>
                                <p className='status'>완료</p>
                                <div className='name-wrap'>
                                    <p className='name'>SIM-20231024-001</p>
                                    <p className='date'>2023-10-24</p>
                                </div>
                            </div>
                            <p className='time'>동대구 분기점 (13:00~16:00)</p>
                        </li>
                        <li>
                            <div className='si-d-flex'>
                                <p className='status'>완료</p>
                                <div className='name-wrap'>
                                    <p className='name'>SIM-20231024-001</p>
                                    <p className='date'>2023-10-24</p>
                                </div>
                            </div>
                            <p className='time'>동대구 분기점 (13:00~16:00)</p>
                        </li>
                        <li>
                            <div className='si-d-flex'>
                                <p className='status'>완료</p>
                                <div className='name-wrap'>
                                    <p className='name'>SIM-20231024-001</p>
                                    <p className='date'>2023-10-24</p>
                                </div>
                            </div>
                            <p className='time'>동대구 분기점 (13:00~16:00)</p>
                        </li>
                        <li>
                            <div className='si-d-flex'>
                                <p className='status'>완료</p>
                                <div className='name-wrap'>
                                    <p className='name'>SIM-20231024-001</p>
                                    <p className='date'>2023-10-24</p>
                                </div>
                            </div>
                            <p className='time'>동대구 분기점 (13:00~16:00)</p>
                        </li>
                        <li>
                            <div className='si-d-flex'>
                                <p className='status'>완료</p>
                                <div className='name-wrap'>
                                    <p className='name'>SIM-20231024-001</p>
                                    <p className='date'>2023-10-24</p>
                                </div>
                            </div>
                            <p className='time'>동대구 분기점 (13:00~16:00)</p>
                        </li>
                    </ul>
                </aside>
                <div className='si-contents'>
                    <div className='box'>
                        <div className='control'>
                            <h2>이례상황 시나리오 분석</h2>
                            <div className='btn-con'>
                                <button type='button' className={`btn${sort1 === 'delay' ? ' active' : ''}`} onClick={() => setSort1('delay')}>지연 시간 기준</button>
                                <button type='button' className={`btn${sort1 === 'train' ? ' active' : ''}`} onClick={() => setSort1('train')}>반영 열차 기준</button>
                            </div>
                        </div>
                        <ul className='card-list2'>
                            {renderCardList(sort1)}
                        </ul>
                    </div>
                    <div className='box'>
                        <div className='control'>
                            <h2>상세 운영 조건별 결과</h2>
                            <div className='btn-con'>
                                <span>* 선택한 시나리오의 세부 설정값 비교</span>
                                <button type='button' className={`btn${sort2 === 'delay' ? ' active' : ''}`} onClick={() => setSort2('delay')}>지연 시간 기준</button>
                                <button type='button' className={`btn${sort2 === 'train' ? ' active' : ''}`} onClick={() => setSort2('train')}>반영 열차 기준</button>
                            </div>
                        </div>
                        <ul className='card-list2'>
                            {renderCardList(sort2)}
                        </ul>
                    </div>
                    <div className='box h-345'>
                        <div className='btn-con absolute'>
                            <button type='button' className={`btn${tab3 === 'preview' ? ' active' : ''}`} onClick={() => setTab3('preview')}>프리뷰</button>
                            <button type='button' className={`btn${tab3 === 'detail' ? ' active' : ''}`} onClick={() => setTab3('detail')}>상세 열차 정보</button>
                        </div>
                        {tab3 === 'preview' && (
                            <div className='area-1'>
                                <svg viewBox="0 0 800 400" className='railway-svg' style={{maxWidth:'900px'}}>
                                    {/* 경부고속선 */}
                                    <path d="M50,150 L150,150 L250,120 L350,150 L450,150 L550,150 L650,120 L750,150"
                                        stroke="#1e3a8a" strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                                    {/* 호남고속선 */}
                                    <path d="M350,150 L400,250 L500,300 L600,300 L700,280"
                                        stroke="#f97316" strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                                    {/* 수서평택선 */}
                                    <path d="M250,80 L250,120" stroke="#7e22ce" strokeWidth="6" fill="none" strokeLinecap="round"/>
                                    {/* 역 */}
                                    {mapStations.map(st => (
                                        <g key={st.id} className='station-node' transform={`translate(${st.x}, ${st.y})`}>
                                            <circle r="6" fill="white" stroke={st.color} strokeWidth="2.5"/>
                                            <text y="-12" textAnchor="middle" fontSize="10" fontWeight="600" fill="#334155">{st.name}</text>
                                        </g>
                                    ))}
                                    {/* 열차 마커 */}
                                    {trainStep >= 0 && (
                                        <g
                                            style={{
                                                transform: `translate(${trainPathPoints[trainStep].x}px, ${trainPathPoints[trainStep].y}px)`,
                                                transition: 'transform 0.6s linear',
                                            }}
                                            className={(!isPlaying && trainStep === trainPathPoints.length - 1) ? 'train-arrived' : ''}
                                        >
                                            <circle cx="0" cy="0" r="10" fill="white" stroke="#ef4444" strokeWidth="3"/>
                                            <text x="0" y="-15" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#ef4444">KTX-101</text>
                                        </g>
                                    )}
                                </svg>
                                <div className='map-legend'>
                                    <div className='legend-item'><span className='legend-dot' style={{background:'#1e3a8a'}}></span>경부고속선</div>
                                    <div className='legend-item'><span className='legend-dot' style={{background:'#f97316'}}></span>호남고속선</div>
                                    <div className='legend-item'><span className='legend-dot' style={{background:'#7e22ce'}}></span>수서평택선</div>
                                </div>
                                <button
                                    type='button'
                                    className={`btn-play${isPlaying ? ' playing' : ''}`}
                                    onClick={playSimulation}
                                    disabled={isPlaying}
                                    title='시뮬레이션 재생'
                                >
                                    {isPlaying ? (
                                        <svg width='14' height='14' viewBox='0 0 24 24' fill='currentColor'><rect x='6' y='4' width='4' height='16'/><rect x='14' y='4' width='4' height='16'/></svg>
                                    ) : (
                                        <svg width='14' height='14' viewBox='0 0 24 24' fill='currentColor'><polygon points='5,3 19,12 5,21'/></svg>
                                    )}
                                </button>
                            </div>
                        )}
                        {tab3 === 'detail' && (
                            <div className='area-2'>
                                <div className='train-tbl-wrap'>{/* 스크롤 클래스 overflow-y */}
                                    <table className='train-tbl'>
                                        <thead>
                                            <tr>
                                                <th>열차 ID</th>
                                                <th>운행 노선</th>
                                                <th>폐색구간 시작</th>
                                                <th>폐색구간 종료</th>
                                                <th>지연 시간(분)</th>
                                                <th>상태</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>KTX-101</td>
                                                <td><span className='route blue'>경부선</span></td>
                                                <td>행신</td>
                                                <td>서울</td>
                                                <td><span className='delay'>+12분</span></td>
                                                <td><span className='badge running'>운행중</span></td>
                                            </tr>
                                            <tr>
                                                <td>KTX-101</td>
                                                <td><span className='route yellow'>호남선</span></td>
                                                <td>서울</td>
                                                <td>수서</td>
                                                <td><span className='delay'>+12분</span></td>
                                                <td><span className='badge late'>지연</span></td>
                                            </tr>
                                            <tr>
                                                <td>KTX-101</td>
                                                <td><span className='route yellow'>호남선</span></td>
                                                <td>수서</td>
                                                <td>천안아산</td>
                                                <td><span className='delay'>+12분</span></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>KTX-101</td>
                                                <td><span className='route blue'>경부선</span></td>
                                                <td>천안아산</td>
                                                <td>오송</td>
                                                <td><span className='delay'>+12분</span></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>KTX-101</td>
                                                <td><span className='route yellow'>호남선</span></td>
                                                <td>오송</td>
                                                <td>대전</td>
                                                <td><span className='delay'>+12분</span></td>
                                                <td></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
		</div>

		<Modal
			isOpen={isReportOpen}
			onClose={() => setIsReportOpen(false)}
			title="우회운전 시뮬레이션 결과 리포트"
			width="640px"
		>
			<ul className='status'>
                <li>
                    <i></i>
                    <div className='txt'>
                        <p className='t-tit'>총 지연 열차 수</p>
                        <p className='t-tit2'>34<span>대</span></p>
                    </div>
                </li>
                <li>
                    <i></i>
                    <div className='txt'>
                        <p className='t-tit'>총 지연 시간</p>
                        <p className='t-tit2'>492.1<span>대</span></p>
                    </div>
                </li>
            </ul>
            <div className='deDetailed'>
                <div className='hd'>
                    <h3>상세 분석 보고서 (Detailed Analysis)</h3>
                </div>
                <div className='box'>
                    <div className='info'>
                        현재 시뮬레이션된 시나리오 중<strong>"교호운전(4:4)"</strong> 방식이 전체 지연 시간을 최소화 하는 데 가장 효과적인 것으로 분석되었습니다.
                    </div>
                    <ul className='info-list'>
                        <li>
                            병목 구간 분석 : 오송-대전 구간에서의 선로 용량 부족이 주요 원인으로 식별되었습니다. 단선 운전 시 대기 시간이 평균 12분 증가하나, 교호 운전 시 7분으로 감소하였습니다.
                        </li>
                        <li>
                            열차 등급별 영향: KTX 산천 모델의 가감속 성능을 고려할 때, 정차역이 적은 시나리오 2가 후속 열차 지연 전파를 15% 억제하는 효과가 있습니다.
                        </li>
                    </ul>
                    <table className='info-tbl'>
                        <tr>
                            <td>운영 방식</td>
                            <td>평균지연</td>
                            <td>복구 시점</td>
                        </tr>
                        <tr>
                            <td>단전운전</td>
                            <td><span className='col-orange'>12.3분</span></td>
                            <td>16:45</td>
                        </tr>
                        <tr>
                            <td>교호운전(권장)</td>
                            <td><span className='col-orange'>7.1분</span></td>
                            <td>15:20</td>
                        </tr>
                    </table>
                </div>
            </div>
            <p className='info-notice'>
                따라서 관제 센터는 즉시 교호운전 4:4 패턴을 적용하고, 대전 조차장의 화물 열차 진입을 30분간 통제할 것을 권고합니다.
            </p>
            <div className='info-foot'>
                <p>AI 추천 조치사항</p>
                <div className='btn-wrap'>
                    <button type="button" className='status-style'>반영 요청</button>
                    <button type="button" className='status-style'>교호운전 2:2 검토</button>
                    <button type="button" className='status-style'>반영 요청</button>
                </div>
            </div>
		</Modal>
		</>
	);
}

export default Simulation;

