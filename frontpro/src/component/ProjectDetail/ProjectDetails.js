import React, { useEffect } from "react";
import { Card, Img } from "react-bootstrap";

import "./ProjectDetails.css";
import { useSelector, useDispatch } from "react-redux";
import { getAllProjectDetails } from "../../actions/projectAllaction";
import { useAlert } from "react-alert";

const ProjectDetails = ({ match }) => {
  const alert = useAlert();

  const dispatch = useDispatch();
  const { projectDetail, loading, error } = useSelector(
    (state) => state.projectDetail
  );

  useEffect(() => {
    if (error) {
      return alert.error(error);
    }
    dispatch(getAllProjectDetails(match.params.id));
  }, [dispatch, match.params.id, error, alert]);

  return (
    <>
      <div
        className="ProjectDetails"
        style={{ border: "2px solid black", display: "flex", flexWrap: "wrap" }}
      >
        <div
          className="firstimg"
          style={{ border: "2px solid red", width: "650px", height: "500px" }}
        >
          <p>{projectDetail.title}</p>
          {projectDetail.description &&
            projectDetail.description.map((item, i) => (
              <>
                <img src={item.url} style={{ width: "300px" }} />
                <p>{item.text}</p>
              </>
            ))}

          <p>{projectDetail.demo_URL}</p>
          <p>{projectDetail.github_URL}</p>
        </div>
        <div
          className="secondimgpara "
          style={{ border: "2px solid red", width: "600px", height: "500px" }}
        >
          <p>question</p>
          <p>Ans</p>
        </div>
      </div>
    </>
  );
};

export default ProjectDetails;
