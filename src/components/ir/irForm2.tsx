import React, { useState } from 'react';
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';
import { Button, Input, Select, Text } from '@mantine/core';
import axios from 'axios';

type SearchFormProps = {};

type SearchResult = {
	id: number;
	sequence: string;
	ir_length: number;
	mismatch: number;
	gap_allowed: number;
};

interface FormData {
	dnaSequence: string;
}

type FormValues = FormData & FieldValues;

const filterOptions = [
	{ value: 'ir_length', label: 'Minimum IR Length' },
	{ value: 'mismatch', label: 'Maximum Mismatch' },
	{ value: 'gap_allowed', label: 'Gap Allowed' },
];

const TestForm: React.FC<SearchFormProps> = () => {
	const { register, handleSubmit, reset } = useForm<FormValues>();
	const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
	const [filter, setFilter] = useState<string | null>(null);
	const [filterValue, setFilterValue] = useState<number | null>(null);

	const handleSearch = async ({ dnaSequence }: { dnaSequence: string }) => {
		const response = await axios.get('/api/search', { params: { dnaSequence } });
		setSearchResults(response.data);
	};

	// const handleSearch = (data: FormData) => {
	// 	console.log(data);
	//       };

	const handleFilter = () => {
		const filteredResults = searchResults.filter((result) => {
			switch (filter) {
				case 'ir_length':
					return result.ir_length >= filterValue!;
				case 'mismatch':
					return result.mismatch <= filterValue!;
				case 'gap_allowed':
					return result.gap_allowed <= filterValue!;
				default:
					return true;
			}
		});
		setSearchResults(filteredResults);
	};

	return (
		<>
			<form onSubmit={handleSubmit(handleSearch)} method="POST">
				<Text>Enter DNA Sequence:</Text>
				<Input {...register('dnaSequence')} placeholder="ATCG..." required />
				<Button type="submit">Search</Button>
			</form>

			{searchResults.length > 0 && (
				<div>
					<Text>Filter Results By:</Text>
					<Select
						data={filterOptions}
						placeholder="Select a filter"
						value={filter}
						onChange={(value) => setFilter(value)}
					/>
					{filter && (
						<><Input
							type="number"
							placeholder={`Enter ${filterOptions.find((f) => f.value === filter)?.label ?? ''
								}`}
							value={filterValue ?? ''}
							onChange={(event) => setFilterValue(Number(event.target.value))}
						/>

							<Button onClick={handleFilter}>Filter</Button>
						</>
					)}
				</div>
			)}

			{searchResults}
		</>
	);
};

export default TestForm;
