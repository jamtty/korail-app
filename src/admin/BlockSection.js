import { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import Modal from '../components/Modal';
import '../assets/css/App.css';

function BlockSection() {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [formData, setFormData] = useState({
		number: '',
		route: '',
		direction: '',
		name: '',
		division: '',
		point: '',
		kilometer: '',
		conversionKm: '',
		originalKm: '',
		routeCode: '',
		railElev: '',
		longitude: '',
		latitude: '',
		kmDiff: ''
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
                    <h1>폐색구간</h1>
                    <button type="button" className="btn-data-add" onClick={() => setIsModalOpen(true)}>데이터추가</button>
                </div>
				<div className="adm-tbl-wrap">
					<table className="adm-table">
						<thead>
							<tr>
								<th>번호</th>
								<th>노선</th>
								<th>상/하행</th>
								<th>이름</th>
								<th>구분</th>
								<th>지점</th>
								<th>키로정</th>
								<th>변환키로정</th>
								<th>원래키로정</th>
								<th>노선코드</th>
								<th>선로표고</th>
								<th>경도</th>
								<th>위도</th>
								<th>키로정차이</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>1</td>
								<td>경부선</td>
								<td>하행</td>
								<td>S1</td>
								<td>서울역</td>
								<td>서울역</td>
								<td>0</td>
								<td>0.5</td>
								<td></td>
								<td>2</td>
								<td></td>
								<td>126.9706256</td>
								<td>37.55462701</td>
								<td>0.01</td>
							</tr>
							<tr>
								<td>1</td>
								<td>경부선</td>
								<td>하행</td>
								<td>S1</td>
								<td>서울역</td>
								<td>서울역</td>
								<td>0</td>
								<td>0.5</td>
								<td></td>
								<td>2</td>
								<td></td>
								<td>126.9706256</td>
								<td>37.55462701</td>
								<td>0.01</td>
							</tr>
							<tr>
								<td>1</td>
								<td>경부선</td>
								<td>하행</td>
								<td>S1</td>
								<td>서울역</td>
								<td>서울역</td>
								<td>0</td>
								<td>0.5</td>
								<td></td>
								<td>2</td>
								<td></td>
								<td>126.9706256</td>
								<td>37.55462701</td>
								<td>0.01</td>
							</tr>
							<tr>
								<td>1</td>
								<td>경부선</td>
								<td>하행</td>
								<td>S1</td>
								<td>서울역</td>
								<td>서울역</td>
								<td>0</td>
								<td>0.5</td>
								<td></td>
								<td>2</td>
								<td></td>
								<td>126.9706256</td>
								<td>37.55462701</td>
								<td>0.01</td>
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
							<th>번호</th>
							<td>
								<input 
									type="text" 
									name="number"
									value={formData.number}
									onChange={handleInputChange}
									className="frm-input"
								/>
							</td>
							<th>노선</th>
							<td>
								<input 
									type="text" 
									name="route"
									value={formData.route}
									onChange={handleInputChange}
									className="frm-input"
								/>
							</td>
						</tr>
						<tr>
							<th>상/하행</th>
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
							<th>이름</th>
							<td>
								<input 
									type="text" 
									name="name"
									value={formData.name}
									onChange={handleInputChange}
									className="frm-input"
								/>
							</td>
						</tr>
						<tr>
							<th>구분</th>
							<td>
								<input 
									type="text" 
									name="division"
									value={formData.division}
									onChange={handleInputChange}
									className="frm-input"
								/>
							</td>
							<th>지점</th>
							<td>
								<input 
									type="text" 
									name="point"
									value={formData.point}
									onChange={handleInputChange}
									className="frm-input"
								/>
							</td>
						</tr>
						<tr>
							<th>키로정</th>
							<td>
								<input 
									type="text" 
									name="kilometer"
									value={formData.kilometer}
									onChange={handleInputChange}
									className="frm-input"
								/>
							</td>
							<th>변환키로정</th>
							<td>
								<input 
									type="text" 
									name="conversionKm"
									value={formData.conversionKm}
									onChange={handleInputChange}
									className="frm-input"
								/>
							</td>
						</tr>
						<tr>
							<th>원래키로정</th>
							<td>
								<input 
									type="text" 
									name="originalKm"
									value={formData.originalKm}
									onChange={handleInputChange}
									className="frm-input"
								/>
							</td>
							<th>노선코드</th>
							<td>
								<input 
									type="text" 
									name="routeCode"
									value={formData.routeCode}
									onChange={handleInputChange}
									className="frm-input"
								/>
							</td>
						</tr>
						<tr>
							<th>선로표고</th>
							<td>
								<input 
									type="text" 
									name="railElev"
									value={formData.railElev}
									onChange={handleInputChange}
									className="frm-input"
								/>
							</td>
							<th>경도</th>
							<td>
								<input 
									type="text" 
									name="longitude"
									value={formData.longitude}
									onChange={handleInputChange}
									className="frm-input"
								/>
							</td>
						</tr>
						<tr>
							<th>위도</th>
							<td>
								<input 
									type="text" 
									name="latitude"
									value={formData.latitude}
									onChange={handleInputChange}
									className="frm-input"
								/>
							</td>
							<th>키로정차이</th>
							<td>
								<input 
									type="text" 
									name="kmDiff"
									value={formData.kmDiff}
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

export default BlockSection;
