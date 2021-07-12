
import {authInitialProps} from '../services/auth'
let About  =()=>{
    return(
        <div>About page</div>
    )
}

export default About

About.getInitialProps = authInitialProps(true)