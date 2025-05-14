import { useDebounce } from "../hooks/use-debounce";
interface SearchInputProps {
  searchValue: string;
  setSearchValue: (value: string) => void;
}

const SearchInput = ({ searchValue, setSearchValue }: SearchInputProps) => {
  const { debounce } = useDebounce(searchValue);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  return (
    <>
      <input
        type="text"
        placeholder="Введите запрос..."
        onChange={debounce((event) => handleChange(event), 350)}
      />
    </>
  );
};

export default SearchInput;
