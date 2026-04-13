import { useTaskContext } from '../contexts/TaskContext';

function Dashboard() {
	const { tasks } = useTaskContext();

	const todo = tasks.filter((task) => task.status === 'todo').length;
	const inProg = tasks.filter((task) => task.status === 'in-progress').length;
	const done = tasks.filter((task) => task.status === 'done').length;
	const high = tasks.filter((task) => task.priority === 'high').length;
	const pct = tasks.length > 0 ? Math.round((done / tasks.length) * 100) : 0;

	return (
		<section className="dashboard">
			<div>За правене: {todo}</div>
			<div>В прогрес: {inProg}</div>
			<div>Готово: {done}</div>
			<div>High priority: {high}</div>
			<div>Завършени: {pct}%</div>
		</section>
	);
}

export default Dashboard;
