import {useEffect, useRef, useState} from 'react';
import {Option} from "@/dev/form/types";

type UseDebouncedAsyncOptionsProps<T> = {
  search: T;
  defaultOptions: Array<Option<T>>;
  asyncOptions?: (values?: T | T[]) => Promise<Array<Option<T>>>;
  debounceMs?: number;
};

export function useDebouncedAsyncOptions<T>({
                                              search,
                                              defaultOptions = [],
                                              asyncOptions,
                                              debounceMs = 250,
                                            }: UseDebouncedAsyncOptionsProps<T>) {
  const [options, setOptions] = useState<Option<T>[]>([]);
  const [loading, setLoading] = useState(false);
  const lastCall = useRef<number>(0);

  useEffect(() => {
    let canceled = false;
    if (defaultOptions.length > 0 || !asyncOptions) {
      setOptions(defaultOptions);
    }
    else {
      const run = async () => {
        setLoading(true);
        try {
          const data = await asyncOptions(search);
          if (!canceled) setOptions(data ?? []);
        } finally {
          if (!canceled) setLoading(false);
        }
      };

      if (debounceMs > 0) {
        const now = Date.now();
        lastCall.current = now;
        const t = setTimeout(() => {
          if (lastCall.current === now) run().finally(() => console.log(`run with debounced ${debounceMs}`));
        }, debounceMs);
        return () => {
          canceled = true;
          clearTimeout(t);
        };
      }
      else {
        run().finally(() => console.log("run without debounced"));
        return () => {
          canceled = true;
        };
      }
    }
  }, [asyncOptions, defaultOptions, search]);

  return {options, loading};
}