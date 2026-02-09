import { useEffect, useMemo, useRef, useState } from 'react';
import icoLogo from '../assets/images/ico_logo.svg';
import '../assets/css/Modal.css';
import Modal from '../components/Modal';

const simulations = [
  { id: 'SIM-20231024-001', date: '2023-10-24', location: '오송-대전 구간', start: '14:00', end: '18:00', status: 'complete' },
  { id: 'SIM-20231024-002', date: '2023-10-24', location: '천안아산 인근', start: '09:00', end: '11:30', status: 'complete' },
  { id: 'SIM-20231023-005', date: '2023-10-23', location: '동대구 분기점', start: '13:00', end: '16:00', status: 'processing' },
  { id: 'SIM-20231022-003', date: '2023-10-22', location: '광주송정 진입', start: '10:00', end: '12:00', status: 'complete' },
  { id: 'SIM-20231022-001', date: '2023-10-22', location: '부산역 출발', start: '06:00', end: '08:00', status: 'complete' },
  { id: 'SIM-20231021-004', date: '2023-10-21', location: '대전-동대구 구간', start: '15:00', end: '18:30', status: 'processing' },
  { id: 'SIM-20231021-002', date: '2023-10-21', location: '수서-오송 구간', start: '07:40', end: '10:20', status: 'complete' },
  { id: 'SIM-20231020-006', date: '2023-10-20', location: '천안아산-오송 구간', start: '12:10', end: '14:05', status: 'complete' },
  { id: 'SIM-20231019-003', date: '2023-10-19', location: '서울-천안아산 구간', start: '08:15', end: '10:00', status: 'processing' },
  { id: 'SIM-20231018-001', date: '2023-10-18', location: '행신-서울 구간', start: '05:50', end: '06:40', status: 'complete' },
];

const mainScenarios = [
  { id: 1, name: '시나리오 1', type: '교호운전', ratio: '4:4', affected: 38, delay: 29, recommended: true },
  { id: 2, name: '시나리오 2', type: '단선운전', ratio: '-', affected: 27, delay: 31, recommended: false },
  { id: 3, name: '시나리오 3', type: '전면중단', ratio: '-', affected: 52, delay: 120, recommended: false },
];

const subScenarios = [
  { id: 's1', parentId: 1, name: '시나리오 1', type: '교호운전', subType: '(4:4)', affected: 38, delay: 29 },
  { id: 's2', parentId: 1, name: '시나리오 1', type: '교호운전', subType: '(2:2)', affected: 39, delay: 31 },
  { id: 's3', parentId: 1, name: '시나리오 1', type: '교호운전', subType: '(3:3)', affected: 41, delay: 33 },
];

const stations = [
  { id: 'haengsin', x: 50, y: 150, name: '행신', color: '#1e3a8a' },
  { id: 'seoul', x: 150, y: 150, name: '서울', color: '#1e3a8a' },
  { id: 'suseo', x: 250, y: 80, name: '수서', color: '#7e22ce' },
  { id: 'cheonan', x: 350, y: 150, name: '천안아산', color: '#1e3a8a' },
  { id: 'osong', x: 450, y: 150, name: '오송', color: '#1e3a8a' },
  { id: 'daejeon', x: 550, y: 150, name: '대전', color: '#1e3a8a' },
  { id: 'dongdaegu', x: 650, y: 120, name: '동대구', color: '#1e3a8a' },
  { id: 'busan', x: 750, y: 150, name: '부산', color: '#1e3a8a' },
  { id: 'iksan', x: 400, y: 250, name: '익산', color: '#f97316' },
  { id: 'mokpo', x: 700, y: 280, name: '목포', color: '#f97316' },
];

const pathPoints = [
  { x: 50, y: 150 },
  { x: 150, y: 150 },
  { x: 250, y: 120 },
  { x: 350, y: 150 },
  { x: 450, y: 150 },
  { x: 550, y: 150 },
  { x: 650, y: 120 },
  { x: 750, y: 150 },
];

function ensureScript(id, src) {
  if (document.getElementById(id)) {
    return;
  }
  const script = document.createElement('script');
  script.id = id;
  script.src = src;
  script.async = true;
  document.body.appendChild(script);
}

function Simulation() {
  const [currentSort, setCurrentSort] = useState('delay');
  const [selectedSimId, setSelectedSimId] = useState(simulations[0].id);
  const [selectedScenarioId, setSelectedScenarioId] = useState(1);
  const [selectedSubId, setSelectedSubId] = useState('s1');
  const [viewMode, setViewMode] = useState('preview');
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [isCardFading, setIsCardFading] = useState(false);
  const [isSubFading, setIsSubFading] = useState(false);
  const [isLucideReady, setIsLucideReady] = useState(false);
  const [marker, setMarker] = useState({ visible: false, x: pathPoints[0].x, y: pathPoints[0].y, arrived: false });
  const timeoutsRef = useRef([]);

  const sortedScenarios = useMemo(() => {
    const sorted = [...mainScenarios].sort((a, b) => {
      return currentSort === 'delay' ? a.delay - b.delay : a.affected - b.affected;
    });
    return sorted;
  }, [currentSort]);

  const filteredSubScenarios = useMemo(() => {
    const filtered = subScenarios.filter((sub) => sub.parentId === selectedScenarioId);
    return filtered.length > 0 ? filtered : subScenarios;
  }, [selectedScenarioId]);

  const trainDetails = useMemo(() => {
    return Array.from({ length: 15 }).map((_, i) => ({
      id: `KTX-${101 + i}`,
      route: i % 3 === 0 ? '경부선' : '호남선',
      startBlock: stations[i % stations.length].name,
      endBlock: stations[(i + 1) % stations.length].name,
      delay: Math.floor(Math.random() * 20),
      status: Math.random() > 0.3 ? '운행중' : '지연',
    }));
  }, []);

  useEffect(() => {
    ensureScript('tailwind-cdn', 'https://cdn.tailwindcss.com');
    ensureScript('lucide-cdn', 'https://unpkg.com/lucide@latest');

    const lucideCheck = setInterval(() => {
      if (window.lucide && window.lucide.createIcons) {
        setIsLucideReady(true);
        clearInterval(lucideCheck);
      }
    }, 100);

    return () => {
      clearInterval(lucideCheck);
    };
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, []);

  useEffect(() => {
    if (isLucideReady && window.lucide && window.lucide.createIcons) {
      window.lucide.createIcons();
    }
  }, [isLucideReady, currentSort, selectedSimId, selectedScenarioId, selectedSubId, viewMode, isReportOpen]);

  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach((timeoutId) => clearTimeout(timeoutId));
      timeoutsRef.current = [];
    };
  }, []);

  const handleSelectSim = (id) => {
    setSelectedSimId(id);
    setIsCardFading(true);
    setTimeout(() => setIsCardFading(false), 200);
  };

  const handleSelectScenario = (id) => {
    setSelectedScenarioId(id);
    setIsSubFading(true);
    setTimeout(() => setIsSubFading(false), 200);
  };

  const playSimulation = () => {
    timeoutsRef.current.forEach((timeoutId) => clearTimeout(timeoutId));
    timeoutsRef.current = [];

    setMarker({ visible: true, x: pathPoints[0].x, y: pathPoints[0].y, arrived: false });

    pathPoints.slice(1).forEach((point, index) => {
      const timeoutId = setTimeout(() => {
        const isLast = index === pathPoints.length - 2;
        setMarker({ visible: true, x: point.x, y: point.y, arrived: isLast });
      }, (index + 1) * 800);
      timeoutsRef.current.push(timeoutId);
    });

    // Keep marker visible at the final station.
  };

  return (
    <div>
      <div className="header">
        <div className="logo">
          <img src={icoLogo} alt="Korail 로고" />
        </div>
        <p className="txt">철도 관제 시뮬레이션 시스템</p>
        <div className="flex gap-2 ml-auto">
          <button className="bg-slate-700 text-white px-4 py-1.5 rounded text-sm font-medium hover:bg-slate-800 transition">대시보드</button>
          <button
            onClick={() => setIsReportOpen(true)}
            className="bg-slate-200 border border-slate-400 text-slate-700 px-4 py-1.5 rounded text-sm font-medium hover:bg-slate-300 hover:text-slate-800 hover:border-slate-400 transition flex items-center gap-2"
          >
            <i data-lucide="file-text" className="w-4 h-4" /> 리포트
          </button>
        </div>
      </div>
      <div className="flex flex-1">
        <aside
          className="w-80 bg-white border-gray-200 flex flex-col shrink-0"
          style={{ paddingTop: '75px', position: 'sticky', top: 0, alignSelf: 'flex-start', height: '100vh', overflow: 'hidden' }}
        >
          <div className="p-4 border-b border-gray-100 bg-gray-50">
            <h2 className="font-semibold text-slate-700">시뮬레이션 목록</h2>
            <div className="text-xs text-gray-500 mt-1">ID / 일시 / 장소 / 시작~종료</div>
          </div>
          <div className="overflow-y-auto flex-1 p-2 space-y-2 min-h-0" id="sim-list-container">
            {simulations.map((sim) => (
              <div
                key={sim.id}
                onClick={() => handleSelectSim(sim.id)}
                className={`p-3 rounded-lg border cursor-pointer transition flex flex-col gap-1 ${
                  selectedSimId === sim.id
                    ? 'bg-blue-50 border-blue-300 shadow-sm'
                    : 'bg-white border-gray-100 hover:bg-gray-50'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span
                    className={`font-bold text-sm ${
                      selectedSimId === sim.id ? 'text-blue-700' : 'text-slate-700'
                    }`}
                  >
                    {sim.id}
                  </span>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full ${
                      sim.status === 'complete'
                        ? 'bg-green-100 text-green-600'
                        : 'bg-yellow-100 text-yellow-600'
                    }`}
                  >
                    {sim.status === 'complete' ? '완료' : '진행중'}
                  </span>
                </div>
                <div className="text-xs text-gray-500 flex items-center gap-1">
                  <i data-lucide="calendar" className="w-3 h-3" /> {sim.date}
                </div>
                <div className="text-xs text-slate-600 font-medium">
                  {sim.location} ({sim.start}~{sim.end})
                </div>
              </div>
            ))}
          </div>
        </aside>

        <main className="flex-1 flex flex-col overflow-hidden bg-gray-100 p-4 gap-4 pt-0" style={{ marginTop: '95px' }}>
          <section className="bg-white rounded-lg shadow-sm p-5 flex flex-col gap-3 shrink-0">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-lg text-slate-800 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-blue-600 rounded-sm" />
                이례상황 시나리오 분석
              </h3>
              <div className="flex bg-gray-100 p-1 rounded-md">
                <button
                  onClick={() => setCurrentSort('delay')}
                  className={`px-3 py-1 text-xs font-medium rounded shadow-sm ${
                    currentSort === 'delay' ? 'bg-white text-blue-700' : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  지연 시간 기준
                </button>
                <button
                  onClick={() => setCurrentSort('train')}
                  className={`px-3 py-1 text-xs font-medium rounded ${
                    currentSort === 'train' ? 'bg-white text-blue-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  반영 열차 기준
                </button>
              </div>
            </div>

            <div
              className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 transition-opacity ${
                isCardFading ? 'opacity-50' : 'opacity-100'
              }`}
              id="scenario-cards"
            >
              {sortedScenarios.map((sc) => (
                <div
                  key={sc.id}
                  onClick={() => handleSelectScenario(sc.id)}
                  className={`relative bg-white border rounded-xl p-4 cursor-pointer transition hover:shadow-md hover:border-blue-300 ${
                    selectedScenarioId === sc.id
                      ? 'border-blue-500 ring-1 ring-blue-500 bg-blue-50/10'
                      : 'border-gray-200'
                  }`}
                >
                  {sc.recommended && (
                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                  )}
                  <h4 className="font-bold text-slate-700 mb-2">{sc.name}</h4>
                  <div className="flex items-end gap-2 mb-3">
                    <div className="text-2xl font-bold text-slate-800">{sc.type}</div>
                    <p className="text-sm text-gray-500">{sc.ratio === '-' ? '' : sc.ratio}</p>
                  </div>

                  <div className="flex items-center gap-3 text-sm border-t pt-3">
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-400">지연열차</span>
                      <span className="font-bold text-red-500">{sc.affected}대</span>
                    </div>
                    <div className="w-px h-6 bg-gray-200" />
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-400">지연시간</span>
                      <span className="font-bold text-slate-700">{sc.delay}분</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section
            className={`bg-white rounded-lg shadow-sm p-5 flex flex-col gap-3 shrink-0 transition-all duration-300 ${
              isSubFading ? 'opacity-50' : 'opacity-100'
            }`}
            id="sub-scenario-section"
          >
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-md text-slate-700">상세 운영 조건별 결과</h3>
              <span className="text-xs text-gray-500">* 선택한 시나리오의 세부 설정값 비교</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4" id="sub-scenario-cards">
              {filteredSubScenarios.map((sub) => (
                <div
                  key={sub.id}
                  onClick={() => setSelectedSubId(sub.id)}
                  className={`bg-white border rounded-lg p-4 cursor-pointer transition hover:border-blue-400 flex flex-col justify-between ${
                    selectedSubId === sub.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                  }`}
                >
                  <div className="text-center mb-2">
                    <div className="text-xs text-gray-500 mb-1">{sub.name}</div>
                    <div className="text-lg font-bold text-slate-800">{sub.type}</div>
                    <div className="text-md font-bold text-blue-600">{sub.subType}</div>
                  </div>

                  <div className="flex justify-center gap-4 text-sm bg-white/50 rounded p-1">
                    <span className="text-gray-600">
                      <strong>{sub.affected}</strong>대
                    </span>
                    <span className="text-gray-300">|</span>
                    <span className="text-gray-600">
                      <strong>{sub.delay}</strong>분
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-white rounded-lg shadow-sm flex-1 flex flex-col overflow-hidden relative">
            <div className="flex items-center justify-end p-3 border-b border-gray-100 gap-2 absolute top-0 right-0 z-10 w-full bg-white/80 backdrop-blur-sm">
              <button
                onClick={() => setViewMode('preview')}
                className={`px-4 py-1.5 text-sm font-semibold border-b-2 transition-colors ${
                  viewMode === 'preview'
                    ? 'border-blue-600 text-blue-600'
                    : 'text-gray-500 border-transparent hover:text-gray-700'
                }`}
              >
                프리뷰
              </button>
              <button
                onClick={() => setViewMode('detail')}
                className={`px-4 py-1.5 text-sm font-medium border-b-2 transition-colors ${
                  viewMode === 'detail'
                    ? 'border-blue-600 text-blue-600'
                    : 'text-gray-500 border-transparent hover:text-gray-700'
                }`}
              >
                상세 열차 정보
              </button>
            </div>

            <div
              id="view-preview"
              className={`${viewMode === 'preview' ? '' : 'hidden'} w-full h-full p-6 pt-14 bg-slate-50 relative overflow-hidden flex items-center justify-center`}
            >
              <div className="absolute bottom-6 left-6 z-10">
                <button
                  onClick={playSimulation}
                  className="bg-blue-500 hover:bg-blue-800 text-white rounded-full p-3 shadow-lg transition transform hover:scale-105 group"
                >
                  <i data-lucide="play" className="fill-current w-6 h-6 ml-1" />
                </button>
              </div>

              <div className="w-full max-w-5xl aspect-[2/1] bg-white rounded-xl p-4 mt-6 relative">
                <svg viewBox="0 0 800 400" className="w-full h-full" id="railway-map">
                  <defs>
                    <filter id="glow">
                      <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
                      <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>

                  <path
                    d="M50,150 L150,150 L250,120 L350,150 L450,150 L550,150 L650,120 L750,150"
                    stroke="#1e3a8a"
                    strokeWidth="6"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  <path
                    d="M350,150 L400,250 L500,300 L600,300 L700,280"
                    stroke="#f97316"
                    strokeWidth="6"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  <path d="M250,80 L250,120" stroke="#7e22ce" strokeWidth="6" fill="none" strokeLinecap="round" />

                  <g id="stations">
                    {stations.map((st) => (
                      <g key={st.id} className="station-node" transform={`translate(${st.x}, ${st.y})`}>
                        <circle r="6" fill="white" stroke={st.color} strokeWidth="2.5" />
                        <text
                          y="-12"
                          textAnchor="middle"
                          fontSize="10"
                          fontWeight="600"
                          fill="#334155"
                          style={{ textShadow: '1px 1px 0 #fff' }}
                        >
                          {st.name}
                        </text>
                      </g>
                    ))}
                  </g>

                  <g
                    id="train-marker"
                    className={`train-marker${marker.arrived ? ' train-marker-blink' : ''}`}
                    style={{ opacity: marker.visible ? 1 : 0, visibility: marker.visible ? 'visible' : 'hidden' }}
                    transform={`translate(${marker.x}, ${marker.y})`}
                  >
                    <circle cx="0" cy="0" r="10" fill="white" stroke="#ef4444" strokeWidth="3" />
                    <text x="0" y="-15" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#ef4444">
                      KTX-101
                    </text>
                  </g>
                </svg>

                <div className="absolute bottom-4 right-4 bg-white/90 p-2 rounded border border-gray-200 text-xs shadow-sm">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-3 h-3 rounded-full bg-blue-900" /> 경부고속선
                  </div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-3 h-3 rounded-full bg-orange-500" /> 호남고속선
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-purple-700" /> 수서평택선
                  </div>
                </div>
              </div>
            </div>

            <div id="view-detail" className={`${viewMode === 'detail' ? '' : 'hidden'} w-full h-full pt-14 flex flex-col`}>
              <div className="overflow-auto h-full px-6 pb-6">
                <table className="w-full text-sm text-left text-gray-500">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 sticky top-0">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        열차 ID
                      </th>
                      <th scope="col" className="px-6 py-3">
                        운행 노선
                      </th>
                      <th scope="col" className="px-6 py-3">
                        폐색구간 시작
                      </th>
                      <th scope="col" className="px-6 py-3">
                        폐색구간 종료
                      </th>
                      <th scope="col" className="px-6 py-3">
                        지연 시간(분)
                      </th>
                      <th scope="col" className="px-6 py-3">
                        상태
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white border-b">
                    {trainDetails.map((row) => (
                      <tr key={row.id} className="hover:bg-gray-50 border-b last:border-0">
                        <td className="px-6 py-3 font-medium text-gray-900">{row.id}</td>
                        <td className="px-6 py-3">
                          <span
                            className={`px-2 py-0.5 rounded text-xs ${
                              row.route === '경부선' ? 'bg-blue-100 text-blue-700' : 'bg-orange-100 text-orange-700'
                            }`}
                          >
                            {row.route}
                          </span>
                        </td>
                        <td className="px-6 py-3">{row.startBlock}</td>
                        <td className="px-6 py-3">{row.endBlock}</td>
                        <td className="px-6 py-3 text-red-500 font-medium">+{row.delay}분</td>
                        <td className="px-6 py-3">
                          <span
                            className={`w-2 h-2 inline-block rounded-full mr-1 ${
                              row.status === '지연' ? 'bg-red-500' : 'bg-green-500'
                            }`}
                          />
                          {row.status}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </main>
      </div>

      <Modal isOpen={isReportOpen} onClose={() => setIsReportOpen(false)} title="우회운전 시뮬레이션 결과 리포트" width="896px">
        <div className="flex-1 overflow-y-auto p-8 bg-slate-50">
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-white p-6 rounded-xl border border-red-100 shadow-sm flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">총 지연 열차 수</p>
                    <p className="text-3xl font-bold text-red-600">
                      34 <span className="text-lg text-gray-400 font-normal">대</span>
                    </p>
                  </div>
                  <div className="bg-red-50 p-3 rounded-full">
                    <i data-lucide="alert-triangle" className="text-red-500 w-6 h-6" />
                  </div>
                </div>
                <div className="bg-white p-6 rounded-xl border border-orange-100 shadow-sm flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">총 지연 시간</p>
                    <p className="text-3xl font-bold text-orange-600">
                      492.1 <span className="text-lg text-gray-400 font-normal">분</span>
                    </p>
                  </div>
                  <div className="bg-orange-50 p-3 rounded-full">
                    <i data-lucide="clock" className="text-orange-500 w-6 h-6" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-6">
                <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <i data-lucide="file-search" className="text-blue-600 w-5 h-5" />
                  상세 분석 보고서 (Detailed Analysis)
                </h3>
                <div className="prose max-w-none text-slate-600 space-y-4 text-sm leading-relaxed">
                  <p className="bg-blue-50 p-3 rounded border-l-4 border-blue-500">
                    <strong>요약:</strong> 현재 시뮬레이션된 시나리오 중{' '}
                    <span className="text-blue-700 font-bold">"교호운전(4:4)"</span> 방식이 전체 지연 시간을
                    최소화하는 데 가장 효과적인 것으로 분석되었습니다.
                  </p>
                  <p>
                    1. <strong>병목 구간 분석:</strong> 오송-대전 구간에서의 선로 용량 부족이 주요 원인으로
                    식별되었습니다. 단선 운전 시 대기 시간이 평균 12분 증가하나, 교호 운전 시 7분으로
                    감소하였습니다.
                  </p>
                  <p>
                    2. <strong>열차 등급별 영향:</strong> KTX 산천 모델의 가감속 성능을 고려할 때, 정차역이 적은
                    시나리오 2가 후속 열차 지연 전파를 15% 억제하는 효과가 있습니다.
                  </p>

                  <div className="my-4">
                    <table className="w-full text-sm text-left border rounded overflow-hidden">
                      <thead className="bg-gray-100 font-semibold text-gray-700">
                        <tr>
                          <th className="p-2">운영 방식</th>
                          <th className="p-2">평균 지연</th>
                          <th className="p-2">복구 시점</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-t">
                          <td className="p-2">단선운전</td>
                          <td className="p-2 text-red-500">12.3분</td>
                          <td className="p-2">16:45</td>
                        </tr>
                        <tr className="border-t bg-blue-50/50">
                          <td className="p-2 font-bold">교호운전 (권장)</td>
                          <td className="p-2 text-green-600">7.1분</td>
                          <td className="p-2">15:20</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <p>
                    <strong>결론:</strong> 따라서 관제 센터는 즉시 교호운전 4:4 패턴을 적용하고, 대전 조차장의
                    화물 열차 진입을 30분간 통제할 것을 권고합니다.
                  </p>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 flex gap-3 items-start">
                <i data-lucide="lightbulb" className="text-yellow-600 w-5 h-5 mt-0.5" />
                <div>
                  <h4 className="font-bold text-yellow-800 text-sm mb-1">AI 추천 조치 사항</h4>
                  <div className="flex gap-2 mt-2">
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-semibold border border-yellow-200">
                      반영요청
                    </span>
                    <span className="px-3 py-1 bg-white text-gray-600 rounded-full text-xs font-medium border border-gray-200">
                      교호운전 2:2 검토
                    </span>
                    <span className="px-3 py-1 bg-white text-gray-600 rounded-full text-xs font-medium border border-gray-200">
                      비상대기
                    </span>
                  </div>
                </div>
              </div>
        </div>
      </Modal>
    </div>
  );
}

export default Simulation;
