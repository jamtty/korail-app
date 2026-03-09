import { useState } from 'react';
import icoLogo from '../assets/images/ico_logo.svg';
import Modal from '../components/Modal';
import '../assets/css/App.css';

function Simulation() {
	const [sort1, setSort1] = useState('delay');        // 이례상황 시나리오 분석
	const [sort2, setSort2] = useState('delay');        // 상세 운영 조건별 결과
	const [tab3, setTab3] = useState('preview');        // 프리뷰 / 상세 열차 정보
	const [trainStep, setTrainStep] = useState(-1);     // 열차 마커 위치 (-1=숨김)
	const [isPlaying, setIsPlaying] = useState(false);  // 재생 중 여부
	const [isReportOpen, setIsReportOpen] = useState(false); // 리포트 모달
	const [selectedSim, setSelectedSim] = useState(null);        // 선택된 시뮬레이션
	const [selectedScenario, setSelectedScenario] = useState(null); // 선택된 시나리오
	const [selectedSub, setSelectedSub] = useState(null);           // 선택된 상세 운영 조건

	// ── 왼쪽 시뮬레이션 목록 ──
	const simList = [
		{ id: 1, simId: 'SIM-20231024-001', date: '2023-10-24', status: '완료',  time: '동대구 분기점 (13:00~16:00)' },
		{ id: 2, simId: 'SIM-20231025-001', date: '2023-10-25', status: '진행중', time: '오송 분기점 (10:00~13:00)' },
		{ id: 3, simId: 'SIM-20231026-001', date: '2023-10-26', status: '완료',  time: '서울역 구간 (09:00~12:00)' },
		{ id: 4, simId: 'SIM-20231027-001', date: '2023-10-27', status: '완료',  time: '부산역 구간 (14:00~17:00)' },
		{ id: 5, simId: 'SIM-20231028-001', date: '2023-10-28', status: '완료',  time: '대전 분기점 (11:00~14:00)' },
		{ id: 6, simId: 'SIM-20231029-001', date: '2023-10-29', status: '완료',  time: '천안아산 구간 (08:00~11:00)' },
		{ id: 7, simId: 'SIM-20231030-001', date: '2023-10-30', status: '완료',  time: '수서역 구간 (15:00~18:00)' },
		{ id: 8, simId: 'SIM-20231031-001', date: '2023-10-31', status: '완료',  time: '익산 분기점 (13:00~16:00)' },
	];

	// ── 시뮬레이션별 이례상황 시나리오 ──
	const scenarioBySim = {
		1: [
			{ id: 101, label: '시나리오1', name: '교호운전', sub: '4:4', delay: 85, train: 32 },
			{ id: 102, label: '시나리오2', name: '교호운전', sub: '3:3', delay: 62, train: 28 },
			{ id: 103, label: '시나리오3', name: '비상대기', sub: '4:4', delay: 38, train: 15 },
			{ id: 104, label: '시나리오4', name: '단선운전', sub: '4:4', delay: 95, train: 40 },
			{ id: 105, label: '시나리오5', name: '교호운전', sub: '4:3', delay: 71, train: 25 },
			{ id: 106, label: '시나리오6', name: '비상대기', sub: '3:3', delay: 29, train: 12 },
			{ id: 107, label: '시나리오7', name: '교호운전', sub: '2:2', delay: 44, train: 20 },
		],
		2: [
			{ id: 201, label: '시나리오1', name: '교호운전', sub: '3:2', delay: 55, train: 18 },
			{ id: 202, label: '시나리오2', name: '단선운전', sub: '3:3', delay: 78, train: 35 },
			{ id: 203, label: '시나리오3', name: '비상대기', sub: '3:3', delay: 29, train: 12 },
			{ id: 204, label: '시나리오4', name: '교호운전', sub: '4:4', delay: 85, train: 32 },
			{ id: 205, label: '시나리오5', name: '단선운전', sub: '2:2', delay: 65, train: 28 },
			{ id: 206, label: '시나리오6', name: '비상대기', sub: '4:4', delay: 38, train: 15 },
		],
		3: [
			{ id: 301, label: '시나리오1', name: '교호운전', sub: '4:3', delay: 71, train: 25 },
			{ id: 302, label: '시나리오2', name: '교호운전', sub: '2:2', delay: 44, train: 20 },
			{ id: 303, label: '시나리오3', name: '단선운전', sub: '4:4', delay: 90, train: 38 },
			{ id: 304, label: '시나리오4', name: '비상대기', sub: '3:3', delay: 32, train: 14 },
			{ id: 305, label: '시나리오5', name: '교호운전', sub: '3:3', delay: 62, train: 28 },
			{ id: 306, label: '시나리오6', name: '단선운전', sub: '3:3', delay: 78, train: 35 },
			{ id: 307, label: '시나리오7', name: '비상대기', sub: '4:4', delay: 38, train: 15 },
		],
		4: [
			{ id: 401, label: '시나리오1', name: '단선운전', sub: '4:4', delay: 95, train: 40 },
			{ id: 402, label: '시나리오2', name: '교호운전', sub: '4:4', delay: 85, train: 32 },
			{ id: 403, label: '시나리오3', name: '교호운전', sub: '3:3', delay: 62, train: 28 },
			{ id: 404, label: '시나리오4', name: '비상대기', sub: '4:4', delay: 38, train: 15 },
			{ id: 405, label: '시나리오5', name: '단선운전', sub: '3:3', delay: 78, train: 35 },
			{ id: 406, label: '시나리오6', name: '교호운전', sub: '4:3', delay: 71, train: 25 },
		],
		5: [
			{ id: 501, label: '시나리오1', name: '비상대기', sub: '4:4', delay: 38, train: 15 },
			{ id: 502, label: '시나리오2', name: '교호운전', sub: '4:3', delay: 71, train: 25 },
			{ id: 503, label: '시나리오3', name: '단선운전', sub: '3:3', delay: 78, train: 35 },
			{ id: 504, label: '시나리오4', name: '교호운전', sub: '4:4', delay: 85, train: 32 },
			{ id: 505, label: '시나리오5', name: '비상대기', sub: '3:3', delay: 29, train: 12 },
			{ id: 506, label: '시나리오6', name: '교호운전', sub: '2:2', delay: 44, train: 20 },
			{ id: 507, label: '시나리오7', name: '단선운전', sub: '4:4', delay: 95, train: 40 },
		],
		6: [
			{ id: 601, label: '시나리오1', name: '교호운전', sub: '4:4', delay: 85, train: 32 },
			{ id: 602, label: '시나리오2', name: '비상대기', sub: '3:3', delay: 29, train: 12 },
			{ id: 603, label: '시나리오3', name: '단선운전', sub: '4:4', delay: 95, train: 40 },
			{ id: 604, label: '시나리오4', name: '교호운전', sub: '3:3', delay: 62, train: 28 },
			{ id: 605, label: '시나리오5', name: '비상대기', sub: '4:4', delay: 38, train: 15 },
			{ id: 606, label: '시나리오6', name: '교호운전', sub: '4:3', delay: 71, train: 25 },
		],
		7: [
			{ id: 701, label: '시나리오1', name: '교호운전', sub: '3:2', delay: 55, train: 18 },
			{ id: 702, label: '시나리오2', name: '단선운전', sub: '4:4', delay: 95, train: 40 },
			{ id: 703, label: '시나리오3', name: '교호운전', sub: '2:2', delay: 44, train: 20 },
			{ id: 704, label: '시나리오4', name: '비상대기', sub: '4:4', delay: 38, train: 15 },
			{ id: 705, label: '시나리오5', name: '단선운전', sub: '3:3', delay: 78, train: 35 },
			{ id: 706, label: '시나리오6', name: '교호운전', sub: '4:4', delay: 85, train: 32 },
		],
		8: [
			{ id: 801, label: '시나리오1', name: '비상대기', sub: '4:4', delay: 38, train: 15 },
			{ id: 802, label: '시나리오2', name: '교호운전', sub: '4:4', delay: 85, train: 32 },
			{ id: 803, label: '시나리오3', name: '단선운전', sub: '3:3', delay: 78, train: 35 },
			{ id: 804, label: '시나리오4', name: '교호운전', sub: '3:3', delay: 62, train: 28 },
			{ id: 805, label: '시나리오5', name: '비상대기', sub: '3:3', delay: 29, train: 12 },
			{ id: 806, label: '시나리오6', name: '단선운전', sub: '4:4', delay: 95, train: 40 },
			{ id: 807, label: '시나리오7', name: '교호운전', sub: '4:3', delay: 71, train: 25 },
		],
	};

	// ── 시나리오별 상세 운영 조건 ──
	const subByScenario = {
		101: [
			{ id: 10101, name: '교호운전', sub: '4:4', delay: 85, train: 32 },
			{ id: 10102, name: '교호운전', sub: '4:3', delay: 79, train: 29 },
			{ id: 10103, name: '교호운전', sub: '3:4', delay: 80, train: 30 },
			{ id: 10104, name: '교호운전', sub: '3:3', delay: 62, train: 25 },
			{ id: 10105, name: '교호운전', sub: '2:2', delay: 44, train: 18 },
			{ id: 10106, name: '단선운전', sub: '4:4', delay: 95, train: 40 },
		],
		102: [
			{ id: 10201, name: '교호운전', sub: '3:3', delay: 62, train: 28 },
			{ id: 10202, name: '교호운전', sub: '3:2', delay: 55, train: 22 },
			{ id: 10203, name: '교호운전', sub: '2:3', delay: 58, train: 24 },
			{ id: 10204, name: '교호운전', sub: '2:2', delay: 44, train: 18 },
			{ id: 10205, name: '비상대기', sub: '3:3', delay: 29, train: 12 },
			{ id: 10206, name: '단선운전', sub: '3:3', delay: 78, train: 35 },
		],
		103: [
			{ id: 10301, name: '비상대기', sub: '4:4', delay: 38, train: 15 },
			{ id: 10302, name: '비상대기', sub: '3:3', delay: 29, train: 12 },
			{ id: 10303, name: '비상대기', sub: '2:2', delay: 20, train:  9 },
			{ id: 10304, name: '교호운전', sub: '4:4', delay: 85, train: 32 },
			{ id: 10305, name: '교호운전', sub: '3:3', delay: 62, train: 25 },
			{ id: 10306, name: '단선운전', sub: '4:4', delay: 95, train: 40 },
		],
		104: [
			{ id: 10401, name: '단선운전', sub: '4:4', delay: 95, train: 40 },
			{ id: 10402, name: '단선운전', sub: '3:3', delay: 78, train: 35 },
			{ id: 10403, name: '단선운전', sub: '2:2', delay: 65, train: 28 },
			{ id: 10404, name: '교호운전', sub: '4:4', delay: 85, train: 32 },
			{ id: 10405, name: '교호운전', sub: '3:3', delay: 62, train: 25 },
			{ id: 10406, name: '비상대기', sub: '4:4', delay: 38, train: 15 },
		],
		105: [
			{ id: 10501, name: '교호운전', sub: '4:3', delay: 71, train: 25 },
			{ id: 10502, name: '교호운전', sub: '3:4', delay: 73, train: 26 },
			{ id: 10503, name: '교호운전', sub: '3:3', delay: 62, train: 22 },
			{ id: 10504, name: '교호운전', sub: '2:3', delay: 55, train: 18 },
			{ id: 10505, name: '비상대기', sub: '4:4', delay: 38, train: 15 },
			{ id: 10506, name: '단선운전', sub: '3:3', delay: 78, train: 35 },
		],
		106: [
			{ id: 10601, name: '비상대기', sub: '3:3', delay: 29, train: 12 },
			{ id: 10602, name: '비상대기', sub: '3:2', delay: 24, train: 10 },
			{ id: 10603, name: '비상대기', sub: '2:2', delay: 20, train:  8 },
			{ id: 10604, name: '교호운전', sub: '3:3', delay: 62, train: 25 },
			{ id: 10605, name: '교ho운전', sub: '2:2', delay: 44, train: 18 },
			{ id: 10606, name: '단선운전', sub: '3:3', delay: 78, train: 35 },
		],
		107: [
			{ id: 10701, name: '교호운전', sub: '2:2', delay: 44, train: 20 },
			{ id: 10702, name: '교호운전', sub: '2:1', delay: 38, train: 17 },
			{ id: 10703, name: '교호운전', sub: '1:2', delay: 40, train: 16 },
			{ id: 10704, name: '비상대기', sub: '2:2', delay: 20, train:  9 },
			{ id: 10705, name: '단선운전', sub: '2:2', delay: 65, train: 28 },
			{ id: 10706, name: '교호운전', sub: '3:2', delay: 55, train: 22 },
		],
		201: [
			{ id: 20101, name: '교호운전', sub: '3:2', delay: 55, train: 18 },
			{ id: 20102, name: '교호운전', sub: '2:3', delay: 58, train: 20 },
			{ id: 20103, name: '교호운전', sub: '2:2', delay: 44, train: 16 },
			{ id: 20104, name: '비상대기', sub: '3:3', delay: 29, train: 12 },
			{ id: 20105, name: '단선운전', sub: '3:3', delay: 78, train: 35 },
			{ id: 20106, name: '교호운전', sub: '4:4', delay: 85, train: 32 },
		],
		202: [
			{ id: 20201, name: '단선운전', sub: '3:3', delay: 78, train: 35 },
			{ id: 20202, name: '단선운전', sub: '3:2', delay: 70, train: 30 },
			{ id: 20203, name: '단선운전', sub: '2:2', delay: 58, train: 25 },
			{ id: 20204, name: '교호운전', sub: '4:4', delay: 85, train: 32 },
			{ id: 20205, name: '교호운전', sub: '3:3', delay: 62, train: 28 },
			{ id: 20206, name: '비상대기', sub: '3:3', delay: 29, train: 12 },
		],
		203: [
			{ id: 20301, name: '비상대기', sub: '3:3', delay: 29, train: 12 },
			{ id: 20302, name: '비상대기', sub: '3:2', delay: 24, train: 10 },
			{ id: 20303, name: '비상대기', sub: '2:2', delay: 20, train:  8 },
			{ id: 20304, name: '교호운전', sub: '3:3', delay: 62, train: 25 },
			{ id: 20305, name: '교호운전', sub: '3:2', delay: 55, train: 20 },
			{ id: 20306, name: '단선운전', sub: '3:3', delay: 78, train: 35 },
		],
		204: [
			{ id: 20401, name: '교호운전', sub: '4:4', delay: 85, train: 32 },
			{ id: 20402, name: '교호운전', sub: '4:3', delay: 79, train: 29 },
			{ id: 20403, name: '교호운전', sub: '3:3', delay: 62, train: 25 },
			{ id: 20404, name: '비상대기', sub: '4:4', delay: 38, train: 15 },
			{ id: 20405, name: '단선운전', sub: '4:4', delay: 95, train: 40 },
			{ id: 20406, name: '단선운전', sub: '3:3', delay: 78, train: 35 },
		],
		205: [
			{ id: 20501, name: '단선운전', sub: '2:2', delay: 65, train: 28 },
			{ id: 20502, name: '단선운전', sub: '3:2', delay: 70, train: 30 },
			{ id: 20503, name: '단선운전', sub: '3:3', delay: 78, train: 35 },
			{ id: 20504, name: '교호운전', sub: '2:2', delay: 44, train: 18 },
			{ id: 20505, name: '교호운전', sub: '3:2', delay: 55, train: 22 },
			{ id: 20506, name: '비상대기', sub: '2:2', delay: 20, train:  9 },
		],
		206: [
			{ id: 20601, name: '비상대기', sub: '4:4', delay: 38, train: 15 },
			{ id: 20602, name: '비상대기', sub: '3:3', delay: 29, train: 12 },
			{ id: 20603, name: '비상대기', sub: '3:2', delay: 24, train: 10 },
			{ id: 20604, name: '교호운전', sub: '4:4', delay: 85, train: 32 },
			{ id: 20605, name: '교호운전', sub: '3:3', delay: 62, train: 25 },
			{ id: 20606, name: '단선운전', sub: '4:4', delay: 95, train: 40 },
		],
		301: [
			{ id: 30101, name: '교호운전', sub: '4:3', delay: 71, train: 25 },
			{ id: 30102, name: '교호운전', sub: '3:4', delay: 73, train: 26 },
			{ id: 30103, name: '교호운전', sub: '3:3', delay: 62, train: 22 },
			{ id: 30104, name: '비상대기', sub: '4:4', delay: 38, train: 15 },
			{ id: 30105, name: '단선운전', sub: '4:4', delay: 90, train: 38 },
			{ id: 30106, name: '교호운전', sub: '2:2', delay: 44, train: 18 },
		],
		302: [
			{ id: 30201, name: '교호운전', sub: '2:2', delay: 44, train: 20 },
			{ id: 30202, name: '교호운전', sub: '2:1', delay: 38, train: 17 },
			{ id: 30203, name: '교호운전', sub: '1:2', delay: 40, train: 16 },
			{ id: 30204, name: '비상대기', sub: '2:2', delay: 20, train:  9 },
			{ id: 30205, name: '단선운전', sub: '2:2', delay: 65, train: 28 },
			{ id: 30206, name: '교호운전', sub: '3:2', delay: 55, train: 22 },
		],
		303: [
			{ id: 30301, name: '단선운전', sub: '4:4', delay: 90, train: 38 },
			{ id: 30302, name: '단선운전', sub: '3:3', delay: 75, train: 32 },
			{ id: 30303, name: '단선운전', sub: '2:2', delay: 60, train: 26 },
			{ id: 30304, name: '교호운전', sub: '4:4', delay: 85, train: 32 },
			{ id: 30305, name: '교호운전', sub: '3:3', delay: 62, train: 25 },
			{ id: 30306, name: '비상대기', sub: '4:4', delay: 38, train: 15 },
		],
		304: [
			{ id: 30401, name: '비상대기', sub: '3:3', delay: 32, train: 14 },
			{ id: 30402, name: '비상대기', sub: '2:2', delay: 24, train: 10 },
			{ id: 30403, name: '비상대기', sub: '3:2', delay: 28, train: 12 },
			{ id: 30404, name: '교호운전', sub: '3:3', delay: 62, train: 25 },
			{ id: 30405, name: '교호운전', sub: '2:2', delay: 44, train: 18 },
			{ id: 30406, name: '단선운전', sub: '3:3', delay: 78, train: 35 },
		],
		305: [
			{ id: 30501, name: '교호운전', sub: '3:3', delay: 62, train: 28 },
			{ id: 30502, name: '교호운전', sub: '3:2', delay: 55, train: 22 },
			{ id: 30503, name: '교호운전', sub: '2:3', delay: 58, train: 24 },
			{ id: 30504, name: '교호운전', sub: '2:2', delay: 44, train: 18 },
			{ id: 30505, name: '비상대기', sub: '3:3', delay: 29, train: 12 },
			{ id: 30506, name: '단선운전', sub: '3:3', delay: 78, train: 35 },
		],
		306: [
			{ id: 30601, name: '단선운전', sub: '3:3', delay: 78, train: 35 },
			{ id: 30602, name: '단선운전', sub: '3:2', delay: 70, train: 30 },
			{ id: 30603, name: '단선운전', sub: '2:2', delay: 58, train: 25 },
			{ id: 30604, name: '교호운전', sub: '4:4', delay: 85, train: 32 },
			{ id: 30605, name: '교호운전', sub: '3:3', delay: 62, train: 28 },
			{ id: 30606, name: '비상대기', sub: '3:3', delay: 29, train: 12 },
		],
		307: [
			{ id: 30701, name: '비상대기', sub: '4:4', delay: 38, train: 15 },
			{ id: 30702, name: '비상대기', sub: '3:3', delay: 29, train: 12 },
			{ id: 30703, name: '비상대기', sub: '3:2', delay: 24, train: 10 },
			{ id: 30704, name: '교호운전', sub: '4:4', delay: 85, train: 32 },
			{ id: 30705, name: '교호운전', sub: '3:3', delay: 62, train: 25 },
			{ id: 30706, name: '단선운전', sub: '4:4', delay: 95, train: 40 },
		],
		401: [
			{ id: 40101, name: '단선운전', sub: '4:4', delay: 95, train: 40 },
			{ id: 40102, name: '단선운전', sub: '3:3', delay: 78, train: 35 },
			{ id: 40103, name: '단선운전', sub: '2:2', delay: 65, train: 28 },
			{ id: 40104, name: '교호운전', sub: '4:4', delay: 85, train: 32 },
			{ id: 40105, name: '교호운전', sub: '3:3', delay: 62, train: 25 },
			{ id: 40106, name: '비상대기', sub: '4:4', delay: 38, train: 15 },
		],
		402: [
			{ id: 40201, name: '교호운전', sub: '4:4', delay: 85, train: 32 },
			{ id: 40202, name: '교호운전', sub: '4:3', delay: 79, train: 29 },
			{ id: 40203, name: '교호운전', sub: '3:4', delay: 80, train: 30 },
			{ id: 40204, name: '교호운전', sub: '3:3', delay: 62, train: 25 },
			{ id: 40205, name: '비상대기', sub: '4:4', delay: 38, train: 15 },
			{ id: 40206, name: '단선운전', sub: '4:4', delay: 95, train: 40 },
		],
		403: [
			{ id: 40301, name: '교호운전', sub: '3:3', delay: 62, train: 28 },
			{ id: 40302, name: '교호운전', sub: '3:2', delay: 55, train: 22 },
			{ id: 40303, name: '교호운전', sub: '2:3', delay: 58, train: 24 },
			{ id: 40304, name: '교호운전', sub: '2:2', delay: 44, train: 18 },
			{ id: 40305, name: '비상대기', sub: '3:3', delay: 29, train: 12 },
			{ id: 40306, name: '단선운전', sub: '3:3', delay: 78, train: 35 },
		],
		404: [
			{ id: 40401, name: '비상대기', sub: '4:4', delay: 38, train: 15 },
			{ id: 40402, name: '비상대기', sub: '3:3', delay: 29, train: 12 },
			{ id: 40403, name: '비상대기', sub: '2:2', delay: 20, train:  9 },
			{ id: 40404, name: '교호운전', sub: '4:4', delay: 85, train: 32 },
			{ id: 40405, name: '교호운전', sub: '3:3', delay: 62, train: 25 },
			{ id: 40406, name: '단선운전', sub: '4:4', delay: 95, train: 40 },
		],
		405: [
			{ id: 40501, name: '단선운전', sub: '3:3', delay: 78, train: 35 },
			{ id: 40502, name: '단선운전', sub: '3:2', delay: 70, train: 30 },
			{ id: 40503, name: '단선운전', sub: '2:2', delay: 58, train: 25 },
			{ id: 40504, name: '교호운전', sub: '3:3', delay: 62, train: 28 },
			{ id: 40505, name: '교호운전', sub: '3:2', delay: 55, train: 22 },
			{ id: 40506, name: '비상대기', sub: '3:3', delay: 29, train: 12 },
		],
		406: [
			{ id: 40601, name: '교호운전', sub: '4:3', delay: 71, train: 25 },
			{ id: 40602, name: '교호운전', sub: '3:4', delay: 73, train: 26 },
			{ id: 40603, name: '교호운전', sub: '3:3', delay: 62, train: 22 },
			{ id: 40604, name: '비상대기', sub: '4:4', delay: 38, train: 15 },
			{ id: 40605, name: '단선운전', sub: '4:4', delay: 95, train: 40 },
			{ id: 40606, name: '단선운전', sub: '3:3', delay: 78, train: 35 },
		],
		501: [
			{ id: 50101, name: '비상대기', sub: '4:4', delay: 38, train: 15 },
			{ id: 50102, name: '비상대기', sub: '3:3', delay: 29, train: 12 },
			{ id: 50103, name: '비상대기', sub: '2:2', delay: 20, train:  9 },
			{ id: 50104, name: '교호운전', sub: '4:4', delay: 85, train: 32 },
			{ id: 50105, name: '교호운전', sub: '3:3', delay: 62, train: 25 },
			{ id: 50106, name: '단선운전', sub: '4:4', delay: 95, train: 40 },
		],
		502: [
			{ id: 50201, name: '교호운전', sub: '4:3', delay: 71, train: 25 },
			{ id: 50202, name: '교호운전', sub: '3:4', delay: 73, train: 26 },
			{ id: 50203, name: '교호운전', sub: '3:3', delay: 62, train: 22 },
			{ id: 50204, name: '교호운전', sub: '2:2', delay: 44, train: 18 },
			{ id: 50205, name: '비상대기', sub: '4:4', delay: 38, train: 15 },
			{ id: 50206, name: '단선운전', sub: '3:3', delay: 78, train: 35 },
		],
		503: [
			{ id: 50301, name: '단선운전', sub: '3:3', delay: 78, train: 35 },
			{ id: 50302, name: '단선운전', sub: '3:2', delay: 70, train: 30 },
			{ id: 50303, name: '단선운전', sub: '2:2', delay: 58, train: 25 },
			{ id: 50304, name: '교호운전', sub: '4:4', delay: 85, train: 32 },
			{ id: 50305, name: '교호운전', sub: '3:3', delay: 62, train: 28 },
			{ id: 50306, name: '비상대기', sub: '3:3', delay: 29, train: 12 },
		],
		504: [
			{ id: 50401, name: '교호운전', sub: '4:4', delay: 85, train: 32 },
			{ id: 50402, name: '교호운전', sub: '4:3', delay: 79, train: 29 },
			{ id: 50403, name: '교호운전', sub: '3:3', delay: 62, train: 25 },
			{ id: 50404, name: '비상대기', sub: '4:4', delay: 38, train: 15 },
			{ id: 50405, name: '단선운전', sub: '4:4', delay: 95, train: 40 },
			{ id: 50406, name: '단선운전', sub: '3:3', delay: 78, train: 35 },
		],
		505: [
			{ id: 50501, name: '비상대기', sub: '3:3', delay: 29, train: 12 },
			{ id: 50502, name: '비상대기', sub: '3:2', delay: 24, train: 10 },
			{ id: 50503, name: '비상대기', sub: '2:2', delay: 20, train:  8 },
			{ id: 50504, name: '교호운전', sub: '3:3', delay: 62, train: 25 },
			{ id: 50505, name: '교호운전', sub: '2:2', delay: 44, train: 18 },
			{ id: 50506, name: '단선운전', sub: '3:3', delay: 78, train: 35 },
		],
		506: [
			{ id: 50601, name: '교호운전', sub: '2:2', delay: 44, train: 20 },
			{ id: 50602, name: '교호운전', sub: '2:1', delay: 38, train: 17 },
			{ id: 50603, name: '교호운전', sub: '1:2', delay: 40, train: 16 },
			{ id: 50604, name: '비상대기', sub: '2:2', delay: 20, train:  9 },
			{ id: 50605, name: '단선운전', sub: '2:2', delay: 65, train: 28 },
			{ id: 50606, name: '교호운전', sub: '3:2', delay: 55, train: 22 },
		],
		507: [
			{ id: 50701, name: '단선운전', sub: '4:4', delay: 95, train: 40 },
			{ id: 50702, name: '단선운전', sub: '3:3', delay: 78, train: 35 },
			{ id: 50703, name: '단선운전', sub: '2:2', delay: 65, train: 28 },
			{ id: 50704, name: '교호운전', sub: '4:4', delay: 85, train: 32 },
			{ id: 50705, name: '교호운전', sub: '3:3', delay: 62, train: 25 },
			{ id: 50706, name: '비상대기', sub: '4:4', delay: 38, train: 15 },
		],
		601: [
			{ id: 60101, name: '교호운전', sub: '4:4', delay: 85, train: 32 },
			{ id: 60102, name: '교호운전', sub: '4:3', delay: 79, train: 29 },
			{ id: 60103, name: '교호운전', sub: '3:4', delay: 80, train: 30 },
			{ id: 60104, name: '교호운전', sub: '3:3', delay: 62, train: 25 },
			{ id: 60105, name: '비상대기', sub: '4:4', delay: 38, train: 15 },
			{ id: 60106, name: '단선운전', sub: '4:4', delay: 95, train: 40 },
		],
		602: [
			{ id: 60201, name: '비상대기', sub: '3:3', delay: 29, train: 12 },
			{ id: 60202, name: '비상대기', sub: '3:2', delay: 24, train: 10 },
			{ id: 60203, name: '비상대기', sub: '2:2', delay: 20, train:  8 },
			{ id: 60204, name: '교호운전', sub: '3:3', delay: 62, train: 25 },
			{ id: 60205, name: '교호운전', sub: '2:2', delay: 44, train: 18 },
			{ id: 60206, name: '단선운전', sub: '3:3', delay: 78, train: 35 },
		],
		603: [
			{ id: 60301, name: '단선운전', sub: '4:4', delay: 95, train: 40 },
			{ id: 60302, name: '단선운전', sub: '3:3', delay: 78, train: 35 },
			{ id: 60303, name: '단선운전', sub: '2:2', delay: 65, train: 28 },
			{ id: 60304, name: '교호운전', sub: '4:4', delay: 85, train: 32 },
			{ id: 60305, name: '교호운전', sub: '3:3', delay: 62, train: 25 },
			{ id: 60306, name: '비상대기', sub: '4:4', delay: 38, train: 15 },
		],
		604: [
			{ id: 60401, name: '교호운전', sub: '3:3', delay: 62, train: 28 },
			{ id: 60402, name: '교호운전', sub: '3:2', delay: 55, train: 22 },
			{ id: 60403, name: '교호운전', sub: '2:3', delay: 58, train: 24 },
			{ id: 60404, name: '교호운전', sub: '2:2', delay: 44, train: 18 },
			{ id: 60405, name: '비상대기', sub: '3:3', delay: 29, train: 12 },
			{ id: 60406, name: '단선운전', sub: '3:3', delay: 78, train: 35 },
		],
		605: [
			{ id: 60501, name: '비상대기', sub: '4:4', delay: 38, train: 15 },
			{ id: 60502, name: '비상대기', sub: '3:3', delay: 29, train: 12 },
			{ id: 60503, name: '비상대기', sub: '3:2', delay: 24, train: 10 },
			{ id: 60504, name: '교호운전', sub: '4:4', delay: 85, train: 32 },
			{ id: 60505, name: '교호운전', sub: '3:3', delay: 62, train: 25 },
			{ id: 60506, name: '단선운전', sub: '4:4', delay: 95, train: 40 },
		],
		606: [
			{ id: 60601, name: '교호운전', sub: '4:3', delay: 71, train: 25 },
			{ id: 60602, name: '교호운전', sub: '3:4', delay: 73, train: 26 },
			{ id: 60603, name: '교호운전', sub: '3:3', delay: 62, train: 22 },
			{ id: 60604, name: '비상대기', sub: '4:4', delay: 38, train: 15 },
			{ id: 60605, name: '단선운전', sub: '4:4', delay: 95, train: 40 },
			{ id: 60606, name: '단선운전', sub: '3:3', delay: 78, train: 35 },
		],
		701: [
			{ id: 70101, name: '교호운전', sub: '3:2', delay: 55, train: 18 },
			{ id: 70102, name: '교호운전', sub: '2:3', delay: 58, train: 20 },
			{ id: 70103, name: '교호운전', sub: '2:2', delay: 44, train: 16 },
			{ id: 70104, name: '비상대기', sub: '3:3', delay: 29, train: 12 },
			{ id: 70105, name: '단선운전', sub: '3:3', delay: 78, train: 35 },
			{ id: 70106, name: '교호운전', sub: '4:4', delay: 85, train: 32 },
		],
		702: [
			{ id: 70201, name: '단선운전', sub: '4:4', delay: 95, train: 40 },
			{ id: 70202, name: '단선운전', sub: '3:3', delay: 78, train: 35 },
			{ id: 70203, name: '단선운전', sub: '2:2', delay: 65, train: 28 },
			{ id: 70204, name: '교호운전', sub: '4:4', delay: 85, train: 32 },
			{ id: 70205, name: '교호운전', sub: '3:3', delay: 62, train: 25 },
			{ id: 70206, name: '비상대기', sub: '4:4', delay: 38, train: 15 },
		],
		703: [
			{ id: 70301, name: '교호운전', sub: '2:2', delay: 44, train: 20 },
			{ id: 70302, name: '교호운전', sub: '2:1', delay: 38, train: 17 },
			{ id: 70303, name: '교호운전', sub: '1:2', delay: 40, train: 16 },
			{ id: 70304, name: '비상대기', sub: '2:2', delay: 20, train:  9 },
			{ id: 70305, name: '단선운전', sub: '2:2', delay: 65, train: 28 },
			{ id: 70306, name: '교호운전', sub: '3:2', delay: 55, train: 22 },
		],
		704: [
			{ id: 70401, name: '비상대기', sub: '4:4', delay: 38, train: 15 },
			{ id: 70402, name: '비상대기', sub: '3:3', delay: 29, train: 12 },
			{ id: 70403, name: '비상대기', sub: '2:2', delay: 20, train:  9 },
			{ id: 70404, name: '교호운전', sub: '4:4', delay: 85, train: 32 },
			{ id: 70405, name: '교호운전', sub: '3:3', delay: 62, train: 25 },
			{ id: 70406, name: '단선운전', sub: '4:4', delay: 95, train: 40 },
		],
		705: [
			{ id: 70501, name: '단선운전', sub: '3:3', delay: 78, train: 35 },
			{ id: 70502, name: '단선운전', sub: '3:2', delay: 70, train: 30 },
			{ id: 70503, name: '단선운전', sub: '2:2', delay: 58, train: 25 },
			{ id: 70504, name: '교호운전', sub: '3:3', delay: 62, train: 28 },
			{ id: 70505, name: '교호운전', sub: '3:2', delay: 55, train: 22 },
			{ id: 70506, name: '비상대기', sub: '3:3', delay: 29, train: 12 },
		],
		706: [
			{ id: 70601, name: '교호운전', sub: '4:4', delay: 85, train: 32 },
			{ id: 70602, name: '교호운전', sub: '4:3', delay: 79, train: 29 },
			{ id: 70603, name: '교호운전', sub: '3:3', delay: 62, train: 25 },
			{ id: 70604, name: '비상대기', sub: '4:4', delay: 38, train: 15 },
			{ id: 70605, name: '단선운전', sub: '4:4', delay: 95, train: 40 },
			{ id: 70606, name: '단선운전', sub: '3:3', delay: 78, train: 35 },
		],
		801: [
			{ id: 80101, name: '비상대기', sub: '4:4', delay: 38, train: 15 },
			{ id: 80102, name: '비상대기', sub: '3:3', delay: 29, train: 12 },
			{ id: 80103, name: '비상대기', sub: '2:2', delay: 20, train:  9 },
			{ id: 80104, name: '교호운전', sub: '4:4', delay: 85, train: 32 },
			{ id: 80105, name: '교호운전', sub: '3:3', delay: 62, train: 25 },
			{ id: 80106, name: '단선운전', sub: '4:4', delay: 95, train: 40 },
		],
		802: [
			{ id: 80201, name: '교호운전', sub: '4:4', delay: 85, train: 32 },
			{ id: 80202, name: '교호운전', sub: '4:3', delay: 79, train: 29 },
			{ id: 80203, name: '교호운전', sub: '3:3', delay: 62, train: 25 },
			{ id: 80204, name: '비상대기', sub: '4:4', delay: 38, train: 15 },
			{ id: 80205, name: '단선운전', sub: '4:4', delay: 95, train: 40 },
			{ id: 80206, name: '단선운전', sub: '3:3', delay: 78, train: 35 },
		],
		803: [
			{ id: 80301, name: '단선운전', sub: '3:3', delay: 78, train: 35 },
			{ id: 80302, name: '단선운전', sub: '3:2', delay: 70, train: 30 },
			{ id: 80303, name: '단선운전', sub: '2:2', delay: 58, train: 25 },
			{ id: 80304, name: '교호운전', sub: '3:3', delay: 62, train: 28 },
			{ id: 80305, name: '교호운전', sub: '3:2', delay: 55, train: 22 },
			{ id: 80306, name: '비상대기', sub: '3:3', delay: 29, train: 12 },
		],
		804: [
			{ id: 80401, name: '교호운전', sub: '3:3', delay: 62, train: 28 },
			{ id: 80402, name: '교호운전', sub: '3:2', delay: 55, train: 22 },
			{ id: 80403, name: '교호운전', sub: '2:3', delay: 58, train: 24 },
			{ id: 80404, name: '교호운전', sub: '2:2', delay: 44, train: 18 },
			{ id: 80405, name: '비상대기', sub: '3:3', delay: 29, train: 12 },
			{ id: 80406, name: '단선운전', sub: '3:3', delay: 78, train: 35 },
		],
		805: [
			{ id: 80501, name: '비상대기', sub: '3:3', delay: 29, train: 12 },
			{ id: 80502, name: '비상대기', sub: '3:2', delay: 24, train: 10 },
			{ id: 80503, name: '비상대기', sub: '2:2', delay: 20, train:  8 },
			{ id: 80504, name: '교호운전', sub: '3:3', delay: 62, train: 25 },
			{ id: 80505, name: '교호운전', sub: '2:2', delay: 44, train: 18 },
			{ id: 80506, name: '단선운전', sub: '3:3', delay: 78, train: 35 },
		],
		806: [
			{ id: 80601, name: '단선운전', sub: '4:4', delay: 95, train: 40 },
			{ id: 80602, name: '단선운전', sub: '3:3', delay: 78, train: 35 },
			{ id: 80603, name: '단선운전', sub: '2:2', delay: 65, train: 28 },
			{ id: 80604, name: '교호운전', sub: '4:4', delay: 85, train: 32 },
			{ id: 80605, name: '교호운전', sub: '3:3', delay: 62, train: 25 },
			{ id: 80606, name: '비상대기', sub: '4:4', delay: 38, train: 15 },
		],
		807: [
			{ id: 80701, name: '교호운전', sub: '4:3', delay: 71, train: 25 },
			{ id: 80702, name: '교호운전', sub: '3:4', delay: 73, train: 26 },
			{ id: 80703, name: '교호운전', sub: '3:3', delay: 62, train: 22 },
			{ id: 80704, name: '비상대기', sub: '4:4', delay: 38, train: 15 },
			{ id: 80705, name: '단선운전', sub: '4:4', delay: 95, train: 40 },
			{ id: 80706, name: '단선운전', sub: '3:3', delay: 78, train: 35 },
		],
	};

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

	const renderCardList = (list, sortKey, onSelect, selectedId, emptyMsg = '목록을 선택하면 데이터가 표시됩니다.', showLabel = true) => {
		if (!list || list.length === 0) {
			return (
				<li className='card-empty'>
					<p>{emptyMsg}</p>
				</li>
			);
		}
		return [...list]
			.sort((a, b) => sortKey === 'delay' ? b.delay - a.delay : b.train - a.train)
			.map((s) => (
				<li key={s.id} className={selectedId === s.id ? 'active' : ''} onClick={() => onSelect && onSelect(s.id)}>
					{showLabel && <p className='txt-s'>{s.label}</p>}
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
	};
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
                        {simList.map((sim) => (
                            <li
                                key={sim.id}
                                className={selectedSim === sim.id ? 'active' : ''}
                                onClick={() => { setSelectedSim(sim.id); setSelectedScenario(null); setSelectedSub(null); }}
                            >
                                <div className='si-d-flex'>
                                    <p className={`status${sim.status === '진행중' ? ' ing' : ''}`}>{sim.status}</p>
                                    <div className='name-wrap'>
                                        <p className='name'>{sim.simId}</p>
                                        <p className='date'>{sim.date}</p>
                                    </div>
                                </div>
                                <p className='time'>{sim.time}</p>
                            </li>
                        ))}
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
                        <ul className='card-list2' key={`sim-${selectedSim ?? 'none'}`}>
                            {renderCardList(
                                scenarioBySim[selectedSim] || [],
                                sort1,
                                (id) => { setSelectedScenario(id); setSelectedSub(null); },
                                selectedScenario,
                                '왼쪽 시뮬레이션 목록을 선택하면 시나리오가 표시됩니다.'
                            )}
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
                        <ul className='card-list2' key={`scenario-${selectedScenario ?? 'none'}`}>
                            {renderCardList(
                                subByScenario[selectedScenario] || [],
                                sort2,
                                (id) => setSelectedSub(id),
                                selectedSub,
                                '위 시나리오를 선택하면 상세 운영 조건이 표시됩니다.',
                                false
                            )}
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

