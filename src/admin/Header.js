import { Link, useLocation } from 'react-router-dom';
import '../assets/css/App.css';

function Header() {
    const location = useLocation();
    
	return (
		<div className="adm-header">
			<div className="adm-logo">
                <h1>Korail 관리자 페이지</h1>
            </div>
            <div className="adm-gnb">
                <ul>
                    <li className={location.pathname === '/admin/input-data' ? 'active' : ''}><Link to="/admin/input-data">입력데이터</Link></li>
                    <li className={location.pathname === '/admin/train-schedule' ? 'active' : ''}><Link to="/admin/train-schedule">열차 스케쥴</Link></li>
                    <li className={location.pathname === '/admin/train-speed' ? 'active' : ''}><Link to="/admin/train-speed">열차 속도</Link></li>
                    <li className={location.pathname === '/admin/block-section' ? 'active' : ''}><Link to="/admin/block-section">폐색 구간</Link></li>
                    <li className={location.pathname === '/admin/station-info' ? 'active' : ''}><Link to="/admin/station-info">역정보</Link></li>
                    <li className={location.pathname === '/admin/output-data' ? 'active' : ''}><Link to="/admin/output-data">출력데이터</Link></li>
                </ul>
                <Link to="#" className="adm-logout">로그아웃</Link>
            </div>
		</div>
	);
}

export default Header;
