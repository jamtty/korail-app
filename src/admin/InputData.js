import { useState } from 'react';
import { createPortal } from 'react-dom';
import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/locale';
import Header from './Header';
import Footer from './Footer';
import Modal from '../components/Modal';
import TableTooltip from '../components/TableTooltip';
import '../assets/css/App.css';

function InputData() {
	const PopperContainer = ({ children }) => createPortal(children, document.body);
	const [searchDate, setSearchDate] = useState(new Date());
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
				<div className="adm-search">
					<div className="adm-search-group">
						<label>입력일시</label>
						<DatePicker
							selected={searchDate}
							onChange={(date) => setSearchDate(date)}
							wrapperClassName="calendar-wrapper full"
							className="calendar full"
							popperContainer={PopperContainer}
							dateFormat="yyyy-MM-dd"
							showMonthDropdown
							showYearDropdown
							dropdownMode="select"
							locale={ko}
							dateFormatCalendar="yyyy년 MM월"
							onChangeRaw={(e) => e.preventDefault()}
							placeholderText="YYYY.M.D"
						/>
					</div>
					<div className="adm-search-group">
						<label>이례상황유형코드</label>
						<select className="select">
							<option value="">전체</option>
							<option value="성능저하-선로">성능저하-선로</option>
						</select>
					</div>
					<div className="adm-search-group">
						<label>대상노선명</label>
						<select className="select">
							<option value="">전체</option>
							<option value="경부고속선">경부고속선</option>
						</select>
					</div>
					<button type="button" className="btn-primary"></button>
				</div>
				<TableTooltip className="adm-tbl-wrap">
					<table className="adm-table">
						<thead>
							<tr>
								<th>예측번호</th>
								<th>입력일시</th>
								<th>이례상황<br />유형코드</th>
								<th>대상<br />노선명</th>
								<th>발생<br />위치명</th>
								<th>발생일시</th>
								<th>예상지속<br />시간(분)</th>
								<th>시나리오<br />유형코드</th>
								<th>반복<br />시간(분)</th>
								<th>최소운행<br />시격(분)</th>
								<th>긴급대피<br />열차대수</th>
								<th>관리</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>1</td>
								<td>2025.11 AM 10:00</td>
								<td>상하선 불통</td>
								<td>경부고속선</td>
								<td>대전역~김천구미역 사이 50km 지점 대전역~김천구미역 사이 50km 지점</td>
								<td>2025.01.01 AM 09:00:00</td>
								<td>120분</td>
								<td>우회운전</td>
								<td>30</td>
								<td>4</td>
								<td>4</td>
								<td>
									<div className="action-buttons">
										<button type="button" className="btn btn-edit"></button>
										<button type="button" className="btn btn-delete"></button>
									</div>
								</td>
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
								<td>
									<div className="action-buttons">
										<button type="button" className="btn btn-edit"></button>
										<button type="button" className="btn btn-delete"></button>
									</div>
								</td>
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
								<td>
									<div className="action-buttons">
										<button type="button" className="btn btn-edit"></button>
										<button type="button" className="btn btn-delete"></button>
									</div>
								</td>
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
								<td>
									<div className="action-buttons">
										<button type="button" className="btn btn-edit"></button>
										<button type="button" className="btn btn-delete"></button>
									</div>
								</td>
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
								<td>
									<div className="action-buttons">
										<button type="button" className="btn btn-edit"></button>
										<button type="button" className="btn btn-delete"></button>
									</div>
								</td>
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
								<td>
									<div className="action-buttons">
										<button type="button" className="btn btn-edit"></button>
										<button type="button" className="btn btn-delete"></button>
									</div>
								</td>
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
								<td>
									<div className="action-buttons">
										<button type="button" className="btn btn-edit"></button>
										<button type="button" className="btn btn-delete"></button>
									</div>
								</td>
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
								<td>
									<div className="action-buttons">
										<button type="button" className="btn btn-edit"></button>
										<button type="button" className="btn btn-delete"></button>
									</div>
								</td>
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
								<td>
									<div className="action-buttons">
										<button type="button" className="btn btn-edit"></button>
										<button type="button" className="btn btn-delete"></button>
									</div>
								</td>
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
								<td>
									<div className="action-buttons">
										<button type="button" className="btn btn-edit"></button>
										<button type="button" className="btn btn-delete"></button>
									</div>
								</td>
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
								<td>
									<div className="action-buttons">
										<button type="button" className="btn btn-edit"></button>
										<button type="button" className="btn btn-delete"></button>
									</div>
								</td>
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
								<td>
									<div className="action-buttons">
										<button type="button" className="btn btn-edit"></button>
										<button type="button" className="btn btn-delete"></button>
									</div>
								</td>
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
								<td>
									<div className="action-buttons">
										<button type="button" className="btn btn-edit"></button>
										<button type="button" className="btn btn-delete"></button>
									</div>
								</td>
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
								<td>
									<div className="action-buttons">
										<button type="button" className="btn btn-edit"></button>
										<button type="button" className="btn btn-delete"></button>
									</div>
								</td>
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
								<td>
									<div className="action-buttons">
										<button type="button" className="btn btn-edit"></button>
										<button type="button" className="btn btn-delete"></button>
									</div>
								</td>
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
								<td>
									<div className="action-buttons">
										<button type="button" className="btn btn-edit"></button>
										<button type="button" className="btn btn-delete"></button>
									</div>
								</td>
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
								<td>
									<div className="action-buttons">
										<button type="button" className="btn btn-edit"></button>
										<button type="button" className="btn btn-delete"></button>
									</div>
								</td>
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
								<td>
									<div className="action-buttons">
										<button type="button" className="btn btn-edit"></button>
										<button type="button" className="btn btn-delete"></button>
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
							<th>예측번호</th>
							<td>
								<input 
									type="text" 
									name="exampleNumber"
									value={formData.exampleNumber}
									onChange={handleInputChange}
									className="frm-input"
								/>
							</td>
							<th>입력일시</th>
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
							<th>이례상황유형코드</th>
							<td>
								<input 
									type="text" 
									name="eventType"
									value={formData.eventType}
									onChange={handleInputChange}
									className="frm-input"
								/>
							</td>
							<th>대상노선명</th>
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
							<th>발생위치명</th>
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
							<th>발생일시</th>
							<td>
								<input 
									type="text" 
									name="occurrenceTime"
									value={formData.occurrenceTime}
									onChange={handleInputChange}
									className="frm-input"
								/>
							</td>
							<th>예상지속시간(분)</th>
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
							<th>시나리오유형코드</th>
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
							<th>반복시간(분)</th>
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
							<th>최소운행시격(분)</th>
							<td>
								<input 
									type="text" 
									name="minOperationInterval"
									value={formData.minOperationInterval}
									onChange={handleInputChange}
									className="frm-input"
								/>
							</td>
							<th>긴급대피열차대수</th>
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
