import { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import Modal from '../components/Modal';
import TableTooltip from '../components/TableTooltip';
import '../assets/css/App.css';

function StationBase() {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [formData, setFormData] = useState({
		stationCode: '',
		applyStartDate: '',
		kroisCode: '',
		stationName: '',
		stationAbbr: '',
		stationEn: '',
		orgCode: '',
		openDate: '',
		serviceStartDate: ''
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
					<h1>역정보기본</h1>
					<button type="button" className="btn-data-add" onClick={() => setIsModalOpen(true)}>데이터추가</button>
				</div>
				<div className="adm-search">
					<div className="adm-search-group">
						<label>역코드</label>
						<input type="text" className="frm-input" placeholder="예: STN001" />
					</div>
					<div className="adm-search-group">
						<label>역명</label>
						<input type="text" className="frm-input" placeholder="예: 서울" />
					</div>
					<div className="adm-search-group">
						<label>소속코드</label>
						<input type="text" className="frm-input" placeholder="예: HQ01" />
					</div>
					<button type="button" className="btn-primary"></button>
				</div>
				<TableTooltip className="adm-tbl-wrap">
					<table className="adm-table">
						<thead>
							<tr>
								<th>역코드</th>
								<th>적용시작<br />일자</th>
								<th>KROIS<br />역코드</th>
								<th>역명</th>
								<th>역약어명</th>
								<th>역영문<br />정식명</th>
								<th>소속코드</th>
								<th>역신설<br />일자</th>
								<th>여객취급<br />개시일자</th>
								<th>관리</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>STN001</td>
								<td>20200101</td>
								<td>K001</td>
								<td>서울</td>
								<td>서울</td>
								<td>Seoul</td>
								<td>HQ01</td>
								<td>19000101</td>
								<td>19000101</td>
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
								<th>역코드</th>
								<td><input type="text" name="stationCode" value={formData.stationCode} onChange={handleInputChange} className="frm-input" /></td>
								<th>적용시작일자</th>
								<td><input type="text" name="applyStartDate" value={formData.applyStartDate} onChange={handleInputChange} className="frm-input" /></td>
							</tr>
							<tr>
								<th>KROIS역코드</th>
								<td><input type="text" name="kroisCode" value={formData.kroisCode} onChange={handleInputChange} className="frm-input" /></td>
								<th>역명</th>
								<td><input type="text" name="stationName" value={formData.stationName} onChange={handleInputChange} className="frm-input" /></td>
							</tr>
							<tr>
								<th>역약어명</th>
								<td><input type="text" name="stationAbbr" value={formData.stationAbbr} onChange={handleInputChange} className="frm-input" /></td>
								<th>역영문정식명</th>
								<td><input type="text" name="stationEn" value={formData.stationEn} onChange={handleInputChange} className="frm-input" /></td>
							</tr>
							<tr>
								<th>소속코드</th>
								<td><input type="text" name="orgCode" value={formData.orgCode} onChange={handleInputChange} className="frm-input" /></td>
								<th>역신설일자</th>
								<td><input type="text" name="openDate" value={formData.openDate} onChange={handleInputChange} className="frm-input" /></td>
							</tr>
							<tr>
								<th>여객취급개시일자</th>
								<td><input type="text" name="serviceStartDate" value={formData.serviceStartDate} onChange={handleInputChange} className="frm-input" /></td>
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

export default StationBase;
