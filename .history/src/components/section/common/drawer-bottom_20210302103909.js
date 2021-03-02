import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

export default function TemporaryDrawer({activate, children, disactivate}) {

  return (
    <div>
          <Drawer anchor="bottom" open={activate} onClose={disactivate}>
            {children}
          </Drawer>
      ))}
    </div>
  );
}
