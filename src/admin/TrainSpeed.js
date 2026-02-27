import { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import Modal from '../components/Modal';
import TableTooltip from '../components/TableTooltip';
import '../assets/css/App.css';

function TrainSpeed() {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [formData, setFormData] = useState({
		trainType: '',
		maxSpeed: '',
		avgAcceleration: '',
		avgDeceleration: ''
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
                    <h1>열차 속도</h1>
                    <button type="button" className="btn-data-add" onClick={() => setIsModalOpen(true)}>데이터추가</button>
                </div>
				<TableTooltip className="adm-tbl-wrap">
					<table className="adm-table">
						<thead>
							<tr>
								<th>열차<br />종별명</th>
								<th>영업최고<br />속도(km/h)</th>
								<th>평균가속도(m/s²)</th>
								<th>평균감속도(m/s²)</th>
								<th>관리</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>KTX-산천</td>
								<td>300</td>
								<td>0.55</td>
								<td>1.05</td>
								<td>
									<div className="action-buttons">
										<button type="button" className="btn btn-edit"></button><button type="button" className="btn btn-delete"></button>
									</div>
								</td>
							</tr>
							<tr>
								<td>KTX-산천</td>
								<td>300</td>
								<td>0.55</td>
								<td>1.05</td>
								<td>
									<div className="action-buttons">
										<button type="button" className="btn btn-edit"></button><button type="button" className="btn btn-delete"></button>
									</div>
								</td>
							</tr>
							<tr>
								<td>KTX-산천</td>
								<td>300</td>
								<td>0.55</td>
								<td>1.05</td>
								<td>
									<div className="action-buttons">
										<button type="button" className="btn btn-edit"></button><button type="button" className="btn btn-delete"></button>
									</div>
								</td>
							</tr>
							<tr>
								<td>KTX-산천</td>
								<td>300</td>
								<td>0.55</td>
								<td>1.05</td>
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
							<th>열차종별명</th>
							<td>
								<input 
									type="text" 
									name="trainType"
									value={formData.trainType}
									onChange={handleInputChange}
									className="frm-input"
								/>
							</td>
							<th>영업최고속도(km/h)</th>
							<td>
								<input 
									type="text" 
									name="maxSpeed"
									value={formData.maxSpeed}
									onChange={handleInputChange}
									className="frm-input"
								/>
							</td>
						</tr>
						<tr>
							<th>평균가속도(m/s²)</th>
							<td>
								<input 
									type="text" 
									name="avgAcceleration"
									value={formData.avgAcceleration}
									onChange={handleInputChange}
									className="frm-input"
								/>
							</td>
							<th>평균감속도(m/s²)</th>
							<td>
								<input 
									type="text" 
									name="avgDeceleration"
									value={formData.avgDeceleration}
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

export default TrainSpeed;
