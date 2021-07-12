import Styles from './login.module.scss'
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { useForm } from "react-hook-form";
import {Post} from '../../integrationLayer/httpLayer';
import {useRouter} from 'next/router'
import { authInitialProps} from '../../services/auth'

let Login = () => {
    let router = useRouter()
    const { handleSubmit, register, formState: { errors },formState } = useForm({mode: 'onChange'});
    const onSubmit = (data) => {
        console.log(data)
        Post(process.env.baseUrl+'/user/login',data,{withCredentials:true}).then((res)=>{
            console.log(res)
            if(res.status ==200){
                if(typeof window != 'undefined'){
                window['__USER__'] = res.data.user
                router.replace('/')
                }
            }
        }).catch((err)=>{
            console.log(err)
        })
    }
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
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <h2>Hello!</h2>
                                <p>Sign into Your account </p>
                                <div>
                                    <TextField variant="outlined" classes={{ root: Styles.inputWidth }}  {...register("email", { required: {value:true,message:"email id is required"} })} helperText={errors.email?errors.email.message:""}
                                    error={errors.email ? true : false} id="component-outlined" name="email" label="Email Address" />
                                </div>
                                <div>
                                    <TextField variant="outlined" classes={{ root: Styles.inputWidth }} type="password" {...register("password", { required: {value:true,message:"Password is required"} })} helperText={errors.password?errors.password.message:""}
                                        error={errors.password ? true : false} id="component-outlined" name="password" label="Password" />
                                </div>
                                <Button disabled={!formState.isValid} classes={{ root: Styles.buttonWidth }} type="submit" variant="contained" color="primary">
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

Login.getInitialProps = authInitialProps()