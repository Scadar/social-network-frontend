import React, {FC} from 'react';
import {Link, LinkProps, Tab, TabProps} from '@mui/material';

type LinkTabProps = TabProps & LinkProps

const LinkTab: FC<LinkTabProps> = (props) => {
  return (
      <Tab
          component={Link}
          onClick={(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
            event.preventDefault();
          }}
          {...props}
      />
  );
};

export default LinkTab;
