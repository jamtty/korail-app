import { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import Modal from '../components/Modal';
import '../assets/css/App.css';

function TrainSchedule() {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [formData, setFormData] = useState({
		trainType: '',
		trainNumber: '',
		direction: '',
		stationName: '',
		arrivalTime: '',
		departureTime: '',
		stopReason: '',
		arrivalMinute: '',
		departureMinute: '',
		formationNumber: '',
		requiredTime: ''
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
					<h1>열차 스케줄</h1>
                    <button type="button" className="btn-data-add" onClick={() => setIsModalOpen(true)}>데이터추가</button>
                </div>
				<div className="adm-search">
					<div className="adm-search-group">
						<label>열차종별코드</label>
						<input type="text" className="frm-input" placeholder="A800..." />
					</div>
					<div className="adm-search-group">
						<label>열차번호</label>
						<input type="text" className="frm-input" placeholder="숫자 입력" />
					</div>
					<div className="adm-search-group">
						<label>역명</label>
						<select className="select">
							<option value="">전체</option>
							<option value="서울역">서울역</option>
							<option value="부산역">부산역</option>
						</select>
					</div>
					<div className="adm-search-group">
						<label>도착시각</label>
						<input type="text" className="frm-input" placeholder="HH:MM:SS" />
					</div>
					<button type="button" className="btn-primary">검색</button>
				</div>
				<div className="adm-tbl-wrap">
					<table className="adm-table">
						<thead>
							<tr>
								<th>열차종별코드</th>
								<th>열차번호</th>
								<th>상하행구분코드</th>
								<th>역명</th>
								<th>도착시각</th>
								<th>출발시각</th>
								<th>정차사유코드</th>
								<th>도착시각분</th>
								<th>출발시각분</th>
								<th>편성번호</th>
								<th>당역소요시간</th>
								<th>관리</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>AB00-2025-00000</td>
								<td>1</td>
								<td>하행</td>
								<td>서울역</td>
								<td>5:13:00</td>
								<td>5:13:00</td>
								<td>시발</td>
								<td>313</td>
								<td>313</td>
								<td>1C1019</td>
								<td>0</td>
								<td>
									<div className="action-buttons">
										<button type="button" className="btn btn-edit">수정</button><button type="button" className="btn btn-delete">삭제</button>
									</div>
								</td>
							</tr>
							<tr>
								<td>AB00-2025-00000</td>
								<td>1</td>
								<td>하행</td>
								<td>서울역</td>
								<td>5:13:00</td>
								<td>5:13:00</td>
								<td>시발</td>
								<td>313</td>
								<td>313</td>
								<td>1C1019</td>
								<td>0</td>
								<td>
									<div className="action-buttons">
										<button type="button" className="btn btn-edit">수정</button><button type="button" className="btn btn-delete">삭제</button>
									</div>
								</td>
							</tr>
							<tr>
								<td>AB00-2025-00000</td>
								<td>1</td>
								<td>하행</td>
								<td>서울역</td>
								<td>5:13:00</td>
								<td>5:13:00</td>
								<td>시발</td>
								<td>313</td>
								<td>313</td>
								<td>1C1019</td>
								<td>0</td>
								<td>
									<div className="action-buttons">
										<button type="button" className="btn btn-edit">수정</button><button type="button" className="btn btn-delete">삭제</button>
									</div>
								</td>
							</tr>
							<tr>
								<td>AB00-2025-00000</td>
								<td>1</td>
								<td>하행</td>
								<td>서울역</td>
								<td>5:13:00</td>
								<td>5:13:00</td>
								<td>시발</td>
								<td>313</td>
								<td>313</td>
								<td>1C1019</td>
								<td>0</td>
								<td>
									<div className="action-buttons">
										<button type="button" className="btn btn-edit">수정</button><button type="button" className="btn btn-delete">삭제</button>
									</div>
								</td>
							</tr><tr>
								<td>AB00-2025-00000</td>
								<td>1</td>
								<td>하행</td>
								<td>서울역</td>
								<td>5:13:00</td>
								<td>5:13:00</td>
								<td>시발</td>
								<td>313</td>
								<td>313</td>
								<td>1C1019</td>
								<td>0</td>
								<td>
									<div className="action-buttons">
										<button type="button" className="btn btn-edit">수정</button><button type="button" className="btn btn-delete">삭제</button>
									</div>
								</td>
							</tr>
							<tr>
								<td>AB00-2025-00000</td>
								<td>1</td>
								<td>하행</td>
								<td>서울역</td>
								<td>5:13:00</td>
								<td>5:13:00</td>
								<td>시발</td>
								<td>313</td>
								<td>313</td>
								<td>1C1019</td>
								<td>0</td>
								<td>
									<div className="action-buttons">
										<button type="button" className="btn btn-edit">수정</button><button type="button" className="btn btn-delete">삭제</button>
									</div>
								</td>
							</tr><tr>
								<td>AB00-2025-00000</td>
								<td>1</td>
								<td>하행</td>
								<td>서울역</td>
								<td>5:13:00</td>
								<td>5:13:00</td>
								<td>시발</td>
								<td>313</td>
								<td>313</td>
								<td>1C1019</td>
								<td>0</td>
								<td>
									<div className="action-buttons">
										<button type="button" className="btn btn-edit">수정</button><button type="button" className="btn btn-delete">삭제</button>
									</div>
								</td>
							</tr>
							<tr>
								<td>AB00-2025-00000</td>
								<td>1</td>
								<td>하행</td>
								<td>서울역</td>
								<td>5:13:00</td>
								<td>5:13:00</td>
								<td>시발</td>
								<td>313</td>
								<td>313</td>
								<td>1C1019</td>
								<td>0</td>
								<td>
									<div className="action-buttons">
										<button type="button" className="btn btn-edit">수정</button><button type="button" className="btn btn-delete">삭제</button>
									</div>
								</td>
							</tr><tr>
								<td>AB00-2025-00000</td>
								<td>1</td>
								<td>하행</td>
								<td>서울역</td>
								<td>5:13:00</td>
								<td>5:13:00</td>
								<td>시발</td>
								<td>313</td>
								<td>313</td>
								<td>1C1019</td>
								<td>0</td>
								<td>
									<div className="action-buttons">
										<button type="button" className="btn btn-edit">수정</button><button type="button" className="btn btn-delete">삭제</button>
									</div>
								</td>
							</tr>
							<tr>
								<td>AB00-2025-00000</td>
								<td>1</td>
								<td>하행</td>
								<td>서울역</td>
								<td>5:13:00</td>
								<td>5:13:00</td>
								<td>시발</td>
								<td>313</td>
								<td>313</td>
								<td>1C1019</td>
								<td>0</td>
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
							<th>열차종별코드</th>
							<td>
								<input 
									type="text" 
									name="trainType"
									value={formData.trainType}
									onChange={handleInputChange}
									className="frm-input"
								/>
							</td>
							<th>열차번호</th>
							<td>
								<input 
									type="text" 
									name="trainNumber"
									value={formData.trainNumber}
									onChange={handleInputChange}
									className="frm-input"
								/>
							</td>
						</tr>
						<tr>
							<th>상하행구분코드</th>
							<td>
								<select 
									name="direction"
									value={formData.direction}
									onChange={handleInputChange}
									className="select"
								>
									<option value="">선택</option>
									<option value="상행">상행</option>
									<option value="하행">하행</option>
								</select>
							</td>
							<th>역명</th>
							<td>
								<input 
									type="text" 
									name="stationName"
									value={formData.stationName}
									onChange={handleInputChange}
									className="frm-input"
								/>
							</td>
						</tr>
						<tr>
							<th>도착시각</th>
							<td>
								<input 
									type="text" 
									name="arrivalTime"
									value={formData.arrivalTime}
									onChange={handleInputChange}
									className="frm-input"
								/>
							</td>
							<th>출발시각</th>
							<td>
								<input 
									type="text" 
									name="departureTime"
									value={formData.departureTime}
									onChange={handleInputChange}
									className="frm-input"
								/>
							</td>
						</tr>
						<tr>
							<th>정차사유코드</th>
							<td>
								<input 
									type="text" 
									name="stopReason"
									value={formData.stopReason}
									onChange={handleInputChange}
									className="frm-input"
								/>
							</td>
							<th>도착시각분</th>
							<td>
								<input 
									type="text" 
									name="arrivalMinute"
									value={formData.arrivalMinute}
									onChange={handleInputChange}
									className="frm-input"
								/>
							</td>
						</tr>
						<tr>
							<th>출발시각분</th>
							<td>
								<input 
									type="text" 
									name="departureMinute"
									value={formData.departureMinute}
									onChange={handleInputChange}
									className="frm-input"
								/>
							</td>
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
						</tr>
						<tr>
							<th>당역소요시간</th>
							<td>
								<input 
									type="text" 
									name="requiredTime"
									value={formData.requiredTime}
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

export default TrainSchedule;
