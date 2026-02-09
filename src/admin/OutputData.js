import { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import Modal from '../components/Modal';
import '../assets/css/App.css';

function OutputData() {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [formData, setFormData] = useState({
		predictionNumber: '',
		typeClass: '',
		formationNumber: '',
		eventType1: '',
		eventType2: '',
		eventType3: '',
		eventType4: '',
		recoveryTime: '',
		occurrencePoint: '',
		occurrenceLocation: '',
		departureNode: '',
		arrivalNode: '',
		eventTime: ''
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
                    <h1>출력데이터</h1>
                    <button type="button" className="btn-data-add" onClick={() => setIsModalOpen(true)}>데이터추가</button>
                </div>
				<div className="adm-search">
					<div className="adm-search-group">
						<label>예측번호</label>
						<input type="text" className="frm-input" placeholder="" />
					</div>
					<div className="adm-search-group">
						<label>유형구분명</label>
						<select className="select">
							<option value="">전체</option>
							<option value="철도사고">철도사고</option>
						</select>
					</div>
					<div className="adm-search-group">
						<label>편성번호</label>
						<input type="text" className="frm-input" placeholder="" />
					</div>
					<div className="adm-search-group">
						<label>사건유형1명</label>
						<select className="select">
							<option value="">전체</option>
							<option value="운행장애">운행장애</option>
						</select>
					</div>
					<button type="button" className="btn-primary">검색</button>
				</div>
				<div className="adm-tbl-wrap">
					<table className="adm-table">
						<thead>
							<tr>
								<th>예측번호</th>
								<th>유형구분명</th>
								<th>편성번호</th>
								<th>사건유형1명</th>
								<th>사건유형2명</th>
								<th>사건유형3명</th>
								<th>사건유형4명</th>
								<th>복구시간내용</th>
								<th>발생지점코드</th>
								<th>발생위치명</th>
								<th>출발노드명</th>
								<th>도착노드명</th>
								<th>사건일시</th>
								<th>관리</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>1</td>
								<td>철도사고</td>
								<td>상하선 불통</td>
								<td>운행장애</td>
								<td>운행지연</td>
								<td>신호장애</td>
								<td>120분</td>
								<td>106</td>
								<td>오송역~대전조차장역 사이</td>
								<td>124.7~155.1</td>
								<td>O57</td>
								<td>P2604</td>
								<td>897</td>
								<td>
									<div className="action-buttons">
										<button type="button" className="btn btn-edit">수정</button><button type="button" className="btn btn-delete">삭제</button>
									</div>
								</td>
							</tr>
							<tr>
								<td>1</td>
								<td>철도사고</td>
								<td>상하선 불통</td>
								<td>운행장애</td>
								<td>운행지연</td>
								<td>신호장애</td>
								<td>120분</td>
								<td>106</td>
								<td>오송역~대전조차장역 사이</td>
								<td>124.7~155.1</td>
								<td>O57</td>
								<td>P2604</td>
								<td>897</td>
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
							<th>예측번호</th>
							<td>
								<input 
									type="text" 
									name="predictionNumber"
									value={formData.predictionNumber}
									onChange={handleInputChange}
									className="frm-input"
								/>
							</td>
							<th>유형구분명</th>
							<td>
								<input 
									type="text" 
									name="typeClass"
									value={formData.typeClass}
									onChange={handleInputChange}
									className="frm-input"
								/>
							</td>
						</tr>
						<tr>
							<th>편성번호</th>
							<td>
								<input 
									type="text" 
									name="formationNumber"
									value={formData.formationNumber}
									onChange={handleInputChange}
									className="frm-input"
								/>
							</td>
							<th>사건유형1명</th>
							<td>
								<input 
									type="text" 
									name="eventType1"
									value={formData.eventType1}
									onChange={handleInputChange}
									className="frm-input"
								/>
							</td>
						</tr>
						<tr>
							<th>사건유형2명</th>
							<td>
								<input 
									type="text" 
									name="eventType2"
									value={formData.eventType2}
									onChange={handleInputChange}
									className="frm-input"
								/>
							</td>
							<th>사건유형3명</th>
							<td>
								<input 
									type="text" 
									name="eventType3"
									value={formData.eventType3}
									onChange={handleInputChange}
									className="frm-input"
								/>
							</td>
						</tr>
						<tr>
							<th>사건유형4명</th>
							<td>
								<input 
									type="text" 
									name="eventType4"
									value={formData.eventType4}
									onChange={handleInputChange}
									className="frm-input"
								/>
							</td>
							<th>복구시간내용</th>
							<td>
								<input 
									type="text" 
									name="recoveryTime"
									value={formData.recoveryTime}
									onChange={handleInputChange}
									className="frm-input"
								/>
							</td>
						</tr>
						<tr>
							<th>발생지점코드</th>
							<td>
								<input 
									type="text" 
									name="occurrencePoint"
									value={formData.occurrencePoint}
									onChange={handleInputChange}
									className="frm-input"
								/>
							</td>
							<th>발생위치명</th>
							<td>
								<input 
									type="text" 
									name="occurrenceLocation"
									value={formData.occurrenceLocation}
									onChange={handleInputChange}
									className="frm-input"
								/>
							</td>
						</tr>
						<tr>
							<th>출발노드명</th>
							<td>
								<input 
									type="text" 
									name="departureNode"
									value={formData.departureNode}
									onChange={handleInputChange}
									className="frm-input"
								/>
							</td>
							<th>도착노드명</th>
							<td>
								<input 
									type="text" 
									name="arrivalNode"
									value={formData.arrivalNode}
									onChange={handleInputChange}
									className="frm-input"
								/>
							</td>
						</tr>
						<tr>
							<th>사건일시</th>
							<td>
								<input 
									type="text" 
									name="eventTime"
									value={formData.eventTime}
									onChange={handleInputChange}
									className="frm-input"
								/>
							</td>
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

export default OutputData;
