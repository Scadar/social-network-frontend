import React, {FC, FormEvent, useEffect, useState} from 'react';
import {useAppSearchParams} from '../../hooks/useAppSearchParams';
import SearchTopPanel from './SearchTopPanel';
import SearchCenterPanel from './SearchCenterPanel';
import PageWrapper from '../../layouts/pageWrapper/PageWrapper';
import {searchApi} from '../../services/searchService';

const getFirstNameAndLastName = (text: string | null) => {
  if (!text) {
    return {
      firstName: null,
      lastName: null,
    };
  }
  const words = text.split(' ');
  if (words.length === 0) {
    return {
      firstName: null,
      lastName: null,
    };
  } else if (words.length === 1) {
    return {
      firstName: words[0],
      lastName: null,
    };
  } else {
    return {
      firstName: words[0],
      lastName: words.filter((v, index) => index !== 0).join(''),
    };
  }
};

const SearchPage: FC = () => {

  const [page] = useState(0);
  const [pageSize] = useState(10);

  const [searchParams, setSearchParams] = useAppSearchParams<string>({
    paramName: 'query',
    defaultValue: '',
  });

  const [queryText, setQueryText] = useState(searchParams || '');

  const [
    getUsers,
    {
      data: paginationUsers,
      isLoading,
      isFetching,
    },
  ] = searchApi.useLazyFetchUserByFirstNameAndLastNameQuery();

  useEffect(() => {
    getUsers({
      page,
      pageSize,
      ...getFirstNameAndLastName(searchParams!),
    });
  }, [page, pageSize, searchParams, getUsers]);

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    setSearchParams(queryText);
  };

  return (
      <PageWrapper
          top={
            <SearchTopPanel
                handleSearch={handleSearch}
                queryText={queryText}
                setQueryText={setQueryText}
            />
          }
          center={
            <SearchCenterPanel
                isLoading={isLoading}
                isFetching={isFetching}
                users={paginationUsers?.data}
            />
          }
      />
  );
};

export default SearchPage;
