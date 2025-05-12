import { useDebounce } from "../hooks/use-debounce";
import type { SearchInputProps } from "../types/SearchInputPropts";

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
