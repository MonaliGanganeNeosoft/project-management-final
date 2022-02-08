import React,{useEffect} from 'react'
import ProjectAll from "./ProjectAllrename.js";
import { getAllProject ,getAdminAllProject} from '../../actions/projectAllaction';
import { useSelector,useDispatch } from 'react-redux';
import Loader from '../layout/Loader/Loader';
import {useAlert} from "react-alert";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
const HomeOthers = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const {loading,error,projectDetails} = useSelector(
    (state)=>state.projectDetails
  );
  const {  projectAdminDetailsAll } = useSelector(
    (state) => state.projectAdminDetailsAll
  );

  useEffect(() => {
    if(error){
      return alert.error(error);
    }
   dispatch(getAllProject(),getAdminAllProject());
  }, [dispatch,error,alert]);
  return <>
  {loading ? (
    <Loader />
  ):(
    <>
    <p className='homeHeading'>All Others Projects</p>

    
<div className='container' id='container'>
  {
    projectDetails && projectDetails.map(project=>(
      <ProjectAll project={project}/>
    ))
  }
 
</div> 
    </>
  )}
  </>;



};

export default HomeOthers;
