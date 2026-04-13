export default function SortControls({ sortBy, onSortChange }) {
  return (
    <div className="sort-controls">
      <button
        type="button"
        className={sortBy === 'rating' ? 'active' : ''}
        onClick={() => onSortChange('rating')}
      >
        Сортирай по рейтинг
      </button>
      <button
        type="button"
        className={sortBy === 'students' ? 'active' : ''}
        onClick={() => onSortChange('students')}
      >
        Сортирай по студенти
      </button>
    </div>
  )
}
