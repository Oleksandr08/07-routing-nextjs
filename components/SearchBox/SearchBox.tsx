import css from './SearchBox.module.css';

interface SearchBoxProps {
  defaultValue: string;
  onSearch: (query: string) => void;
}

export default function SearchBox({ onSearch, defaultValue }: SearchBoxProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value);
  };
  return (
    <input
      defaultValue={defaultValue}
      onChange={handleChange}
      className={css.input}
      type="text"
      placeholder="Search notes"
    />
  );
}
