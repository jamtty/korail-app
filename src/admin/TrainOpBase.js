import { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import Modal from '../components/Modal';
import '../assets/css/App.css';

function TrainOpBase() {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [formData, setFormData] = useState({
		opDate: '',
		trainNumber: '',
		directionCode: '',
		startStationCode: '',
		endStationCode: '',
		planStart: '',
		planEnd: '',
		trainStatus: '',
		trainTypeCode: '',
		operationCode: '',
		isOperating: ''
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
					<h1>열차운행기본</h1>
					<button type="button" className="btn-data-add" onClick={() => setIsModalOpen(true)}>데이터추가</button>
				</div>
				<div className="adm-search">
					<div className="adm-search-group">
						<label>열차운행일자</label>
						<input type="text" className="frm-input" placeholder="YYYYMMDD" />
					</div>
					<div className="adm-search-group">
						<label>열차번호</label>
						<input type="text" className="frm-input" placeholder="예: K101" />
					</div>
					<div className="adm-search-group">
						<label>열차종별코드</label>
						<input type="text" className="frm-input" placeholder="예: 10" />
					</div>
					<button type="button" className="btn-primary">검색</button>
				</div>
				<div className="adm-tbl-wrap">
					<table className="adm-table">
						<thead>
							<tr>
								<th>열차운행일자</th>
								<th>열차번호</th>
								<th>상하행구분코드</th>
								<th>출발역코드</th>
								<th>종착역코드</th>
								<th>계획출발일시</th>
								<th>계획도착일시</th>
								<th>열차상태코드</th>
								<th>열차종별코드</th>
								<th>운행구분코드</th>
								<th>열차운행여부</th>
								<th>관리</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>20250501</td>
								<td>K101</td>
								<td>D</td>
								<td>STN001</td>
								<td>STN010</td>
								<td>20250501090000</td>
								<td>20250501120000</td>
								<td>01</td>
								<td>10</td>
								<td>1</td>
								<td>Y</td>
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
								<th>열차운행일자</th>
								<td><input type="text" name="opDate" value={formData.opDate} onChange={handleInputChange} className="frm-input" /></td>
								<th>열차번호</th>
								<td><input type="text" name="trainNumber" value={formData.trainNumber} onChange={handleInputChange} className="frm-input" /></td>
							</tr>
							<tr>
								<th>상하행구분코드</th>
								<td><input type="text" name="directionCode" value={formData.directionCode} onChange={handleInputChange} className="frm-input" /></td>
								<th>출발역코드</th>
								<td><input type="text" name="startStationCode" value={formData.startStationCode} onChange={handleInputChange} className="frm-input" /></td>
							</tr>
							<tr>
								<th>종착역코드</th>
								<td><input type="text" name="endStationCode" value={formData.endStationCode} onChange={handleInputChange} className="frm-input" /></td>
								<th>계획출발일시</th>
								<td><input type="text" name="planStart" value={formData.planStart} onChange={handleInputChange} className="frm-input" /></td>
							</tr>
							<tr>
								<th>계획도착일시</th>
								<td><input type="text" name="planEnd" value={formData.planEnd} onChange={handleInputChange} className="frm-input" /></td>
								<th>열차상태코드</th>
								<td><input type="text" name="trainStatus" value={formData.trainStatus} onChange={handleInputChange} className="frm-input" /></td>
							</tr>
							<tr>
								<th>열차종별코드</th>
								<td><input type="text" name="trainTypeCode" value={formData.trainTypeCode} onChange={handleInputChange} className="frm-input" /></td>
								<th>운행구분코드</th>
								<td><input type="text" name="operationCode" value={formData.operationCode} onChange={handleInputChange} className="frm-input" /></td>
							</tr>
							<tr>
								<th>열차운행여부</th>
								<td><input type="text" name="isOperating" value={formData.isOperating} onChange={handleInputChange} className="frm-input" /></td>
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

export default TrainOpBase;
