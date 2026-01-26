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
				<div className="adm-tbl-wrap">
					<table className="adm-table">
						<thead>
							<tr>
								<th>예측 번호</th>
								<th>유형구분</th>
								<th>편성번호</th>
								<th>사건유형1</th>
								<th>사건유형2</th>
								<th>사건유형3</th>
								<th>사건유형4</th>
								<th>복구시간</th>
								<th>발생지점</th>
								<th>발생위치</th>
								<th>출발노드</th>
								<th>도착노드</th>
								<th>사건시간</th>
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
							<th>예측 번호</th>
							<td>
								<input 
									type="text" 
									name="predictionNumber"
									value={formData.predictionNumber}
									onChange={handleInputChange}
									className="frm-input"
								/>
							</td>
							<th>유형구분</th>
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
							<th>사건유형1</th>
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
							<th>사건유형2</th>
							<td>
								<input 
									type="text" 
									name="eventType2"
									value={formData.eventType2}
									onChange={handleInputChange}
									className="frm-input"
								/>
							</td>
							<th>사건유형3</th>
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
							<th>사건유형4</th>
							<td>
								<input 
									type="text" 
									name="eventType4"
									value={formData.eventType4}
									onChange={handleInputChange}
									className="frm-input"
								/>
							</td>
							<th>복구시간</th>
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
							<th>발생지점</th>
							<td>
								<input 
									type="text" 
									name="occurrencePoint"
									value={formData.occurrencePoint}
									onChange={handleInputChange}
									className="frm-input"
								/>
							</td>
							<th>발생위치</th>
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
							<th>출발노드</th>
							<td>
								<input 
									type="text" 
									name="departureNode"
									value={formData.departureNode}
									onChange={handleInputChange}
									className="frm-input"
								/>
							</td>
							<th>도착노드</th>
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
							<th>사건시간</th>
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
