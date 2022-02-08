import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getAdminAllProject,
  deleteAdminProject,
} from "../../actions/projectAllaction";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { DELETE_ADMINPROJECT_RESET } from "../../constants/projectAllConstants";
import { Button } from "react-bootstrap";

const SelfAdminList = ({ history ,params}) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { error, projectAdminDetailsAll } = useSelector(
    (state) => state.projectAdminDetailsAll
  );

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.projectAdminDelete
  );

  const deleteProjectHandler = (id) => {
    dispatch(deleteAdminProject(id));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("Product Deleted Successfully");
      history.push("/admin/projectDetails");
      dispatch({ type: DELETE_ADMINPROJECT_RESET });
    }
    dispatch(getAdminAllProject());
  }, [dispatch, alert, error, deleteError, history, isDeleted]);

//   projectAdminDetailsAll &&
//   projectAdminDetailsAll.map((item)=>{
//     id:item._id
//   }
   
//  )
  return (
    <>
      <div>
        <p>hii</p>
        {/* <p><Link to="/admin/project">create</Link> </p>*/}
        <Button variant="light">
          <Link to="/admin/project">create</Link>
        </Button>
        {projectAdminDetailsAll &&
          projectAdminDetailsAll.map((item) => (
            <>
              <div className="innerc" style={{ border: "2px solid black" }}>
                <p>{item._id}</p>
                <p>{item.title}</p>
                {/* <img src={item.description[0].url} style={{ width: "300px" }} />
                <p>{item.description[0].text}</p> */}
                
                <p><img src={item.images} style={{ width: "300px" }}/></p>
                <p>{item.text}</p>
                <p>{item.demo_URL}</p>
                <p>{item.github_URL}</p>

                
                {/* <Button
                  variant="light"><Link to={`/admin/projectAdminDetailsAll/${params.getValue(params.id,"id")}}`}>Edit</Link>
                
                </Button> */}
                
                {/* <Button
                  variant="light"
                  onClick={() =>
                    deleteProjectHandler(params.getValue(params.id))
                  }
                >
                  Delete
                
                </Button> */}
              </div>
            </>
          ))}
      </div>
    </>
  );
};

export default SelfAdminList;
