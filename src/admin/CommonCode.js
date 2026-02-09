import { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import Modal from '../components/Modal';
import '../assets/css/App.css';

function CommonCode() {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [formData, setFormData] = useState({
		classCode: '',
		detailCode: '',
		applyStartDate: '',
		classCodeName: '',
		detailName: '',
		detailEnName: '',
		detailEnAbbr: ''
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
					<h1>상세코드</h1>
					<button type="button" className="btn-data-add" onClick={() => setIsModalOpen(true)}>데이터추가</button>
				</div>
				<div className="adm-search">
					<div className="adm-search-group">
						<label>분류코드</label>
						<input type="text" className="frm-input" placeholder="예: COM001" />
					</div>
					<div className="adm-search-group">
						<label>상세코드</label>
						<input type="text" className="frm-input" placeholder="예: 01" />
					</div>
					<div className="adm-search-group">
						<label>상세코드정식명</label>
						<input type="text" className="frm-input" placeholder="예: 정상운행" />
					</div>
					<button type="button" className="btn-primary">검색</button>
				</div>
				<div className="adm-tbl-wrap">
					<table className="adm-table">
						<thead>
							<tr>
								<th>분류코드</th>
								<th>상세코드</th>
								<th>적용시작일자</th>
								<th>분류코드명</th>
								<th>상세코드정식명</th>
								<th>상세코드영문명</th>
								<th>상세코드영문약어명</th>
								<th>관리</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>COM001</td>
								<td>01</td>
								<td>20200101</td>
								<td>열차상태</td>
								<td>정상운행</td>
								<td>Normal Operation</td>
								<td>NORM</td>
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
				width="1100px"
			>
				<form onSubmit={handleSubmit}>
					<table className="modal-table">
						<tbody>
							<tr>
								<th>분류코드</th>
								<td><input type="text" name="classCode" value={formData.classCode} onChange={handleInputChange} className="frm-input" /></td>
								<th>상세코드</th>
								<td><input type="text" name="detailCode" value={formData.detailCode} onChange={handleInputChange} className="frm-input" /></td>
							</tr>
							<tr>
								<th>적용시작일자</th>
								<td><input type="text" name="applyStartDate" value={formData.applyStartDate} onChange={handleInputChange} className="frm-input" /></td>
								<th>분류코드명</th>
								<td><input type="text" name="classCodeName" value={formData.classCodeName} onChange={handleInputChange} className="frm-input" /></td>
							</tr>
							<tr>
								<th>상세코드정식명</th>
								<td><input type="text" name="detailName" value={formData.detailName} onChange={handleInputChange} className="frm-input" /></td>
								<th>상세코드영문명</th>
								<td><input type="text" name="detailEnName" value={formData.detailEnName} onChange={handleInputChange} className="frm-input" /></td>
							</tr>
							<tr>
								<th>상세코드영문약어명</th>
								<td><input type="text" name="detailEnAbbr" value={formData.detailEnAbbr} onChange={handleInputChange} className="frm-input" /></td>
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

export default CommonCode;
