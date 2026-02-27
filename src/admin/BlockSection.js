import { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import Modal from '../components/Modal';
import TableTooltip from '../components/TableTooltip';
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
				<div className="adm-search">
					<div className="adm-search-group">
						<label>폐색구간ID</label>
						<input type="text" className="frm-input" placeholder="" />
					</div>
					<div className="adm-search-group">
						<label>노선명</label>
						<select className="select">
							<option value="">전체</option>
							<option value="경부선">경부선</option>
						</select>
					</div>
					<div className="adm-search-group">
						<label>폐색구간명</label>
						<input type="text" className="frm-input" placeholder="" />
					</div>
					<div className="adm-search-group">
						<label>구간구분명</label>
						<input type="text" className="frm-input" placeholder="" />
					</div>
					<div className="adm-search-group">
						<label>지점명</label>
						<input type="text" className="frm-input" placeholder="" />
					</div>
					<button type="button" className="btn-primary"></button>
				</div>
				<TableTooltip className="adm-tbl-wrap">
					<table className="adm-table">
						<thead>
							<tr>
								<th>폐색구간<br />ID</th>
								<th>노선명</th>
								<th>상하행<br />구분코드</th>
								<th>폐색<br />구간명</th>
								<th>구간<br />구분명</th>
								<th>지점명</th>
								<th>키로정</th>
								<th>변환<br />키로정</th>
								<th>원키로정</th>
								<th>노선코드</th>
								<th>선로표명</th>
								<th>경도</th>
								<th>위도</th>
								<th>키로정<br />차이값</th>
								<th>관리</th>
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
								<td>
									<div className="action-buttons">
										<button type="button" className="btn btn-edit"></button><button type="button" className="btn btn-delete"></button>
									</div>
								</td>
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
								<td>
									<div className="action-buttons">
										<button type="button" className="btn btn-edit"></button><button type="button" className="btn btn-delete"></button>
									</div>
								</td>
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
								<td>
									<div className="action-buttons">
										<button type="button" className="btn btn-edit"></button><button type="button" className="btn btn-delete"></button>
									</div>
								</td>
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
							<th>폐색구간ID</th>
							<td>
								<input 
									type="text" 
									name="number"
									value={formData.number}
									onChange={handleInputChange}
									className="frm-input"
								/>
							</td>
							<th>노선명</th>
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
							<th>폐색구간명</th>
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
							<th>구간구분명</th>
							<td>
								<input 
									type="text" 
									name="division"
									value={formData.division}
									onChange={handleInputChange}
									className="frm-input"
								/>
							</td>
							<th>지점명</th>
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
							<th>원키로정</th>
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
							<th>선로표명</th>
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
							<th>키로정차이값</th>
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
