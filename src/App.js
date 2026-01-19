import { useState } from 'react';
import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/locale';
import './App.css';

function App() {
	const [startDate, setStartDate] = useState(new Date());
	
	return (
	<div className="container">
		<div className="header">
			<div className="logo">
				<img src={`${process.env.PUBLIC_URL}/images/ico_logo.svg`} alt="Korail 로고" />
			</div>
			<p className="txt">한국 철도 네트워크, 지도 및 통관관제시스템 대시보드</p>
		</div>
		<div className="wrap">
			<div className="map-area">
				맵영역
			</div>
			<div className="panel-area">
				<div className="tit">
					<h2>이례상황 입력 시나리오</h2>
				</div>
				<div className="inner">
					<form>
						<div className="rows">
							<div className="col">
								<label>유형</label>
								<div>
									<select name="" className="select">
										<option value="">단선 불통</option>
										<option value="">이상기후(강풍,폭설 등)</option>
										<option value="">선로 장애(탈선, 낙석)</option>
										<option value="">우회운전</option>
									</select>
								</div>
							</div>
							<div className="col">
								<label>대상 노선</label>
								<div>
									<select name="" className="select">
										<option value="">경부선</option>
										<option value="">호남선</option>
									</select>
								</div>
							</div>
							<div className="col">
								<label>발생 위치(상세)</label>
								<div>
									<select name="" className="select">
										<option value="">대전역-김천구미역 사이 50KM 지점</option>
										<option value="">서울역-부산역 사이 10KM 지점</option>
									</select>
								</div>
							</div>
							<div className="col">
								<label>발생 시간</label>
								<div className="d-flex">
								<DatePicker
									selected={startDate}
									onChange={(date) => setStartDate(date)}
									className="calendar"
									dateFormat="yyyy-MM-dd"
									showMonthDropdown
									showYearDropdown
									dropdownMode="select"
									locale={ko}
									dateFormatCalendar="yyyy년 MM월"
									onChangeRaw={(e) => e.preventDefault()}
								/>
									<select name="" className="select">
										<option value="">시</option>
									</select>
									<select name="" className="select">
										<option value="">분</option>
									</select>
								</div>
							</div>
							<div className="col">
								<label>예상 지속시간(분)</label>
								<div>
									<input type="text" name="" className="frm-input" placeholder="분" />
								</div>
							</div>
							<div className="col">
								<label>운전정리 시나리오 선택</label>
								<div className="d-flex">
									<div class="radioBox">
										<input type="radio" name="scenario" id="1" />
										<label for="1">단선운행</label>
									</div>
									<div class="radioBox">
										<input type="radio" name="scenario" id="2" />
										<label for="2">우회운전</label>
									</div>
									<div class="radioBox">
										<input type="radio" name="scenario" id="3" />
										<label for="3">서행</label>
									</div>
									<div class="radioBox">
										<input type="radio" name="scenario" id="4" />
										<label for="4">열차정차</label>
									</div>
									<div class="radioBox">
										<input type="radio" name="scenario" id="5" />
										<label for="5">퇴행</label>
									</div>
									<div class="radioBox">
										<input type="radio" name="scenario" id="6" />
										<label for="6">운행중지(타절)</label>
									</div>
								</div>
							</div>
							<div className="btn-area">
								<button type="button" className="btn-primary">실행 하기</button>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
	);
}

export default App;
