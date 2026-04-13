import { useTaskContext } from '../contexts/TaskContext';

function TaskCard({ task }) {
	const { dispatch } = useTaskContext();
	const isDone = task.status === 'done';

	return (
		<article className="task-card">
			<h4>{task.title}</h4>
			<div className="task-meta">
				<span className={`badge ${task.priority}`}>
					{task.priority}
				</span>
				<small>{task.createdAt}</small>
			</div>
			<div className="task-actions">
				<button
					type="button"
					onClick={() => dispatch({ type: 'MOVE_TASK', id: task.id })}
					disabled={isDone}
				>
					Напред
				</button>
				<button
					type="button"
					className="danger"
					onClick={() =>
						dispatch({ type: 'DELETE_TASK', id: task.id })
					}
				>
					Изтрий
				</button>
			</div>
		</article>
	);
}

export default TaskCard;
