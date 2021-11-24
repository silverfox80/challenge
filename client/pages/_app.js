import 'bootstrap/dist/css/bootstrap.css';  
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../css/style.css';
//to include a global css into the project, it needs to be loaded into the _app.js that is the only file is loaded for each page
//from next.js/errors/css-global.md
import buildClient from '../helpers/build-client';
import Header from '../components/header';

const AppComponent = ({ Component, pageProps, currentUser }) => {
    return (
        <div>
            <Header currentUser={currentUser}/>
            <Component currentUser={currentUser} { ...pageProps } />
        </div>
    );
};

AppComponent.getInitialProps = async (appContext) => {
    
    const client = buildClient(appContext.ctx);
    const { data } = await client.get('/api/users/currentuser');

    let pageProps = {};
    if(appContext.Component.getInitialProps){
        pageProps = await appContext.Component.getInitialProps(appContext.ctx, client, data.currentUser);
        //this way we can call the getInitialProps on the components below (that have the function implemented), otherwise NextJs will block them
    }
      
    return {
        pageProps,
        ...data
    };
};

export default AppComponent;

//while a Page Component have context==={req,res}
//a Custom App Component have context==={Component,ctx:{req,res}}