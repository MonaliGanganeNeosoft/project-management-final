import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  updateAdminProject,
  getAdminAllProject
 
} from "../../actions/projectAllaction";

import { useAlert } from "react-alert";
import { Button } from "react-bootstrap";
import { UPDATE_ADMINPROJECT_RESET } from "../../constants/projectAllConstants";
import { Link } from "react-router-dom";


const UpdateProjectAdmin = ({ history,match }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  

  const { error, projectAdminDetailsAll} = useSelector(
    (state) => state.projectAdminDetailsAll
  );

  const { error:updateError, isUpdated ,projectUpdate} = useSelector((state) => state.projectUpdate);
 
  const [title, setTitle] = useState("");
  const [demo_URL, setDemoUrl] = useState("");
  const [github_URL, setGithubUrl] = useState("");

  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const[text,setText] = useState([]);
const projectId = match.params.id;

  useEffect(() => {
    if(projectAdminDetailsAll && projectAdminDetailsAll._id !== projectId){
      dispatch(getAdminAllProject(projectId));
    }else{
      setTitle(projectAdminDetailsAll.title);
      setDemoUrl(projectAdminDetailsAll.demo_URL);
      setGithubUrl(projectAdminDetailsAll.github_URL);
      setOldImages(projectAdminDetailsAll.images);
      setText(projectAdminDetailsAll.text);
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Project Updated Successfully");
      history.push("/admin/projectDetails");
      dispatch({ type: UPDATE_ADMINPROJECT_RESET });
    }
  }, [dispatch, alert, error,isUpdated,projectId,projectUpdate,updateError]);

  const UpdateProjectSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("title", title);
    myForm.set("demo_URL", demo_URL);
    myForm.set("github_URL", github_URL);

    images.forEach((image) => {
      myForm.append("images", image);
    });
    myForm.set("text", text);
    dispatch(updateAdminProject(projectId,myForm));
  };

  const updateProjectImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);
    setOldImages([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <>
      <div>
        <form
          className="createProjectForm"
          encType="multipart/form-data"
          onSubmit={UpdateProjectSubmitHandler}
        >
          <div>
            <input
              type="text"
              placeholder="Project title"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div id="createProjectFormFile">
            <input
              type="file"
              name="avatar"
              accept="image/*"
              onChange={updateProjectImagesChange}
              multiple
            />
          </div>
          <div id="createProductFormImage">
              {oldImages &&
                oldImages.map((image, index) => (
                  <img key={index} src={image.url} alt="Old Project Preview" />
                ))}
            </div>
          <div id="createProjectFormImage">
            {imagesPreview.map((image, index) => (
              <img key={index} src={image} alt="Project edit Preview" />
            ))}
          </div> 
         <div> 
            <input
                type="text"
                placeholder="Project text"
                required
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </div>

          <div>
            <input
              type="text"
              placeholder="Project demo url"
              required
              value={demo_URL}
              onChange={(e) => setDemoUrl(e.target.value)}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Project githhub url"
              required
              value={github_URL}
              
              onChange={(e) => setGithubUrl(e.target.value)}
            />
          </div>

          <Button
            id="createProductBtn"
            type="submit"
           
          >
            Edit Project
           
          </Button>
        </form>
      </div>
    </>
  );
};

export default UpdateProjectAdmin;


