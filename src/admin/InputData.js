import { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import Modal from '../components/Modal';
import '../assets/css/App.css';

function InputData() {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [formData, setFormData] = useState({
		exampleNumber: '',
		inputTime: '',
		eventType: '',
		targetLine: '',
		location: '',
		occurrenceTime: '',
		expectedDuration: '',
		scenario: '',
		minInterval: '',
		minOperationInterval: '',
		afterCrossing: ''
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
                    <h1>입력데이터</h1>
                    <button type="button" className="btn-data-add" onClick={() => setIsModalOpen(true)}>데이터추가</button>
                </div>
				<div className="adm-tbl-wrap">
					<table className="adm-table">
						<thead>
							<tr>
								<th>예측 번호</th>
								<th>입력 시간</th>
								<th>이례상황 유형</th>
								<th>대상 노선</th>
								<th>발생 위치</th>
								<th>발생 시간</th>
								<th>예상 지속시간(분)</th>
								<th>시나리오 선택</th>
								<th>반복시간</th>
								<th>최소운행시격</th>
								<th>건넘선열차통제수</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>1</td>
								<td>2025.11 AM 10:00</td>
								<td>상하선 불통</td>
								<td>경부고속선</td>
								<td>대전역~김천구미역 사이 50km 지점</td>
								<td>2025.01.01 AM 09:00:00</td>
								<td>120분</td>
								<td>우회운전</td>
								<td>30</td>
								<td>4</td>
								<td>4</td>
							</tr>
							<tr>
								<td>1</td>
								<td>2025.11 AM 10:00</td>
								<td>상하선 불통</td>
								<td>경부고속선</td>
								<td>대전역~김천구미역 사이 50km 지점</td>
								<td>2025.01.01 AM 09:00:00</td>
								<td>120분</td>
								<td>우회운전</td>
								<td>30</td>
								<td>4</td>
								<td>4</td>
							</tr>
							<tr>
								<td>1</td>
								<td>2025.11 AM 10:00</td>
								<td>상하선 불통</td>
								<td>경부고속선</td>
								<td>대전역~김천구미역 사이 50km 지점</td>
								<td>2025.01.01 AM 09:00:00</td>
								<td>120분</td>
								<td>우회운전</td>
								<td>30</td>
								<td>4</td>
								<td>4</td>
							</tr>
							<tr>
								<td>1</td>
								<td>2025.11 AM 10:00</td>
								<td>상하선 불통</td>
								<td>경부고속선</td>
								<td>대전역~김천구미역 사이 50km 지점</td>
								<td>2025.01.01 AM 09:00:00</td>
								<td>120분</td>
								<td>우회운전</td>
								<td>30</td>
								<td>4</td>
								<td>4</td>
							</tr><tr>
								<td>1</td>
								<td>2025.11 AM 10:00</td>
								<td>상하선 불통</td>
								<td>경부고속선</td>
								<td>대전역~김천구미역 사이 50km 지점</td>
								<td>2025.01.01 AM 09:00:00</td>
								<td>120분</td>
								<td>우회운전</td>
								<td>30</td>
								<td>4</td>
								<td>4</td>
							</tr>
							<tr>
								<td>1</td>
								<td>2025.11 AM 10:00</td>
								<td>상하선 불통</td>
								<td>경부고속선</td>
								<td>대전역~김천구미역 사이 50km 지점</td>
								<td>2025.01.01 AM 09:00:00</td>
								<td>120분</td>
								<td>우회운전</td>
								<td>30</td>
								<td>4</td>
								<td>4</td>
							</tr><tr>
								<td>1</td>
								<td>2025.11 AM 10:00</td>
								<td>상하선 불통</td>
								<td>경부고속선</td>
								<td>대전역~김천구미역 사이 50km 지점</td>
								<td>2025.01.01 AM 09:00:00</td>
								<td>120분</td>
								<td>우회운전</td>
								<td>30</td>
								<td>4</td>
								<td>4</td>
							</tr>
							<tr>
								<td>1</td>
								<td>2025.11 AM 10:00</td>
								<td>상하선 불통</td>
								<td>경부고속선</td>
								<td>대전역~김천구미역 사이 50km 지점</td>
								<td>2025.01.01 AM 09:00:00</td>
								<td>120분</td>
								<td>우회운전</td>
								<td>30</td>
								<td>4</td>
								<td>4</td>
							</tr><tr>
								<td>1</td>
								<td>2025.11 AM 10:00</td>
								<td>상하선 불통</td>
								<td>경부고속선</td>
								<td>대전역~김천구미역 사이 50km 지점</td>
								<td>2025.01.01 AM 09:00:00</td>
								<td>120분</td>
								<td>우회운전</td>
								<td>30</td>
								<td>4</td>
								<td>4</td>
							</tr>
							<tr>
								<td>1</td>
								<td>2025.11 AM 10:00</td>
								<td>상하선 불통</td>
								<td>경부고속선</td>
								<td>대전역~김천구미역 사이 50km 지점</td>
								<td>2025.01.01 AM 09:00:00</td>
								<td>120분</td>
								<td>우회운전</td>
								<td>30</td>
								<td>4</td>
								<td>4</td>
							</tr><tr>
								<td>1</td>
								<td>2025.11 AM 10:00</td>
								<td>상하선 불통</td>
								<td>경부고속선</td>
								<td>대전역~김천구미역 사이 50km 지점</td>
								<td>2025.01.01 AM 09:00:00</td>
								<td>120분</td>
								<td>우회운전</td>
								<td>30</td>
								<td>4</td>
								<td>4</td>
							</tr>
							<tr>
								<td>1</td>
								<td>2025.11 AM 10:00</td>
								<td>상하선 불통</td>
								<td>경부고속선</td>
								<td>대전역~김천구미역 사이 50km 지점</td>
								<td>2025.01.01 AM 09:00:00</td>
								<td>120분</td>
								<td>우회운전</td>
								<td>30</td>
								<td>4</td>
								<td>4</td>
							</tr><tr>
								<td>1</td>
								<td>2025.11 AM 10:00</td>
								<td>상하선 불통</td>
								<td>경부고속선</td>
								<td>대전역~김천구미역 사이 50km 지점</td>
								<td>2025.01.01 AM 09:00:00</td>
								<td>120분</td>
								<td>우회운전</td>
								<td>30</td>
								<td>4</td>
								<td>4</td>
							</tr>
							<tr>
								<td>1</td>
								<td>2025.11 AM 10:00</td>
								<td>상하선 불통</td>
								<td>경부고속선</td>
								<td>대전역~김천구미역 사이 50km 지점</td>
								<td>2025.01.01 AM 09:00:00</td>
								<td>120분</td>
								<td>우회운전</td>
								<td>30</td>
								<td>4</td>
								<td>4</td>
							</tr><tr>
								<td>1</td>
								<td>2025.11 AM 10:00</td>
								<td>상하선 불통</td>
								<td>경부고속선</td>
								<td>대전역~김천구미역 사이 50km 지점</td>
								<td>2025.01.01 AM 09:00:00</td>
								<td>120분</td>
								<td>우회운전</td>
								<td>30</td>
								<td>4</td>
								<td>4</td>
							</tr>
							<tr>
								<td>1</td>
								<td>2025.11 AM 10:00</td>
								<td>상하선 불통</td>
								<td>경부고속선</td>
								<td>대전역~김천구미역 사이 50km 지점</td>
								<td>2025.01.01 AM 09:00:00</td>
								<td>120분</td>
								<td>우회운전</td>
								<td>30</td>
								<td>4</td>
								<td>4</td>
							</tr><tr>
								<td>1</td>
								<td>2025.11 AM 10:00</td>
								<td>상하선 불통</td>
								<td>경부고속선</td>
								<td>대전역~김천구미역 사이 50km 지점</td>
								<td>2025.01.01 AM 09:00:00</td>
								<td>120분</td>
								<td>우회운전</td>
								<td>30</td>
								<td>4</td>
								<td>4</td>
							</tr>
							<tr>
								<td>1</td>
								<td>2025.11 AM 10:00</td>
								<td>상하선 불통</td>
								<td>경부고속선</td>
								<td>대전역~김천구미역 사이 50km 지점</td>
								<td>2025.01.01 AM 09:00:00</td>
								<td>120분</td>
								<td>우회운전</td>
								<td>30</td>
								<td>4</td>
								<td>4</td>
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
									name="exampleNumber"
									value={formData.exampleNumber}
									onChange={handleInputChange}
									className="frm-input"
								/>
							</td>
							<th>입력 시간</th>
							<td>
								<input 
									type="text" 
									name="inputTime"
									value={formData.inputTime}
									onChange={handleInputChange}
									className="frm-input"
								/>
							</td>
						</tr>
						<tr>
							<th>이례상황 유형</th>
							<td>
								<input 
									type="text" 
									name="eventType"
									value={formData.eventType}
									onChange={handleInputChange}
									className="frm-input"
								/>
							</td>
							<th>대상 노선</th>
							<td>
								<select 
									name="targetLine"
									value={formData.targetLine}
									onChange={handleInputChange}
									className="select"
								>
									<option value="">선택</option>
									<option value="경부고속선">경부고속선</option>
									<option value="호남고속선">호남고속선</option>
								</select>
							</td>
						</tr>
						<tr>
							<th>발생 위치</th>
							<td colSpan="3">
								<input 
									type="text" 
									name="location"
									value={formData.location}
									onChange={handleInputChange}
									className="frm-input"
								/>
							</td>
						</tr>
						<tr>
							<th>발생 시간</th>
							<td>
								<input 
									type="text" 
									name="occurrenceTime"
									value={formData.occurrenceTime}
									onChange={handleInputChange}
									className="frm-input"
								/>
							</td>
							<th>예상 지속시간(분)</th>
							<td>
								<input 
									type="text" 
									name="expectedDuration"
									value={formData.expectedDuration}
									onChange={handleInputChange}
									className="frm-input"
								/>
							</td>
						</tr>
						<tr>
							<th>시나리오 선택</th>
							<td>
								<select 
									name="scenario"
									value={formData.scenario}
									onChange={handleInputChange}
									className="select"
								>
									<option value="">선택</option>
									<option value="우회운전">우회운전</option>
									<option value="직통운전">직통운전</option>
								</select>
							</td>
							<th>반복시간</th>
							<td>
								<input 
									type="text" 
									name="minInterval"
									value={formData.minInterval}
									onChange={handleInputChange}
									className="frm-input"
								/>
							</td>
						</tr>
						<tr>
							<th>최소운행시격</th>
							<td>
								<input 
									type="text" 
									name="minOperationInterval"
									value={formData.minOperationInterval}
									onChange={handleInputChange}
									className="frm-input"
								/>
							</td>
							<th>건넘선열차통제수</th>
							<td>
								<input 
									type="text" 
									name="afterCrossing"
									value={formData.afterCrossing}
									onChange={handleInputChange}
									className="frm-input"
								/>
							</td>
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

export default InputData;
