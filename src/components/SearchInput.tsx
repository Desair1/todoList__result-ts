import { useDebounce } from "../hooks/use-debounce";

interface SearchInputProps {
  setSearchValue: (value: string) => void;
}

const SearchInput = ({ setSearchValue }: SearchInputProps) => {
  const { debounce } = useDebounce();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  return (
    <>
      <input
        className="search-form"
        type="text"
        placeholder="Поиск задач..."
        onChange={debounce((event) => handleChange(event), 350)}
      />
    </>
  );
};

export default SearchInput;
