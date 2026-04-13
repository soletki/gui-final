import { useCallback, useEffect, useMemo, useState } from 'react';
import './App.css';

const API_BASE = 'https://jsonplaceholder.typicode.com';

const API_CONFIG = [
	{ key: 'users', name: 'Потребители', endpoint: '/users' },
	{ key: 'posts', name: 'Постове', endpoint: '/posts?_limit=10' },
	{ key: 'comments', name: 'Коментари', endpoint: '/comments?_limit=20' },
];

async function fetchData(endpoint) {
	const response = await fetch(API_BASE + endpoint);
	if (!response.ok) {
		throw new Error(`HTTP ${response.status}: ${response.statusText}`);
	}
	return response.json();
}

const createLoadingStatuses = () =>
	API_CONFIG.reduce((acc, api) => {
		acc[api.key] = { label: 'Зарежда се...', error: '' };
		return acc;
	}, {});

function App() {
	const [users, setUsers] = useState([]);
	const [posts, setPosts] = useState([]);
	const [comments, setComments] = useState([]);
	const [statuses, setStatuses] = useState(createLoadingStatuses);
	const [isLoading, setIsLoading] = useState(false);
	const [elapsed, setElapsed] = useState(0);
	const [globalError, setGlobalError] = useState('');

	const avgComments = useMemo(() => {
		if (posts.length === 0) {
			return 0;
		}

		return comments.reduce((sum) => sum + 1, 0) / posts.length;
	}, [comments, posts.length]);

	const loadDashboard = useCallback(async () => {
		const startTime = Date.now();
		setIsLoading(true);
		setGlobalError('');
		setElapsed(0);
		setStatuses(createLoadingStatuses());

		try {
			const [usersData, postsData, commentsData] = await Promise.all([
				fetchData('/users'),
				fetchData('/posts?_limit=10'),
				fetchData('/comments?_limit=20'),
			]);

			setUsers(usersData);
			setPosts(postsData);
			setComments(commentsData);
			setStatuses({
				users: { label: 'Заредено', error: '' },
				posts: { label: 'Заредено', error: '' },
				comments: { label: 'Заредено', error: '' },
			});
		} catch (error) {
			console.error('Promise.all failed:', error.message);
			setGlobalError(error.message);

			try {
				const results = await Promise.allSettled([
					fetchData('/users'),
					fetchData('/posts?_limit=10'),
					fetchData('/comments?_limit=20'),
				]);

				results.forEach((result, index) => {
					const api = API_CONFIG[index];

					if (result.status === 'fulfilled') {
						if (api.key === 'users') setUsers(result.value);
						if (api.key === 'posts') setPosts(result.value);
						if (api.key === 'comments') setComments(result.value);

						setStatuses((prev) => ({
							...prev,
							[api.key]: { label: 'Заредено', error: '' },
						}));
					} else {

						if (api.key === 'users') setUsers([]);
						if (api.key === 'posts') setPosts([]);
						if (api.key === 'comments') setComments([]);

						setStatuses((prev) => ({
							...prev,
							[api.key]: {
								label: 'Грешка',
								error: 'Грешка: ' + result.reason.message,
							},
						}));
					}
				});
			} catch (fallbackError) {

				setGlobalError(
					'Грешка и при fallback заявките: ' + fallbackError.message,
				);
			}
		} finally {
			setElapsed(Date.now() - startTime);
			setIsLoading(false);
		}
	}, []);

	useEffect(() => {
		loadDashboard();
	}, [loadDashboard]);

	return (
		<main className="dashboard">
			<header className="dashboard-header">
				<div>
					<h1>API Dashboard</h1>
				</div>
				<button onClick={loadDashboard} disabled={isLoading}>
					{isLoading ? 'Зареждане...' : 'Презареди'}
				</button>
			</header>

			{isLoading && <p className="loading">Зареждане на данните...</p>}
			{globalError && <p className="error">{globalError}</p>}

			<section className="status-grid">
				{API_CONFIG.map((api) => (
					<article key={api.key} className="card">
						<h2>{api.name}</h2>
						<p>
							Статус:{' '}
							<strong>
								{statuses[api.key]?.label ?? 'Зарежда се...'}
							</strong>
						</p>
						{statuses[api.key]?.error && (
							<p className="error">{statuses[api.key].error}</p>
						)}
					</article>
				))}
			</section>

			<section className="stats card">
				<h2>Статистика</h2>
				<p>Брой потребители: {users.length}</p>
				<p>Брой постове: {posts.length}</p>
				<p>Среден брой коментари на пост: {avgComments.toFixed(2)}</p>
				<p>Време за зареждане: {elapsed} ms</p>
			</section>

			<section className="data-grid">
				<article className="card">
					<h2>Потребители</h2>
					<ul>
						{users.map((user) => (
							<li key={user.id}>
								{user.name} ({user.email})
							</li>
						))}
					</ul>
				</article>

				<article className="card">
					<h2>Постове (10)</h2>
					<ul>
						{posts.map((post) => (
							<li key={post.id}>{post.title}</li>
						))}
					</ul>
				</article>

				<article className="card">
					<h2>Коментари (20)</h2>
					<ul>
						{comments.map((comment) => (
							<li key={comment.id}>
								<strong>{comment.email}</strong>:{' '}
								{comment.body.slice(0, 60)}...
							</li>
						))}
					</ul>
				</article>
			</section>
		</main>
	);
}

export default App;
