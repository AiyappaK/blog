import React, {useState} from 'react';
import { connect } from 'react-redux';
import Login from '../../components/siginupin/login';
import * as addActions from '../../store/actions/addaction';

const Dashboard = props => {
    const [Username, SetUsername ]=useState('');
    const [password, SetPassword ]=useState('');
    // const [isSignup, setisSignup] = useState(false);

    // const ChangeUsername = (e) =>{
    //     SetUsername(e.target.value)
    //     // console.log(Username);
    // }
    // const ChangePassword = (e) =>{
    //     SetPassword(e.target.value)
    //     console.log(password);
    
    // dashboard=> in index page welcome Admin, 
    //      =>view post ,curd operation, Add blog with Album name, title, detalis of post
    //         Navigation bar=> posts->curd ops,  
    //          
    // }
    const loginHandler = (e) =>{
        e.preventDefault()
        if (Username === 'Aiyappa' && password === 'Admin@123') {
            console.log('login Sucessfull');
            SetUsername('');
            SetPassword('');
            // setisSignup(true)
            props.onIsAuth()
        } else {
            console.log('login UnSucessfull');
            // setisSignup(false)           
            props.onAuth()
        }   
    }
    return(
        <div>
            <Login 
            // clicked={} 
            submit={loginHandler} 
            email={Username} 
            passwords={password}
            handleUserName={event => SetUsername(event.target.value)}
            handlePassword={e =>SetPassword(e.target.value)}
            />
        </div>
    )

}
const mapStateToProps = state => {
    return {
        // posts: state.posts
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIsAuth: () => dispatch(addActions.isAuth()),
        onAuth: () => dispatch(addActions.isnotAuth())

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);