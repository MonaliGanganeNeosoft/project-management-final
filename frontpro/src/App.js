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
import UpdateProductAdmin from "./component/Admin/UpdateProductAdmin";
function App() {
  // const {isAuthenticated,user}=useSelector((state)=>state.user);
  return (
   <>
   <Router>
   <Header />
   <Route exact path="/all" component={Homeall} />
   <Route exact path='/' component={SeeAmazing}/>
   <Route exact path="/register" component={Register} />

   <Route exact path="/projectDetail/:id" component={ProjectDetails} />
   
   <Route exact path="/login" component={Login}/>

   {/* <ProtectedRoute exact path="/admin/projectDetails" isAdmin={true} component={SelfAdminList} />
   <ProtectedRoute exact path="/admin/project" isAdmin={true} component={NewProject} />
    */}

<Route exact path="/admin/projectDetails" isAdmin={true} component={SelfAdminList} />
   <Route exact path="/admin/project" isAdmin={true} component={NewProject} />


   {/* <ProtectedRoute
          exact
          path="/admin/product/:id"
          isAdmin={true}
          component={UpdateProduct}
        /> */}
   <Route exact path="/admin/projectAdminDetailsAll/:id" isAdmin={true} component={UpdateProductAdmin} />
   

   
   </Router>
   </>
  )
}

export default App
