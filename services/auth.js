import Router from 'next/router';
import { Get } from '../integrationLayer/httpLayer'


const getServerSideToken = async (req) => {
  try {
    let user = await Get(process.env.baseUrl + '/user/profile', {
      headers: {
        cookie: req.headers.cookie
      }
    })
    console.log(user.data.user)
    return { user: user.data.user };
  } catch (err) {
    return { user: {} }
  }
};

const getClientSideToken = () => {
  if (typeof window !== 'undefined') {
    const user = window[WINDOW_USER_SCRIPT_VARIABLE] || {};
    console.log('client side....', user)
    return { user };
  }
  return { user: {} }
}

const WINDOW_USER_SCRIPT_VARIABLE = '__USER__';

export const authInitialProps = isProtectedRoute => async ({ req, res }) => {
  console.log('called........')
  const auth = req ? await getServerSideToken(req) : getClientSideToken();
  const currentPath = req ? req.url : window.location.pathname;
  let { user = {} } = auth;

  const isAnonymous = Object.keys(user).length == 0
  if (isAnonymous == false && currentPath == "/login") {
    return redirectUser(res, "/todo", "/");
  }

  if (isProtectedRoute && isAnonymous && currentPath !== "/login") {
    return redirectUser(res, "/todo/login", "/login");

  }
  return { auth };
};

const redirectUser = (res, path, clientPath) => {
  console.log('redirect.........')
  if (res) {
    res?.writeHead(302, {
      Location: path,
    });
    res?.end()
    return {};
  }
  Router.replace(clientPath);
  return {};
};