import { useState } from 'react'
import Result from 'src/components/search/result';
import SearchForm from 'src/components/search/SearchForm';

const Search = () => {
	const [searchKeyword, setSearchKeyword] = useState("");
	const [read, setRead] = useState(0);

	const handleSearch = (keyword: string) => {
		setSearchKeyword(keyword);
		setRead(1);
	};

	const handleClose = () => {
		setRead(0);
	}

	return (
		<div>
			{read === 0 ? (
				<SearchForm onSearch={handleSearch} />
			) : (
				<Result keyToFind={searchKeyword} onClose={handleClose} />
			)}
		</div>
	);
}

export default Search