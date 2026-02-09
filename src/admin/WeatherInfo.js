import { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import Modal from '../components/Modal';
import '../assets/css/App.css';

function WeatherInfo() {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [formData, setFormData] = useState({
		stationName: '',
		lineName: '',
		controlStandard: '',
		limitStandard: '',
		rainfall15: '',
		rainfall60: '',
		totalRainfall: '',
		windSpeed: '',
		snowDepth: '',
		temperature: '',
		weatherAlert: '',
		longitude: '',
		latitude: '',
		measureTime: '',
		inputTime: ''
	});

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData(prev => ({
			...prev,
			[name]: value
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log('등록 데이터:', formData);
		setIsModalOpen(false);
	};

	return (
		<div className="adm-container">
			<Header />
			<div className="adm-contents">
				<div className="adm-title">
					<h1>철도기상 정보</h1>
					<button type="button" className="btn-data-add" onClick={() => setIsModalOpen(true)}>데이터추가</button>
				</div>
				<div className="adm-search">
					<div className="adm-search-group">
						<label>역명</label>
						<input type="text" className="frm-input" placeholder="예: 서울역" />
					</div>
					<div className="adm-search-group">
						<label>노선명</label>
						<select className="select">
							<option value="">전체</option>
							<option value="경부선">경부선</option>
						</select>
					</div>
					<div className="adm-search-group">
						<label>기상특보내용</label>
						<input type="text" className="frm-input" placeholder="예: 없음" />
					</div>
					<button type="button" className="btn-primary">검색</button>
				</div>
				<div className="adm-tbl-wrap">
					<table className="adm-table">
						<thead>
							<tr>
								<th>역명</th>
								<th>노선명</th>
								<th>운행통제기준내용</th>
								<th>제한기준내용</th>
								<th>강수량_15분</th>
								<th>강수량_60분</th>
								<th>누적강수량</th>
								<th>풍속값</th>
								<th>적설값</th>
								<th>기온값</th>
								<th>기상특보내용</th>
								<th>경도</th>
								<th>위도</th>
								<th>강수측정시각</th>
								<th>입력일시</th>
								<th>관리</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>서울역</td>
								<td>경부선</td>
								<td>정상</td>
								<td>없음</td>
								<td>0.0</td>
								<td>0.0</td>
								<td>10.5</td>
								<td>2.3</td>
								<td>0.0</td>
								<td>15.4</td>
								<td>없음</td>
								<td>126.97</td>
								<td>37.55</td>
								<td>2025-05-01 12:00</td>
								<td>2025-05-01 12:05</td>
								<td>
									<div className="action-buttons">
										<button type="button" className="btn btn-edit">수정</button><button type="button" className="btn btn-delete">삭제</button>
									</div>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
			<Footer />

			<Modal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				title="데이터 추가"
				width="1200px"
			>
				<form onSubmit={handleSubmit}>
					<table className="modal-table">
						<tbody>
							<tr>
								<th>역명</th>
								<td><input type="text" name="stationName" value={formData.stationName} onChange={handleInputChange} className="frm-input" /></td>
								<th>노선명</th>
								<td><input type="text" name="lineName" value={formData.lineName} onChange={handleInputChange} className="frm-input" /></td>
							</tr>
							<tr>
								<th>운행통제기준내용</th>
								<td><input type="text" name="controlStandard" value={formData.controlStandard} onChange={handleInputChange} className="frm-input" /></td>
								<th>제한기준내용</th>
								<td><input type="text" name="limitStandard" value={formData.limitStandard} onChange={handleInputChange} className="frm-input" /></td>
							</tr>
							<tr>
								<th>강수량_15분</th>
								<td><input type="text" name="rainfall15" value={formData.rainfall15} onChange={handleInputChange} className="frm-input" /></td>
								<th>강수량_60분</th>
								<td><input type="text" name="rainfall60" value={formData.rainfall60} onChange={handleInputChange} className="frm-input" /></td>
							</tr>
							<tr>
								<th>누적강수량</th>
								<td><input type="text" name="totalRainfall" value={formData.totalRainfall} onChange={handleInputChange} className="frm-input" /></td>
								<th>풍속값</th>
								<td><input type="text" name="windSpeed" value={formData.windSpeed} onChange={handleInputChange} className="frm-input" /></td>
							</tr>
							<tr>
								<th>적설값</th>
								<td><input type="text" name="snowDepth" value={formData.snowDepth} onChange={handleInputChange} className="frm-input" /></td>
								<th>기온값</th>
								<td><input type="text" name="temperature" value={formData.temperature} onChange={handleInputChange} className="frm-input" /></td>
							</tr>
							<tr>
								<th>기상특보내용</th>
								<td><input type="text" name="weatherAlert" value={formData.weatherAlert} onChange={handleInputChange} className="frm-input" /></td>
								<th>경도</th>
								<td><input type="text" name="longitude" value={formData.longitude} onChange={handleInputChange} className="frm-input" /></td>
							</tr>
							<tr>
								<th>위도</th>
								<td><input type="text" name="latitude" value={formData.latitude} onChange={handleInputChange} className="frm-input" /></td>
								<th>강수측정시각</th>
								<td><input type="text" name="measureTime" value={formData.measureTime} onChange={handleInputChange} className="frm-input" /></td>
							</tr>
							<tr>
								<th>입력일시</th>
								<td><input type="text" name="inputTime" value={formData.inputTime} onChange={handleInputChange} className="frm-input" /></td>
								<th></th>
								<td></td>
							</tr>
						</tbody>
					</table>
					<div className="modal-footer">
						<button type="submit" className="btn-submit">등록하기</button>
					</div>
				</form>
			</Modal>
		</div>
	);
}

export default WeatherInfo;
