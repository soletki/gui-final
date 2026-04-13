import './App.css';
import Dashboard from './components/Dashboard';
import FilterBar from './components/FilterBar';
import KanbanColumn from './components/KanbanColumn';
import TaskForm from './components/TaskForm';
import { FilterProvider } from './contexts/FilterContext';
import { TaskProvider } from './contexts/TaskContext';

function App() {
	return (
		<TaskProvider>
			<FilterProvider>
				<div className="app-shell">
					<h1>Kanban Board</h1>
					<Dashboard />
					<TaskForm />
					<FilterBar />
					<div className="kanban-grid">
						<KanbanColumn status="todo" label="За правене" />
						<KanbanColumn status="in-progress" label="В прогрес" />
						<KanbanColumn status="done" label="Готово" />
					</div>
				</div>
			</FilterProvider>
		</TaskProvider>
	);
}

export default App;
