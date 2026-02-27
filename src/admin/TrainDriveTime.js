import { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import Modal from '../components/Modal';
import TableTooltip from '../components/TableTooltip';
import '../assets/css/App.css';

function TrainDriveTime() {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [formData, setFormData] = useState({
		trainNumber: '',
		opDate: '',
		sequence: '',
		stationCode: '',
		lineCode: '',
		order: '',
		planArrive: '',
		planDepart: '',
		actualArrive: '',
		actualDepart: '',
		delay: '',
		stopReason: ''
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
					<h1>열차운전시각</h1>
					<button type="button" className="btn-data-add" onClick={() => setIsModalOpen(true)}>데이터추가</button>
				</div>
				<div className="adm-search">
					<div className="adm-search-group">
						<label>열차번호</label>
						<input type="text" className="frm-input" placeholder="예: K101" />
					</div>
					<div className="adm-search-group">
						<label>역코드</label>
						<input type="text" className="frm-input" placeholder="예: STN001" />
					</div>
					<div className="adm-search-group">
						<label>열차운행일자</label>
						<input type="text" className="frm-input" placeholder="YYYYMMDD" />
					</div>
					<button type="button" className="btn-primary"></button>
				</div>
				<TableTooltip className="adm-tbl-wrap">
					<table className="adm-table">
						<thead>
							<tr>
								<th>열차번호</th>
								<th>열차운행<br />일자</th>
								<th>일련번호</th>
								<th>역코드</th>
								<th>선코드</th>
								<th>운행순서</th>
								<th>계획도착</th>
								<th>계획출발</th>
								<th>실제도착</th>
								<th>실제출발</th>
								<th>지연시간</th>
								<th>정차사유</th>
								<th>관리</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>K101</td>
								<td>20250501</td>
								<td>1</td>
								<td>STN001</td>
								<td>L1</td>
								<td>1</td>
								<td>20250501090000</td>
								<td>20250501090500</td>
								<td>20250501090000</td>
								<td>20250501090500</td>
								<td>0</td>
								<td>01</td>
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
								<th>열차번호</th>
								<td><input type="text" name="trainNumber" value={formData.trainNumber} onChange={handleInputChange} className="frm-input" /></td>
								<th>열차운행일자</th>
								<td><input type="text" name="opDate" value={formData.opDate} onChange={handleInputChange} className="frm-input" /></td>
							</tr>
							<tr>
								<th>일련번호</th>
								<td><input type="text" name="sequence" value={formData.sequence} onChange={handleInputChange} className="frm-input" /></td>
								<th>역코드</th>
								<td><input type="text" name="stationCode" value={formData.stationCode} onChange={handleInputChange} className="frm-input" /></td>
							</tr>
							<tr>
								<th>선코드</th>
								<td><input type="text" name="lineCode" value={formData.lineCode} onChange={handleInputChange} className="frm-input" /></td>
								<th>운행순서</th>
								<td><input type="text" name="order" value={formData.order} onChange={handleInputChange} className="frm-input" /></td>
							</tr>
							<tr>
								<th>계획도착</th>
								<td><input type="text" name="planArrive" value={formData.planArrive} onChange={handleInputChange} className="frm-input" /></td>
								<th>계획출발</th>
								<td><input type="text" name="planDepart" value={formData.planDepart} onChange={handleInputChange} className="frm-input" /></td>
							</tr>
							<tr>
								<th>실제도착</th>
								<td><input type="text" name="actualArrive" value={formData.actualArrive} onChange={handleInputChange} className="frm-input" /></td>
								<th>실제출발</th>
								<td><input type="text" name="actualDepart" value={formData.actualDepart} onChange={handleInputChange} className="frm-input" /></td>
							</tr>
							<tr>
								<th>지연시간</th>
								<td><input type="text" name="delay" value={formData.delay} onChange={handleInputChange} className="frm-input" /></td>
								<th>정차사유</th>
								<td><input type="text" name="stopReason" value={formData.stopReason} onChange={handleInputChange} className="frm-input" /></td>
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

export default TrainDriveTime;
