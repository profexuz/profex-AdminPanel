import axios from "axios";
import Cookies from 'js-cookie';
import router from "@/router";

const instance = axios.create({
  baseURL: "http://64.227.42.134:5075",
});


async function name() {
  try{
    const token = Cookies.get('access_token');
    const response = await axios.get('/api/identity', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if(response.data.identityRole === 'Admin'){
      return true
    }
    else{
      return false
    }
  }
  catch{
    return false
  }
}

if(name!){
  instance.interceptors.request.use((config) => {
    const token = Cookies.get('access_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  });
}
// Add an interceptor for request headers


// Add an interceptor for response handling
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 400) {
      return Promise.reject(error);
    }
    if (error.response.status === 401) {
      const token = Cookies.get('access_token');
      if (router.currentRoute.value.path !== '/auth/login') {
        if (token) {
          try {
            // Get the user's role from the server
            const response = await axios.get('/api/identity', {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });

            if (response.status === 200 && response.data.identityRole === 'Admin') {
              return Promise.resolve(); // Continue the request chain
            } else {
              router.push("/"); // Redirect to the home page
            }
          } catch (error) {
            console.error(error);
            router.push('/auth/login'); // Redirect to the login page
          }
        } else {
          router.push('/auth/login'); // Redirect to the login page
        }
      } else {
        Cookies.remove('access_token'); // Remove the token
        return Promise.reject(error);
      }
    } else if (error.response.status === 404) {
      // router.push('/not-found');
      console.log("404 error handled");
    } else if (error.response.status === 500) {
      console.log("500 error handled");
    } else {
      console.error(error.response);
    }
    return Promise.reject(error);
  }
);

export default instance;
