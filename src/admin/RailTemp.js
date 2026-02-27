import { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import Modal from '../components/Modal';
import TableTooltip from '../components/TableTooltip';
import '../assets/css/App.css';

function RailTemp() {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [formData, setFormData] = useState({
		sensorId: '',
		headquarters: '',
		installLocation: '',
		railTemp: '',
		airTemp: '',
		batteryVoltage: '',
		measureTime: '',
		lineName: '',
		railTempAlert: '',
		todayMaxTemp: '',
		maxTempTime: ''
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
					<h1>레일온도 정보</h1>
					<button type="button" className="btn-data-add" onClick={() => setIsModalOpen(true)}>데이터추가</button>
				</div>
				<div className="adm-search">
					<div className="adm-search-group">
						<label>센서ID</label>
						<input type="text" className="frm-input" placeholder="예: SNS_001" />
					</div>
					<div className="adm-search-group">
						<label>설치위치명</label>
						<input type="text" className="frm-input" placeholder="예: 서울-용산 구간" />
					</div>
					<div className="adm-search-group">
						<label>노선명</label>
						<input type="text" className="frm-input" placeholder="예: 경부선" />
					</div>
					<button type="button" className="btn-primary"></button>
				</div>
				<TableTooltip className="adm-tbl-wrap">
					<table className="adm-table">
						<thead>
							<tr>
								<th>센서ID</th>
								<th>본부명</th>
								<th>설치<br />위치명</th>
								<th>레일<br />온도값</th>
								<th>대기<br />온도값</th>
								<th>배터리<br />전압값</th>
								<th>측정일시</th>
								<th>노선명</th>
								<th>레일온도<br />이상여부</th>
								<th>금일<br />최고온도</th>
								<th>최고온도<br />발생시각</th>
								<th>관리</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>SNS_001</td>
								<td>수도권본부</td>
								<td>서울-용산 구간</td>
								<td>25.4</td>
								<td>24.0</td>
								<td>12.5</td>
								<td>2025-05-01 13:00</td>
								<td>경부선</td>
								<td>N</td>
								<td>26.0</td>
								<td>14:00</td>
								<td>
									<div className="action-buttons">
										<button type="button" className="btn btn-edit"></button><button type="button" className="btn btn-delete"></button>
									</div>
								</td>
							</tr>
						</tbody>
					</table>
				</TableTooltip>
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
								<th>센서ID</th>
								<td><input type="text" name="sensorId" value={formData.sensorId} onChange={handleInputChange} className="frm-input" /></td>
								<th>본부명</th>
								<td><input type="text" name="headquarters" value={formData.headquarters} onChange={handleInputChange} className="frm-input" /></td>
							</tr>
							<tr>
								<th>설치위치명</th>
								<td><input type="text" name="installLocation" value={formData.installLocation} onChange={handleInputChange} className="frm-input" /></td>
								<th>레일온도값</th>
								<td><input type="text" name="railTemp" value={formData.railTemp} onChange={handleInputChange} className="frm-input" /></td>
							</tr>
							<tr>
								<th>대기온도값</th>
								<td><input type="text" name="airTemp" value={formData.airTemp} onChange={handleInputChange} className="frm-input" /></td>
								<th>배터리전압값</th>
								<td><input type="text" name="batteryVoltage" value={formData.batteryVoltage} onChange={handleInputChange} className="frm-input" /></td>
							</tr>
							<tr>
								<th>측정일시</th>
								<td><input type="text" name="measureTime" value={formData.measureTime} onChange={handleInputChange} className="frm-input" /></td>
								<th>노선명</th>
								<td><input type="text" name="lineName" value={formData.lineName} onChange={handleInputChange} className="frm-input" /></td>
							</tr>
							<tr>
								<th>레일온도이상여부</th>
								<td><input type="text" name="railTempAlert" value={formData.railTempAlert} onChange={handleInputChange} className="frm-input" /></td>
								<th>금일최고온도</th>
								<td><input type="text" name="todayMaxTemp" value={formData.todayMaxTemp} onChange={handleInputChange} className="frm-input" /></td>
							</tr>
							<tr>
								<th>최고온도발생시각</th>
								<td><input type="text" name="maxTempTime" value={formData.maxTempTime} onChange={handleInputChange} className="frm-input" /></td>
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

export default RailTemp;
