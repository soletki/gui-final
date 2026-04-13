import { useFilterContext } from '../contexts/FilterContext';
import { useTaskContext } from '../contexts/TaskContext';
import TaskCard from './TaskCard';

function KanbanColumn({ status, label }) {
	const { tasks } = useTaskContext();
	const { searchQuery, priorityFilter } = useFilterContext();

	const filtered = tasks
		.filter((t) => t.status === status)
		.filter((t) =>
			t.title.toLowerCase().includes(searchQuery.toLowerCase()),
		)
		.filter(
			(t) => priorityFilter === 'all' || t.priority === priorityFilter,
		);

	return (
		<div className="kanban-column">
			<h3>
				{label} ({filtered.length})
			</h3>
			{filtered.map((task) => (
				<TaskCard key={task.id} task={task} />
			))}
		</div>
	);
}

export default KanbanColumn;
