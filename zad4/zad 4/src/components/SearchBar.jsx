export default function SearchBar({ value, onChange }) {
  return (
    <input
      className="search-input"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Търси курс..."
    />
  )
}
