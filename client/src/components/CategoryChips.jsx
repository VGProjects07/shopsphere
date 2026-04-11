export default function CategoryChips({ categories, activeCategory, onChange }) {
  return (
    <div className="chip-row">
      <button type="button" className={!activeCategory ? "chip active" : "chip"} onClick={() => onChange("")}>All</button>
      {categories.map((category) => (
        <button
          key={category.id}
          type="button"
          className={activeCategory === category.slug ? "chip active" : "chip"}
          onClick={() => onChange(category.slug)}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
}
