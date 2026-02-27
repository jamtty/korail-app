import { useState, useCallback } from 'react';
import { createPortal } from 'react-dom';

/**
 * 테이블 td 말줄임 툴팁 래퍼
 * adm-tbl-wrap 대신 이 컴포넌트를 사용하면
 * 내부 모든 td에서 텍스트가 잘렸을 때 툴팁이 자동으로 표시됩니다.
 */
function TableTooltip({ children, className }) {
	const [tooltip, setTooltip] = useState(null);

	const handleMouseOver = useCallback((e) => {
		const td = e.target.closest('td');
		if (!td) {
			setTooltip(null);
			return;
		}
		if (td.scrollWidth > td.clientWidth) {
			const rect = td.getBoundingClientRect();
			setTooltip({
				text: td.innerText,
				x: rect.left + rect.width / 2,
				y: rect.top - 8,
			});
		} else {
			setTooltip(null);
		}
	}, []);

	const handleMouseOut = useCallback((e) => {
		const td = e.target.closest('td');
		if (td && !td.contains(e.relatedTarget)) {
			setTooltip(null);
		}
	}, []);

	return (
		<div
			className={className}
			onMouseOver={handleMouseOver}
			onMouseOut={handleMouseOut}
		>
			{children}
			{tooltip && createPortal(
				<div
					className="td-tooltip"
					style={{ left: tooltip.x, top: tooltip.y }}
				>
					{tooltip.text}
				</div>,
				document.body
			)}
		</div>
	);
}

export default TableTooltip;
