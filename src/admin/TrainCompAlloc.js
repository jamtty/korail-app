import { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import Modal from '../components/Modal';
import TableTooltip from '../components/TableTooltip';
import '../assets/css/App.css';

function TrainCompAlloc() {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [formData, setFormData] = useState({
		trainNumber: '',
		opDate: '',
		sequence: '',
		operationNumber: '',
		operationDate: '',
		formationNumber: '',
		order: '',
		assignStart: '',
		assignEnd: '',
		assignStartTime: '',
		assignEndTime: ''
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
					<h1>편성충당내역</h1>
					<button type="button" className="btn-data-add" onClick={() => setIsModalOpen(true)}>데이터추가</button>
				</div>
				<div className="adm-search">
					<div className="adm-search-group">
						<label>열차번호</label>
						<input type="text" className="frm-input" placeholder="예: K101" />
					</div>
					<div className="adm-search-group">
						<label>편성번호</label>
						<input type="text" className="frm-input" placeholder="예: 1C1019" />
					</div>
					<div className="adm-search-group">
						<label>차량운용일자</label>
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
								<th>차량운용<br />번호</th>
								<th>차량운용<br />일자</th>
								<th>편성번호</th>
								<th>운용열차<br />순서</th>
								<th>충당<br />시작역</th>
								<th>충당<br />종료역</th>
								<th>충당시작<br />일시</th>
								<th>충당종료<br />일시</th>
								<th>관리</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>K101</td>
								<td>20250501</td>
								<td>1</td>
								<td>OP001</td>
								<td>20250501</td>
								<td>1C1019</td>
								<td>1</td>
								<td>STN001</td>
								<td>STN010</td>
								<td>20250501083000</td>
								<td>20250501130000</td>
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
								<th>차량운용번호</th>
								<td><input type="text" name="operationNumber" value={formData.operationNumber} onChange={handleInputChange} className="frm-input" /></td>
							</tr>
							<tr>
								<th>차량운용일자</th>
								<td><input type="text" name="operationDate" value={formData.operationDate} onChange={handleInputChange} className="frm-input" /></td>
								<th>편성번호</th>
								<td><input type="text" name="formationNumber" value={formData.formationNumber} onChange={handleInputChange} className="frm-input" /></td>
							</tr>
							<tr>
								<th>운용열차순서</th>
								<td><input type="text" name="order" value={formData.order} onChange={handleInputChange} className="frm-input" /></td>
								<th>충당시작역</th>
								<td><input type="text" name="assignStart" value={formData.assignStart} onChange={handleInputChange} className="frm-input" /></td>
							</tr>
							<tr>
								<th>충당종료역</th>
								<td><input type="text" name="assignEnd" value={formData.assignEnd} onChange={handleInputChange} className="frm-input" /></td>
								<th>충당시작일시</th>
								<td><input type="text" name="assignStartTime" value={formData.assignStartTime} onChange={handleInputChange} className="frm-input" /></td>
							</tr>
							<tr>
								<th>충당종료일시</th>
								<td><input type="text" name="assignEndTime" value={formData.assignEndTime} onChange={handleInputChange} className="frm-input" /></td>
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

export default TrainCompAlloc;
