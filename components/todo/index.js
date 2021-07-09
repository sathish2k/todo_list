import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { AccountCircle, Delete, Edit } from '@material-ui/icons';
import { useState } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Styles from '../../styles/Home.module.scss';
import Container from '@material-ui/core/Container';
import InputBase from '@material-ui/core/InputBase';
import { Button, Paper } from '@material-ui/core'; 
import Link from 'next/link' 


let Home = (props) => {
    let [auth, setAuth] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleChange = (event) => {
        setAuth(event.target.checked);
    };

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <div >
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={Styles.title}>
                        Inresto Todo List App
                    </Typography>
                    {auth && (
                        <div>
                            <IconButton
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                            >
                                <MenuItem onClick={handleClose}>Profile</MenuItem>
                                <MenuItem onClick={handleClose}>My account</MenuItem>
                            </Menu>
                        </div>
                    )}
                    {!auth && (<div>
                        <Link href="/login" passHref><Button variant="contained">Login</Button></Link></div>)}
                </Toolbar>
            </AppBar>
            <Container maxWidth="lg">
                <div className={Styles.mainWidth}>
                    <h1>Welcome Back, Admin</h1>
                    <Paper classes={{ root: Styles.root }}>
                        <InputBase
                            classes={{ root: Styles.input }}
                            placeholder="What Needs to be done"
                            inputProps={{ 'aria-label': 'What Needs to be done' }}
                        />
                        <Button className={Styles.button} color="primary" variant="contained">Add</Button>
                    </Paper>
                    <List>
                        {[0, 1, 2, 3].map((value) => {
                            const labelId = `checkbox-list-label-${value}`;

                            return (
                                <ListItem key={value} role={undefined} dense button >
                                    <ListItemIcon>
                                        <Checkbox
                                            edge="start"
                                            checked={false}
                                            tabIndex={-1}
                                            disableRipple
                                            inputProps={{ 'aria-labelledby': labelId }}
                                        />
                                    </ListItemIcon>
                                    <ListItemText id={labelId} primary={`Line item ${value + 1}`} />

                                    <ListItemSecondaryAction>
                                        <IconButton edge="end" aria-label="comments">
                                            <Edit />
                                        </IconButton>
                                        <IconButton edge="end" aria-label="comments">
                                            <Delete />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            );
                        })}
                    </List>
                </div>
            </Container>
        </div>
    )
}
export default Home