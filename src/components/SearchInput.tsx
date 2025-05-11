interface SearchInputProps {
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
}

const SearchInput = ({ searchValue, setSearchValue }: SearchInputProps) => {
  const debounce = <T extends (...args: any[]) => any>(fn: T, ms: number) => {
    let timer: number;
    console.log(searchValue);
    return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
      const fnCall = () => {
        fn.apply(this, args);
      };

      clearTimeout(timer);

      timer = setTimeout(fnCall, ms);
    };
  };

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
