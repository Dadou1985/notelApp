import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog({children, showDialog, hideShow}) {
  const classes = useStyles();

  return (
    <div>
      <Dialog fullScreen open={showDialog} onClose={hideShow} TransitionComponent={Transition}>
        <div style={{}}>
            <main style={{width: "90%", height: "90%"}}>{children}</main>
            <div style={{
                position: "fixed",
                bottom: "0px",
                display: "flex",
                flexFlow: "row",
                justifyContent: "center",
                alignItems: "center",
                width: "100vw",
                height: "10vh",
                fontSize: "20px",
                color: "gray",
                backgroundColor: "ghostwhite"
            }}
            onClick={hideShow}>Revenir au portail</div>
        </div>
      </Dialog>
    </div>
  );
}
