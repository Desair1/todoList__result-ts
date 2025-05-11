import { useState } from "react";

const SearchInput = () => {
  const [searchValue, setSearchValue] = useState("");

  const debounce = <T extends (...args: any[]) => any>(fn: T, ms: number) => {
    let timer: number;
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
