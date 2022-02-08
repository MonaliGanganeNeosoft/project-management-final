import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Img} from "react-bootstrap";

const ProjectAll = ({project}) => {
  return (
    
    <>
    <Link className="projectCard" to={`/projectDetail/${project._id}`}>
          <Card style={{ width: "18rem",marginLeft:"60px",marginBottom:"30px" }}>
            {/* <Card.Img
              variant="top"
              src={product.product_image[0].url}
              alt={product.product_name}
              style={{height:"150px"}}
            /> */}
            <Card.Body>
              <Card.Title style={{textAlign:"center"}}>{project.title}</Card.Title>
              {/* <Card.Text style={{textAlign:"center"}}>
                <Rating {...options} />
              </Card.Text > */}
              <Card.Img
              variant="top"
              src={project.description[0].url}
              alt={project.title}
              style={{height:"150px"}}
            />
              {/* <p style={{textAlign:"center"}}>{project.description[0].url}</p> */}
              <p style={{textAlign:"center"}}>{project.description[0].text}</p>
            </Card.Body>
          </Card>

          {/* <img src={product.images[0].url} /> */}
        </Link>
    </>
    
  )
}

export default ProjectAll
