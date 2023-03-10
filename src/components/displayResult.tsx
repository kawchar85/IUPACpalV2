import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";

interface CodeProps {
	code: string;
	cnt: number;
}

const DisplayResult: React.FC<CodeProps> = ({ code, cnt }) => {
	const lines = code.split("\n");
	const [showLines, setShowLines] = useState(Math.min(cnt, lines.length));

	const handleClickSeeMore = () => {
		setShowLines(Math.min(showLines + cnt, lines.length));
	};

	const handleClickSeeLess = () => {
		setShowLines(Math.max(cnt, showLines - cnt));
	};

	return (
		<>
			<div className="code-container">
				<pre className="code">
					<code>{lines.slice(0, showLines).join("\n")}</code>
					<br />
				</pre>
				{showLines < lines.length && (
					<button className="show-more" onClick={handleClickSeeMore}>
						See more <FontAwesomeIcon icon={faArrowDown} />
					</button>
				)}
				{showLines > cnt && (
					<button className="show-less" onClick={handleClickSeeLess}>
						See less <FontAwesomeIcon icon={faArrowUp} />
					</button>
				)}
			</div>
		</>
	);
};

export default DisplayResult;
