import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/styles';
import MiniPalette from './MiniPalette';
import styles from './styles/PaletteListStyles';
// Transition.
import { CSSTransition, TransitionGroup } from 'react-transition-group';
// Dialog
import { blue, red } from '@material-ui/core/colors';
import Avatar from '@material-ui/core/Avatar';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';

class PaletteList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openDeleteDialog: false,
      deletingId: ""
    };
    this.goToPalette = this.goToPalette.bind(this);
    this.openDialog = this.openDialog.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  openDialog(id) {
    this.setState({ openDeleteDialog: true, deletingId: id });
  }

  closeDialog() {
    this.setState({ openDeleteDialog: false });
  }

  handleDelete() {
    this.props.deletePalette(this.state.deletingId);
    this.closeDialog();
  }

  goToPalette(id) {
    this.props.history.push(`/palette/${id}`);
  }

  render() {
    const { palettes, classes } = this.props;
    const { openDeleteDialog } = this.state;
    return (
      <div className={classes.root}>
        <div className={classes.container}>
          <nav className={classes.nav}>
            <h1 className={classes.title}>React Colors</h1>
            <Link to="/palette/new">Create Palette</Link>
          </nav>
          <TransitionGroup className={classes.palettes}>
            {palettes.map(palette => {
                return (
                  <CSSTransition
                    key={palette.id}
                    classNames="fade"
                    timeout={250}
                  >
                    <MiniPalette 
                      key={palette.id} 
                      {...palette}
                      id={palette.id}
                      openDialog={this.openDialog} 
                      handleClick={this.goToPalette} 
                    />
                  </CSSTransition>
                );
            })}
          </TransitionGroup>
        </div>
        <Dialog
          open={openDeleteDialog}
          aria-labelledby="delete-dialog-title"
          onClose={this.closeDialog}
        >
            <DialogTitle id="delete-dialog-title">Delete Palette?</DialogTitle>
            <List>
              <ListItem
                button
                onClick={this.handleDelete}
              >
                <ListItemAvatar>
                  <Avatar style={{ backgroundColor: blue[100], color: blue[600] }}>
                    <CheckIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText>Delete</ListItemText>
              </ListItem>
              <ListItem
                button
                onClick={this.closeDialog}
              >
                <ListItemAvatar>
                  <Avatar style={{ backgroundColor: red[100], color: red[600] }}>
                    <CloseIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText>Cancel</ListItemText>
              </ListItem>
            </List>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(PaletteList);
