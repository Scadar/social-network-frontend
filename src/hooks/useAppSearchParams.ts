import {useSearchParams} from 'react-router-dom';
import {useCallback, useEffect, useMemo} from 'react';
import {useFirstMountState} from './useFirstMountState';

type setState<T> = (value: T) => void;

type returnType1<T> = [T | undefined, setState<T>];
type returnType2<T> = [T, setState<T>];

type paramType1 = {
  paramName: string
}

type paramType2<T> = {
  paramName: string
  defaultValue: T
}

function useAppSearchParams<T>(params: paramType1): returnType1<T>;
function useAppSearchParams<T>(params: paramType2<T>): returnType2<T>;

function useAppSearchParams<T>(params: paramType1 | paramType2<T>): returnType1<T> | returnType2<T> {
  //@ts-ignore
  const {defaultValue, paramName} = params;

  const isFirstMount = useFirstMountState();
  const [searchParams, setSearchParams] = useSearchParams();

  const paramValue = useMemo(() => {
    const searchParam = searchParams.get(paramName);
    if (searchParam) {
      return searchParam as unknown as T;
    } else {
      return defaultValue;
    }
  }, [searchParams, defaultValue, paramName]);

  const setParamValue = useCallback((value: T) => {
    setSearchParams({[paramName]: value as unknown as string});
  }, [setSearchParams, paramName]);

  useEffect(() => {
    if (isFirstMount) {
      if (paramValue) {
        setParamValue(paramValue);
      } else {
        if (defaultValue) {
          setParamValue(defaultValue);
        }
      }
    }
  }, [defaultValue, setParamValue, paramValue, isFirstMount]);

  return [
    paramValue,
    setParamValue,
  ];
}

export {useAppSearchParams};
