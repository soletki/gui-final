import { useState } from 'react';
import { useTaskContext } from '../contexts/TaskContext';

function TaskForm() {
	const { dispatch } = useTaskContext();
	const [title, setTitle] = useState('');
	const [priority, setPriority] = useState('medium');

	const onSubmit = (event) => {
		event.preventDefault();
		const trimmed = title.trim();
		if (!trimmed) {
			return;
		}

		dispatch({ type: 'ADD_TASK', title: trimmed, priority });
		setTitle('');
		setPriority('medium');
	};

	return (
		<form className="task-form" onSubmit={onSubmit}>
			<input
				type="text"
				placeholder="Заглавие на задача"
				value={title}
				onChange={(event) => setTitle(event.target.value)}
			/>
			<select
				value={priority}
				onChange={(event) => setPriority(event.target.value)}
			>
				<option value="low">low</option>
				<option value="medium">medium</option>
				<option value="high">high</option>
			</select>
			<button type="submit">Добави</button>
		</form>
	);
}

export default TaskForm;
