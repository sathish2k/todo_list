import '../styles/globals.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import { useEffect } from 'react';
import UserContext from '../services/userContext'

function MyApp({ Component, pageProps, router }) {
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, [])
  return (
    <UserContext>
      <CssBaseline />
      <Component {...pageProps} />
    </UserContext>
  )
}

export default MyApp
