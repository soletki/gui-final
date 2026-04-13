import CourseCard from './CourseCard'

function CourseList({ courses }) {
  if (courses.length === 0) {
    return <p className="empty">Няма намерени курсове</p>
  }

  return (
    <section className="course-list">
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </section>
  )
}

export default CourseList
