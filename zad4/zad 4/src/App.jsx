import { useState } from 'react';
import SearchBar from './components/SearchBar';
import FilterPanel from './components/FilterPanel';
import SortControls from './components/SortControls';
import CourseList from './components/CourseList';
import StatsBar from './components/StatsBar';
import { courses } from './data/courses';
import './App.css';

function App() {
	const [search, setSearch] = useState('');
	const [category, setCategory] = useState('all');
	const [level, setLevel] = useState('all');
	const [sortBy, setSortBy] = useState('rating');

	const filteredCourses = courses
		.filter((course) =>
			course.title.toLowerCase().includes(search.toLowerCase().trim()),
		)
		.filter((course) => category === 'all' || course.category === category)
		.filter((course) => level === 'all' || course.level === level)
		.sort((a, b) => b[sortBy] - a[sortBy]);

	const avgRating =
		filteredCourses.length > 0
			? filteredCourses.reduce((sum, course) => sum + course.rating, 0) /
				filteredCourses.length
			: 0;

	const totalStudents = filteredCourses.reduce(
		(sum, course) => sum + course.students,
		0,
	);

	const clearFilters = () => {
		setCategory('all');
		setLevel('all');
		setSearch('');
		setSortBy('rating');
	};

	return (
		<main className="catalog">
			<h1>Каталог на курсове</h1>

			<div className="controls">
				<SearchBar value={search} onChange={setSearch} />
				<FilterPanel
					category={category}
					level={level}
					onCategoryChange={setCategory}
					onLevelChange={setLevel}
					onClear={clearFilters}
				/>
				<SortControls sortBy={sortBy} onSortChange={setSortBy} />
			</div>

			<StatsBar>
				<span>Курсове: {filteredCourses.length}</span>
				<span>Среден рейтинг: {avgRating.toFixed(1)}</span>
				<span>Общо студенти: {totalStudents}</span>
			</StatsBar>

			<CourseList courses={filteredCourses} />
		</main>
	);
}

export default App;
