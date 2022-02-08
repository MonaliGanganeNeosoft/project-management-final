import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Img} from "react-bootstrap";

const ProjectAll = ({project,projectself}) => {
  return (
    
    <>
     
    <Link className="projectCard" to={`/projectDetail/${project._id}`}>
          <Card style={{ width: "18rem",marginLeft:"60px",marginBottom:"30px" }}>
            
            <Card.Body>
              <Card.Title style={{textAlign:"center"}}>{project.title}</Card.Title>
              
              <Card.Img
              variant="top"
              
              src={project.images}
              alt={project.title}
              style={{height:"150px"}}
            />
           <p style={{textAlign:"center"}}>{project.text}</p>
            </Card.Body>
          </Card>

         
        </Link>


      
    </>
    
  )
}

export default ProjectAll
