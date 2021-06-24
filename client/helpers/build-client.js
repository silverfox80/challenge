import axios from 'axios';

//We can build an instance of axios that is preconfigured to work either in the server or in the browser
const buildClient = ({ req }) => {
  if (typeof window === 'undefined') {
    // We are on the server
    return axios.create({
      baseURL:
        //http://SERVICENAME.NAMESPACE.svc.cluster.local/api/users/currentuser
        //to check the servicename is possible to call kubectl get services -n ingress-nginx
        'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
      //we need to specify the host otherwise ingress regex will not know where to point, with req.headers we pass also the cookie
      headers: req.headers
    });
  } else {
    // We are on the browser
    return axios.create({
      baseUrl: '/'
      //the browser will take care of the headers
    });
  }
};

export default buildClient;