import Styles from './login.module.scss'
import Card from '@material-ui/core/Card';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

let Login = () => {
    return (
        <div className={Styles.loginContainer}>
            <div className={Styles.center}>
                <h1>
                    Sign In <span>form</span>
                </h1>
            </div>
            <div className={Styles.loginCard}>
                <Card classes={{ root: Styles.cardWidth }}>
                    <Grid container spacing={1}>
                        <Grid item xs={7}>
                            <form>
                                <h2>Hello!</h2>
                                <p>Sign into Your account </p>
                                <div>
                                    <FormControl classes={{root:Styles.inputWidth}} variant="outlined">
                                        <InputLabel htmlFor="component-outlined">Email Address</InputLabel>
                                        <OutlinedInput id="component-outlined" label="Email Address" />
                                    </FormControl>
                                </div>
                                <div>
                                    <FormControl classes={{root:Styles.inputWidth}} variant="outlined">
                                        <InputLabel htmlFor="component-outlined">Password</InputLabel>
                                        <OutlinedInput id="component-outlined" label="Password" />
                                    </FormControl>
                                </div>
                                <Button classes={{root:Styles.buttonWidth}} variant="contained" color="primary">
                                    Sign In
                                </Button>
                            </form>
                        </Grid>
                        <Grid item xs={5}>
                        <div className={Styles.bgLinear}>
                            <h2>
                                Welcome Back!
                            </h2>
                            <p>
                                Login and start creating a task,edit a task , delete and mark a task complete
                            </p>
                        </div>
                        </Grid>
                    </Grid>
                </Card>
            </div>
        </div>
    )
}
export default Login