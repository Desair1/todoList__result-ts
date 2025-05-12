export const useDebounce = (searchValue: string) => {
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

  return {
    debounce,
  };
};
