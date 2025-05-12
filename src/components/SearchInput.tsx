import { useDebounce } from "../hooks/use-debounce";

interface SearchInputProps {
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
}

const SearchInput = ({ searchValue, setSearchValue }: SearchInputProps) => {
  const { debounce } = useDebounce(searchValue);

  return (
    <>
      <input
        type="text"
        placeholder="Введите запрос..."
        onChange={debounce((e) => setSearchValue(e.target.value), 350)}
      />
    </>
  );
};

export default SearchInput;
