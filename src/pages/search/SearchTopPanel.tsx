import React, {Dispatch, FC, FormEvent, SetStateAction} from 'react';
import {Box, TextField} from '@mui/material';
import PageTopWrapper from '../../layouts/pageWrapper/PageTopWrapper';

type SearchTopPanelProps = {
  handleSearch: (e: FormEvent) => void
  queryText: string
  setQueryText: Dispatch<SetStateAction<string>>
}

const SearchTopPanel: FC<SearchTopPanelProps> = ({handleSearch, setQueryText, queryText}) => {
  return (
      <PageTopWrapper>
        <Box
            component="form"
            onSubmit={handleSearch}
        >
          <TextField
              value={queryText}
              onChange={e => setQueryText(e.target.value)}
              fullWidth
              label="Поиск"
          />
        </Box>
      </PageTopWrapper>
  );
};

export default SearchTopPanel;
