import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

export default function TemporaryDrawer({activate, children, disactivate}) {
  const classes = useStyles();
  const [showDrawer, setShowDrawer] = React.useState(activate);

  return (
    <div>
          <Drawer anchor={"bottom" open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
            {list(anchor)}
          </Drawer>
      ))}
    </div>
  );
}
