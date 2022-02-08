import {BrowserRouter as Router, Route } from 'react-router-dom';import './App.css';
import Header from "./component/layout/Header/Header";
import Homeall from "./component/Home/Homeall";
import ProjectDetails from "./component/ProjectDetail/ProjectDetails";
import Register from "./component/User/Register";
import Login from './component/User/Login';
import SeeAmazing from "./component/Home/SeeAmazing";
import { useSelector } from "react-redux";
import ProtectedRoute from "./component/Route/ProtectedRoute"
import SelfAdminList from "./component/Admin/SelfAdminList"
import NewProject from './component/Admin/NewProject';
import UpdateProjectAdmin from "./component/Admin/UpdateProjectAdmin";


import NewHomepro from './component/Allproject/NewHomepro';
import HomeOthers from './component/Others/HomeOthers';
function App() {
  // const {isAuthenticated,user}=useSelector((state)=>state.user);
  return (
   <>
   <Router>
   <Header />
   <Route exact path="/all" component={Homeall} />
   <Route exact path="/admin/allcreate" component={NewHomepro} />

   <Route exact path='/' component={SeeAmazing}/>
   <Route exact path="/register" component={Register} />

   <Route exact path="/projectDetail/:id" component={ProjectDetails} />
   
   <Route exact path="/login" component={Login}/>

   <Route exact path="/others" component={HomeOthers}/>

   {/* <ProtectedRoute exact path="/admin/projectDetails" isAdmin={true} component={SelfAdminList} />
   <ProtectedRoute exact path="/admin/project" isAdmin={true} component={NewProject} />
    */}

  <Route exact path="/admin/projectDetails" isAdmin={true} component={SelfAdminList} />
   <Route exact path="/admin/project" isAdmin={true} component={NewProject} />


   <Route exact path="/admin/projectAdminDetailsAll/:id" isAdmin={true} component={UpdateProjectAdmin} />
   

   
   </Router>
   </>
  )
}

export default App
