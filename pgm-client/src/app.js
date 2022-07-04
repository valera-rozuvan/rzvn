// // External imports
// import React, { Component } from 'react'
// import { Router, Route, Switch, withRouter } from 'react-router-dom'

// // Internal imports

// import './app.scss'
// import { history } from './utils/history'

// // Component imports
// import { Landing } from './components/landing/landing'
// import { Messenger } from './components/Messenger/Messenger'
// import { About } from './components/about/about'
// import { License } from './components/license/license'
// import { Contact } from './components/contact_us/contact'
// import { Login } from './components/login/login'
// import { SignUp } from './components/signUp/signUp'

// class App extends Component {
//   render() {
//     return (
//       <Router history={history}>
//         <div className="app_container">
//           <Switch>
//             <Route exact path="/">
//               <Landing />
//             </Route>
//             <Route exact path="/msg">
//               <Messenger />
//             </Route>
//             <Route exact path="/about">
//               <About />
//             </Route>
//             <Route exact path="/license">
//               <License />
//             </Route>
//             <Route exact path="/contact">
//               <Contact />
//             </Route>
//             <Route exact path="/login">
//               <Login />
//             </Route>
//             <Route path="/keys/signup" >
//               <SignUp />
//             </Route>
//           </Switch>
//         </div>
//       </Router>
//     )
//   }
// }

// export default withRouter(App)

// External imports
// import React, { Component } from 'react'
import { Routes, Route } from 'react-router-dom';

import './app.scss';
// Component imports
import { Landing } from './components/landing/landing';
import { Messenger } from './components/Messenger/Messenger';
import { About } from './components/about/about';
import { License } from './components/license/license';
import { Contact } from './components/contact_us/contact';
import { LoginByKey } from './components/loginByKey/loginByKey';
// import { SignUp } from './components/signUp/signUp';
import { UserLogin } from './components/userLogin/userLogin';
import { UserSignUp } from './components/userSignUp/userSignUp';

// import {ThemeProvider} from 'material-ui-core';
// import { ThemeProvider, createTheme } from '@material-ui/core';


function App() {
  return (
    <main>
      <Routes>
        <Route path='/' element={<Landing />}></Route>
        <Route path='/msg' element={<Messenger />}></Route>
        <Route path='/about' element={<About />}></Route>
        <Route path='/license' element={<License />}></Route>
        <Route path='/contact' element={<Contact />}></Route>
        <Route path='/loginByKey' element={<LoginByKey />}></Route>
        {/* <Route path='/keys/signup' element={<SignUp />}></Route> */}
        <Route path='/userLogin' element={<UserLogin />}></Route>
        <Route path='/userSignUp' element={<UserSignUp />}></Route>
      </Routes>
    </main>
  );
}

export default App;


// class App extends Component {
//   render() {
//     return (
// 			<div className="app_container">
//       <Routes>
//             <Route  path="/" element={<Landing />}></Route>
//             <Route  path="/msg"	element={<Messenger />}></Route>
//             <Route  path="/about" element={<About />} ></Route>
//             <Route  path="/license" element={<License />}></Route>
//             <Route  path="/contact" element={<Contact />}></Route>
//             <Route  path="/login" element={<Login />}></Route>
//             <Route path="/keys/signup" element={<SignUp />}></Route>
//       </Routes>
// 			</div>
//     )
//   }
// }

// export default App

