function CourseCard({ course }) {
  const levelClass = {
    Начинаещ: 'level-beginner',
    Среден: 'level-mid',
    Напреднал: 'level-advanced',
  }

  return (
    <article className="course-card">
      <h3>{course.title}</h3>
      <p>{course.category}</p>
      <span className={`badge ${levelClass[course.level]}`}>{course.level}</span>

      <div className="rating">
        {course.rating >= 0.5 && <span>★</span>}
        {course.rating >= 1.5 && <span>★</span>}
        {course.rating >= 2.5 && <span>★</span>}
        {course.rating >= 3.5 && <span>★</span>}
        {course.rating >= 4.5 && <span>★</span>}
        <span className="rating-value">{course.rating.toFixed(1)}</span>
      </div>

      <p>{course.students} студенти</p>
    </article>
  )
}

export default CourseCard
