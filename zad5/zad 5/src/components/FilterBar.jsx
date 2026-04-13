import { useFilterContext } from '../contexts/FilterContext';

function FilterBar() {
	const { searchQuery, priorityFilter, setSearch, setPriority } =
		useFilterContext();

	return (
		<div className="filter-bar">
			<input
				type="text"
				placeholder="Търсене по заглавие"
				value={searchQuery}
				onChange={(event) => setSearch(event.target.value)}
			/>
			<select
				value={priorityFilter}
				onChange={(event) => setPriority(event.target.value)}
			>
				<option value="all">all priorities</option>
				<option value="low">low</option>
				<option value="medium">medium</option>
				<option value="high">high</option>
			</select>
		</div>
	);
}

export default FilterBar;
