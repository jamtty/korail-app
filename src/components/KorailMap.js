import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

function KorailMap({ isSimulationActive, onDangerTrainClick, onMapClick, dangerTrainIndex = 3 }) {

// 역 마커 아이콘 설정
const stationIcon = L.divIcon({
	className: 'custom-marker-icon',
	html: '<div style="background-color: #333; width: 10px; height: 10px; border-radius: 50%; border: 1px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>',
	iconSize: [16, 16],
	iconAnchor: [8, 8],
	popupAnchor: [0, -8]
});

// 기차 아이콘 설정
const trainIcon = L.divIcon({
	className: 'train-icon',
	html: `<svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
		<g filter="url(#filter0_d_225_269)">
		<rect x="1" y="1" width="29.5159" height="29.5" rx="10" fill="#0164E6"/>
		</g>
		<path d="M20.196 7.70312H11.3197C9.70091 7.70312 8.37891 9.01941 8.37891 10.6312V20.866C8.37891 22.4778 9.70091 23.794 11.3197 23.794H20.196C21.8148 23.794 23.1368 22.4778 23.1368 20.866V10.6043C23.1099 8.99255 21.8148 7.70312 20.196 7.70312ZM11.4816 21.8062C10.969 21.8062 10.5643 21.4032 10.5643 20.8928C10.5643 20.3824 10.969 19.9795 11.4816 19.9795C11.9942 19.9795 12.3989 20.3824 12.3989 20.8928C12.3989 21.3764 11.9942 21.8062 11.4816 21.8062ZM20.0342 21.8062C19.5215 21.8062 19.1169 21.4032 19.1169 20.8928C19.1169 20.3824 19.5215 19.9795 20.0342 19.9795C20.5468 19.9795 20.9515 20.3824 20.9515 20.8928C20.9515 21.3764 20.5468 21.8062 20.0342 21.8062ZM21.4371 16.8097H10.1056V10.8998H21.4371V16.8097Z" fill="white"/>
		<defs>
		<filter id="filter0_d_225_269" x="0" y="0" width="37.5156" height="37.5" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
		<feFlood flood-opacity="0" result="BackgroundImageFix"/>
		<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
		<feOffset dx="3" dy="3"/>
		<feGaussianBlur stdDeviation="2"/>
		<feComposite in2="hardAlpha" operator="out"/>
		<feColorMatrix type="matrix" values="0 0 0 0 0.113725 0 0 0 0 0.521569 0 0 0 0 1 0 0 0 0.15 0"/>
		<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_225_269"/>
		<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_225_269" result="shape"/>
		</filter>
		</defs>
	</svg>`,
	iconSize: [38, 38],
	iconAnchor: [19, 19],
});

// 노란색 기차 아이콘 설정
const trainIconYellow = L.divIcon({
	className: 'train-icon',
	html: `<svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
		<g filter="url(#filter0_d_225_278)">
		<rect x="1" y="1" width="29.5159" height="29.5" rx="10" fill="#FFD900"/>
		</g>
		<path d="M20.196 7.70312H11.3197C9.70091 7.70312 8.37891 9.01941 8.37891 10.6312V20.866C8.37891 22.4778 9.70091 23.794 11.3197 23.794H20.196C21.8148 23.794 23.1368 22.4778 23.1368 20.866V10.6043C23.1099 8.99255 21.8148 7.70312 20.196 7.70312ZM11.4816 21.8062C10.969 21.8062 10.5643 21.4032 10.5643 20.8928C10.5643 20.3824 10.969 19.9795 11.4816 19.9795C11.9942 19.9795 12.3989 20.3824 12.3989 20.8928C12.3989 21.3764 11.9942 21.8062 11.4816 21.8062ZM20.0342 21.8062C19.5215 21.8062 19.1169 21.4032 19.1169 20.8928C19.1169 20.3824 19.5215 19.9795 20.0342 19.9795C20.5468 19.9795 20.9515 20.3824 20.9515 20.8928C20.9515 21.3764 20.5468 21.8062 20.0342 21.8062ZM21.4371 16.8097H10.1056V10.8998H21.4371V16.8097Z" fill="white"/>
		<defs>
		<filter id="filter0_d_225_278" x="0" y="0" width="37.5156" height="37.5" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
		<feFlood flood-opacity="0" result="BackgroundImageFix"/>
		<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
		<feOffset dx="3" dy="3"/>
		<feGaussianBlur stdDeviation="2"/>
		<feComposite in2="hardAlpha" operator="out"/>
		<feColorMatrix type="matrix" values="0 0 0 0 0.113725 0 0 0 0 0.521569 0 0 0 0 1 0 0 0 0.15 0"/>
		<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_225_278"/>
		<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_225_278" result="shape"/>
		</filter>
		</defs>
	</svg>`,
	iconSize: [38, 38],
	iconAnchor: [19, 19],
});

// 초록색 기차 아이콘 설정
const trainIconGreen = L.divIcon({
	className: 'train-icon',
	html: `<svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
		<g filter="url(#filter0_d_225_251)">
		<rect x="1" y="1" width="29.5159" height="29.5" rx="10" fill="#00D3C1"/>
		</g>
		<path d="M20.196 7.70312H11.3197C9.70091 7.70312 8.37891 9.01941 8.37891 10.6312V20.866C8.37891 22.4778 9.70091 23.794 11.3197 23.794H20.196C21.8148 23.794 23.1368 22.4778 23.1368 20.866V10.6043C23.1099 8.99255 21.8148 7.70312 20.196 7.70312ZM11.4816 21.8062C10.969 21.8062 10.5643 21.4032 10.5643 20.8928C10.5643 20.3824 10.969 19.9795 11.4816 19.9795C11.9942 19.9795 12.3989 20.3824 12.3989 20.8928C12.3989 21.3764 11.9942 21.8062 11.4816 21.8062ZM20.0342 21.8062C19.5215 21.8062 19.1169 21.4032 19.1169 20.8928C19.1169 20.3824 19.5215 19.9795 20.0342 19.9795C20.5468 19.9795 20.9515 20.3824 20.9515 20.8928C20.9515 21.3764 20.5468 21.8062 20.0342 21.8062ZM21.4371 16.8097H10.1056V10.8998H21.4371V16.8097Z" fill="white"/>
		<defs>
		<filter id="filter0_d_225_251" x="0" y="0" width="37.5156" height="37.5" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
		<feFlood flood-opacity="0" result="BackgroundImageFix"/>
		<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
		<feOffset dx="3" dy="3"/>
		<feGaussianBlur stdDeviation="2"/>
		<feComposite in2="hardAlpha" operator="out"/>
		<feColorMatrix type="matrix" values="0 0 0 0 0.113725 0 0 0 0 0.521569 0 0 0 0 1 0 0 0 0.15 0"/>
		<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_225_251"/>
		<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_225_251" result="shape"/>
		</filter>
		</defs>
	</svg>`,
	iconSize: [38, 38],
	iconAnchor: [19, 19],
});

// 경고 기차 아이콘 설정 (배경 애니메이션 포함)
const trainIconDanger = L.divIcon({
	className: 'train-icon-danger',
	html: `
		<div style="position: relative; width: 38px; height: 38px;">
			<div class="danger-wave-container">
				<svg style="position: relative; z-index: 10;" width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
					<g filter="url(#filter0_d_225_291)">
					<rect x="1" y="1" width="29.5159" height="29.5" rx="10" fill="#FF4400"/>
					</g>
					<path d="M20.196 7.70312H11.3197C9.70091 7.70312 8.37891 9.01941 8.37891 10.6312V20.866C8.37891 22.4778 9.70091 23.794 11.3197 23.794H20.196C21.8148 23.794 23.1368 22.4778 23.1368 20.866V10.6043C23.1099 8.99255 21.8148 7.70312 20.196 7.70312ZM11.4816 21.8062C10.969 21.8062 10.5643 21.4032 10.5643 20.8928C10.5643 20.3824 10.969 19.9795 11.4816 19.9795C11.9942 19.9795 12.3989 20.3824 12.3989 20.8928C12.3989 21.3764 11.9942 21.8062 11.4816 21.8062ZM20.0342 21.8062C19.5215 21.8062 19.1169 21.4032 19.1169 20.8928C19.1169 20.3824 19.5215 19.9795 20.0342 19.9795C20.5468 19.9795 20.9515 20.3824 20.9515 20.8928C20.9515 21.3764 20.5468 21.8062 20.0342 21.8062ZM21.4371 16.8097H10.1056V10.8998H21.4371V16.8097Z" fill="white"/>
					<defs>
					<filter id="filter0_d_225_291" x="0" y="0" width="37.5156" height="37.5" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
					<feFlood flood-opacity="0" result="BackgroundImageFix"/>
					<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
					<feOffset dx="3" dy="3"/>
					<feGaussianBlur stdDeviation="2"/>
					<feComposite in2="hardAlpha" operator="out"/>
					<feColorMatrix type="matrix" values="0 0 0 0 0.113725 0 0 0 0 0.521569 0 0 0 0 1 0 0 0 0.15 0"/>
					<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_225_291"/>
					<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_225_291" result="shape"/>
					</filter>
					</defs>
				</svg>
				<div class="danger-wave danger-wave-1"></div>
				<div class="danger-wave danger-wave-2"></div>
				<div class="danger-wave danger-wave-3"></div>
			</div>
		</div>
	`,
	iconSize: [38, 38],
	iconAnchor: [19, 19],
});

	const mapRef = useRef(null);
	const mapInstanceRef = useRef(null);
	const routeLayerRef = useRef(null);
	const overlayRef = useRef(null);
	const markersRef = useRef([]);
	const trainsRef = useRef([]); // 모든 기차들을 배열로 관리
	const animationIdRef = useRef(null);

	// 서울-부산 경로 좌표 (KTX 경부선 주요 역)
	const ktxRoute = [
		{ name: '서울역', lat: 37.5547, lng: 126.9707 },
		{ name: '광명', lat: 37.4158, lng: 126.8853 },
		{ name: '수원', lat: 37.2636, lng: 127.0286 },
		{ name: '오송', lat: 36.6165, lng: 127.2960 },
		{ name: '대전역', lat: 36.3315, lng: 127.4349 },
		{ name: '김천구미', lat: 36.1399, lng: 128.1156 },
		{ name: '동대구', lat: 35.8792, lng: 128.5942 },
		{ name: '밀양', lat: 35.5038, lng: 128.7461 },
		{ name: '부산역', lat: 35.1151, lng: 129.0403 },
	];

	// KTX-이음 경로 (수도권 순환)
	const ktxEumRoute = [
		{ name: '서울역', lat: 37.5547, lng: 126.9707 },
		{ name: '청량리', lat: 37.5800, lng: 127.0410 },
		{ name: '상봉', lat: 37.5965, lng: 127.0863 },
		{ name: '양평', lat: 37.4878, lng: 127.4951 },
		{ name: '원주', lat: 37.3422, lng: 127.9450 },
		{ name: '제천', lat: 37.1328, lng: 128.1906 },
		{ name: '단양', lat: 36.9845, lng: 128.3658 },
		{ name: '풍기', lat: 36.9988, lng: 128.4065 },
		{ name: '영주', lat: 36.8056, lng: 128.6239 },
		{ name: '안동', lat: 36.5684, lng: 128.7294 },
		{ name: '부산역', lat: 35.1151, lng: 129.0403 },
	];

	useEffect(() => {
		if (!mapRef.current || mapInstanceRef.current) return;

		// 지도 초기화 (서울 중심)
		const map = L.map(mapRef.current, {
			center: [36.5, 127.5], // 한국 중심 좌표
			zoom: 8,
			zoomControl: false, // 기본 컨트롤 비활성화
		});

		// 줌 컨트롤을 오른쪽 상단에 추가
		L.control.zoom({
			position: 'topright'
		}).addTo(map);

		mapInstanceRef.current = map;

		// OpenStreetMap 타일 레이어 추가
		L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
			maxZoom: 19,
		}).addTo(map);

		// 오버레이 pane 생성 (타일 위, 마커/경로 아래)
		map.createPane('overlayPane');
		map.getPane('overlayPane').style.zIndex = 350;
		map.getPane('overlayPane').style.pointerEvents = 'none';

		// 경로용 pane 생성 (오버레이 위)
		map.createPane('routePane');
		map.getPane('routePane').style.zIndex = 1000;

		// 역 마커용 pane 생성 (경로 위)
		map.createPane('stationPane');
		map.getPane('stationPane').style.zIndex = 1010;

		// 경고 배경용 pane 생성
		map.createPane('warningPane');
		map.getPane('warningPane').style.zIndex = 1050;

		// 기차용 pane 생성 (모든 것 위)
		map.createPane('trainPane');
		map.getPane('trainPane').style.zIndex = 1100;

		// 지도 클릭 이벤트 추가
		if (onMapClick) {
			map.on('click', onMapClick);
		}

		// 컴포넌트 언마운트 시 지도 정리
		return () => {
			if (mapInstanceRef.current) {
				mapInstanceRef.current.remove();
				mapInstanceRef.current = null;
			}
		};
	}, []);

	// 시뮬레이션 활성화 시 경로 표시 및 애니메이션
	useEffect(() => {
		if (!mapInstanceRef.current) return;

		// 기존 애니메이션 정지
		if (animationIdRef.current) {
			cancelAnimationFrame(animationIdRef.current);
			animationIdRef.current = null;
		}

		// 기존 모든 기차 제거
		trainsRef.current.forEach(train => {
			if (train.marker) mapInstanceRef.current.removeLayer(train.marker);
			if (train.label) mapInstanceRef.current.removeLayer(train.label);
		});
		trainsRef.current = [];

		// 기존 마커 제거
		markersRef.current.forEach(marker => {
			mapInstanceRef.current.removeLayer(marker);
		});
		markersRef.current = [];

		// 기존 오버레이 제거
		if (overlayRef.current) {
			mapInstanceRef.current.removeLayer(overlayRef.current);
			overlayRef.current = null;
		}

		// 기존 경로 제거
		if (routeLayerRef.current) {
			mapInstanceRef.current.removeLayer(routeLayerRef.current);
			routeLayerRef.current = null;
		}

		// 시뮬레이션 활성화 시
		if (isSimulationActive) {
			// 오버레이 추가 (지도 전체를 덮는 사각형)
			const bounds = mapInstanceRef.current.getBounds();
			overlayRef.current = L.rectangle(bounds, {
				color: 'black',
				fillColor: 'black',
				fillOpacity: 0.6,
				weight: 0,
				pane: 'overlayPane',
				interactive: false
			}).addTo(mapInstanceRef.current);

			// 지도 이동 시 오버레이도 따라가도록
			const updateOverlay = () => {
				if (overlayRef.current) {
					const newBounds = mapInstanceRef.current.getBounds();
					overlayRef.current.setBounds(newBounds);
				}
			};
			mapInstanceRef.current.on('move', updateOverlay);
			mapInstanceRef.current.on('zoom', updateOverlay);

			// 역 마커 추가 (KTX 경부선)
			ktxRoute.forEach(station => {
				const marker = L.marker([station.lat, station.lng], { 
					icon: stationIcon,
					pane: 'stationPane'
				}).addTo(mapInstanceRef.current);
				marker.bindPopup(`<b>${station.name}</b>`);
				markersRef.current.push(marker);
			});

			// 역 마커 추가 (KTX-이음)
			ktxEumRoute.forEach(station => {
				const marker = L.marker([station.lat, station.lng], { 
					icon: stationIcon,
					pane: 'stationPane'
				}).addTo(mapInstanceRef.current);
				marker.bindPopup(`<b>${station.name} (이음)</b>`);
				markersRef.current.push(marker);
			});

			// 경로 그리기 (KTX 경부선)
			const routeCoords = ktxRoute.map(station => [station.lat, station.lng]);
			routeLayerRef.current = L.polyline(routeCoords, {
				color: '#0164E6',
				weight: 6,
				opacity: 1,
				pane: 'routePane'
			}).addTo(mapInstanceRef.current);

			// 경로 그리기 (KTX-이음)
			const eumRouteCoords = ktxEumRoute.map(station => [station.lat, station.lng]);
			L.polyline(eumRouteCoords, {
				color: '#00D3C1',
				weight: 3,
				opacity: 1,
				pane: 'routePane'
			}).addTo(mapInstanceRef.current);

			// 경로의 LatLng 배열 생성
			const routeLatLngs = routeCoords.map(coord => L.latLng(coord[0], coord[1]));
			const eumRouteLatLngs = eumRouteCoords.map(coord => L.latLng(coord[0], coord[1]));

			// 5개의 기차 생성 (KTX 경부선 4대, KTX-이음 1대)
			const trains = [
				{
					id: 'KTX1001',
					icon: trainIcon,
					color: '#EDF6FF',
					fontColor: '#0164E6',
					startIndex: 0, // 서울역 (정차)
					endIndex: 8, // 서울역 (정차)
					isMoving: true,
					routeType: 'ktx'
				},
				{
					id: 'KTX1010',
					icon: trainIconDanger,
					color: '#FFE8E0',
					fontColor: '#FF4400',
					startIndex: dangerTrainIndex, // 워크플로우별 다른 역 (정지)
					endIndex: dangerTrainIndex, // 워크플로우별 다른 역 (정지)
					isMoving: false,
					routeType: 'ktx',
					isDanger: true
				},
				{
					id: 'KTX2020',
					icon: trainIcon,
					color: '#EDF6FF',
					fontColor: '#0164E6',
					startIndex: 4, // 대전
					endIndex: 8, // 부산
					isMoving: true,
					routeType: 'ktx'
				},
				{
					id: 'KTX3030',
					icon: trainIconYellow,
					color: '#EDF6FF',
					fontColor: '#C5A800',
					startIndex: 8, // 부산 (정차)
					endIndex: 8, // 부산 (정차)
					isMoving: false,
					routeType: 'ktx'
				},
				{
					id: 'KTX-이음<br />00807',
					icon: trainIconGreen,
					color: '#EDF6FF',
					fontColor: '#00D3C1',
					startIndex: 0, // 서울역
					endIndex: 10, // 부산
					isMoving: true,
					routeType: 'eum'
				}
			];

			trains.forEach(train => {
				const trainRouteLatLngs = train.routeType === 'eum' ? eumRouteLatLngs : routeLatLngs;
				const startPos = trainRouteLatLngs[train.startIndex];
				
				// 기차 마커 생성
				const marker = L.marker(startPos, {
					icon: train.icon,
					pane: 'trainPane'
				}).addTo(mapInstanceRef.current);

				// 위험 기차일 경우 클릭 이벤트 추가
				if (train.isDanger && onDangerTrainClick) {
					marker.on('click', () => {
						onDangerTrainClick();
					});
				}

				// 기차 라벨 생성 (이음 경로와 일반 KTX 별도 처리)
				let labelIcon;
				if (train.routeType === 'eum') {
					// KTX-이음 라벨
					labelIcon = L.divIcon({
						className: 'train-label',
						html: `<div style="background-color: ${train.color}; color: ${train.fontColor}; line-height:100%; padding: 1px; text-align:center; border-radius: 4px; font-size: 10px; font-weight: bold; white-space: nowrap; box-shadow: 0 2px 4px rgba(0,0,0,0.3);">${train.id}</div>`,
						iconSize: [60, 24],
						iconAnchor: [-14, 15]
					});
				} else {
					// 일반 KTX 라벨
					labelIcon = L.divIcon({
						className: 'train-label',
						html: `<div style="background-color: ${train.color}; color: ${train.fontColor}; padding: 1px; text-align:center; border-radius: 4px; font-size: 10px; font-weight: bold; white-space: nowrap; box-shadow: 0 2px 4px rgba(0,0,0,0.3);">${train.id}</div>`,
						iconSize: [60, 24],
						iconAnchor: [-14, 13]
					});
				}

				const label = L.marker(startPos, {
					icon: labelIcon,
					pane: 'trainPane'
				}).addTo(mapInstanceRef.current);

				trainsRef.current.push({
					...train,
					marker,
					label,
					routeLatLngs: trainRouteLatLngs,
					totalDistance: 0 // 나중에 계산
				});
			});

			// 경로 상의 특정 거리에 해당하는 위치 계산
			const getPositionOnRoute = (route, distance) => {
				if (!route || route.length === 0) return null;
				if (distance === 0) return route[0];

				let distanceCovered = 0;
				for (let i = 0; i < route.length - 1; i++) {
					const startPoint = route[i];
					const endPoint = route[i + 1];
					const segmentDistance = startPoint.distanceTo(endPoint);

					if (distanceCovered + segmentDistance >= distance) {
						const distanceIntoSegment = distance - distanceCovered;
						if (segmentDistance === 0) return startPoint;

						const ratio = distanceIntoSegment / segmentDistance;

						if (isNaN(ratio) || ratio < 0 || ratio > 1) {
							return startPoint;
						}

						const lat = startPoint.lat + (endPoint.lat - startPoint.lat) * ratio;
						const lng = startPoint.lng + (endPoint.lng - startPoint.lng) * ratio;
						return L.latLng(lat, lng);
					}

					distanceCovered += segmentDistance;
				}
				return route[route.length - 1];
			};

			// 애니메이션 시작
			const duration = 120000; // 120초 (2분)
			let startTime = null;

			const animate = (currentTime) => {
				if (!startTime) startTime = currentTime;
				const elapsedTime = currentTime - startTime;
				let progress = (elapsedTime / duration);

				// 반복
				if (progress >= 1) {
					progress = 0;
					startTime = currentTime;
				}

				// 각 기차 업데이트
				trainsRef.current.forEach(train => {
					if (train.isMoving) {
						// 해당 구간의 경로만 추출
						const trainRoute = train.routeLatLngs.slice(train.startIndex, train.endIndex + 1);
						
						// 구간 거리 계산
						let segmentDistance = 0;
						for (let i = 0; i < trainRoute.length - 1; i++) {
							segmentDistance += trainRoute[i].distanceTo(trainRoute[i + 1]);
						}

						const distanceToTravel = segmentDistance * progress;
						const newPos = getPositionOnRoute(trainRoute, distanceToTravel);

						if (newPos && train.marker) {
							train.marker.setLatLng(newPos);
							if (train.label) {
								train.label.setLatLng(newPos);
							}
						}
					}
				});

				animationIdRef.current = requestAnimationFrame(animate);
			};

			animationIdRef.current = requestAnimationFrame(animate);
		}

		// cleanup
		return () => {
			if (animationIdRef.current) {
				cancelAnimationFrame(animationIdRef.current);
				animationIdRef.current = null;
			}
		};
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isSimulationActive, dangerTrainIndex]);

	return (
		<div 
			ref={mapRef} 
			style={{ 
				width: '100%', 
				height: '100%',
				position: 'relative'
			}}
		/>
	);
}

export default KorailMap;
