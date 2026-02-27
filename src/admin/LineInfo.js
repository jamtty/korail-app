import { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import Modal from '../components/Modal';
import TableTooltip from '../components/TableTooltip';
import '../assets/css/App.css';

function LineInfo() {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [formData, setFormData] = useState({
		lineCode: '',
		applyStartDate: '',
		lineTypeCode: '',
		repLineCode: '',
		lineName: '',
		lineEn: '',
		isTest: '',
		startStationCode: '',
		endStationCode: ''
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
					<h1>선정보</h1>
					<button type="button" className="btn-data-add" onClick={() => setIsModalOpen(true)}>데이터추가</button>
				</div>
				<div className="adm-search">
					<div className="adm-search-group">
						<label>선코드</label>
						<input type="text" className="frm-input" placeholder="예: L1" />
					</div>
					<div className="adm-search-group">
						<label>선명</label>
						<input type="text" className="frm-input" placeholder="예: 경부선" />
					</div>
					<div className="adm-search-group">
						<label>대표선코드</label>
						<input type="text" className="frm-input" placeholder="예: L1" />
					</div>
					<button type="button" className="btn-primary"></button>
				</div>
				<TableTooltip className="adm-tbl-wrap">
					<table className="adm-table">
						<thead>
							<tr>
								<th>선코드</th>
								<th>적용시작<br />일자</th>
								<th>선구분<br />코드</th>
								<th>대표선<br />코드</th>
								<th>선명</th>
								<th>선영문<br />정식명</th>
								<th>시험선<br />여부</th>
								<th>시작역<br />코드</th>
								<th>종료역<br />코드</th>
								<th>관리</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>L1</td>
								<td>20200101</td>
								<td>01</td>
								<td>L1</td>
								<td>경부선</td>
								<td>Gyeongbu Line</td>
								<td>N</td>
								<td>STN001</td>
								<td>STN050</td>
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
								<th>선코드</th>
								<td><input type="text" name="lineCode" value={formData.lineCode} onChange={handleInputChange} className="frm-input" /></td>
								<th>적용시작일자</th>
								<td><input type="text" name="applyStartDate" value={formData.applyStartDate} onChange={handleInputChange} className="frm-input" /></td>
							</tr>
							<tr>
								<th>선구분코드</th>
								<td><input type="text" name="lineTypeCode" value={formData.lineTypeCode} onChange={handleInputChange} className="frm-input" /></td>
								<th>대표선코드</th>
								<td><input type="text" name="repLineCode" value={formData.repLineCode} onChange={handleInputChange} className="frm-input" /></td>
							</tr>
							<tr>
								<th>선명</th>
								<td><input type="text" name="lineName" value={formData.lineName} onChange={handleInputChange} className="frm-input" /></td>
								<th>선영문정식명</th>
								<td><input type="text" name="lineEn" value={formData.lineEn} onChange={handleInputChange} className="frm-input" /></td>
							</tr>
							<tr>
								<th>시험선여부</th>
								<td><input type="text" name="isTest" value={formData.isTest} onChange={handleInputChange} className="frm-input" /></td>
								<th>시작역코드</th>
								<td><input type="text" name="startStationCode" value={formData.startStationCode} onChange={handleInputChange} className="frm-input" /></td>
							</tr>
							<tr>
								<th>종료역코드</th>
								<td><input type="text" name="endStationCode" value={formData.endStationCode} onChange={handleInputChange} className="frm-input" /></td>
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

export default LineInfo;
