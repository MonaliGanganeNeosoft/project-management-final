import React,{useEffect} from 'react'
import "./Home.css"
import ProjectAll from "./ProjectAll.js";
import { getAllProject } from '../../actions/projectAllaction';
import { useSelector,useDispatch } from 'react-redux';
import Loader from '../layout/Loader/Loader';
import {useAlert} from "react-alert";
// const project = {
//   title:"ii1",
//   description:[
//     {
//       url:"https://www.educationalappstore.com/blog/wp-content/uploads/2018/09/project-management-750x350.jpg",
//       text:"hii"
//     }
//   ],
//   demo_URL:"hii",
//   github_URL:"hii"
// }
const Homeall = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const {loading,error,projectDetails} = useSelector(
    (state)=>state.projectDetails
  );
  useEffect(() => {
    if(error){
      return alert.error(error);
    }
   dispatch(getAllProject());
  }, [dispatch,error,alert]);
  
  return (
    <>
    {loading ? (
      <Loader />
    ):(
      <>
      <p className='homeHeading'>All Projects</p>
  <div className='container' id='container'>
    {
      projectDetails && projectDetails.map(project=>(
        <ProjectAll project={project}/>
      ))
    }
    {/* <ProjectAll project={project}/>
    <ProjectAll project={project}/>
    <ProjectAll project={project}/>
    <ProjectAll project={project}/> */}
    
  </div> 
      </>
    )}
    </>
  )
}

export default Homeall
