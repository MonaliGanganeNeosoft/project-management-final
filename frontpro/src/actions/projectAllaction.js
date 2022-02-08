import axios from "axios";
import {
    ALL_PROJECTALL_FAIL,
    ALL_PROJECTALL_REQUEST,
    ALL_PROJECTALL_SUCCESS,

    ADMIN_PROJECTALL_REQUEST,
    ADMIN_PROJECTALL_FAIL,
    ADMIN_PROJECTALL_SUCCESS,

    NEW_PROJECT_FAIL,
    NEW_PROJECT_REQUEST,
    NEW_PROJECT_SUCCESS,
    NEW_PROJECT_RESET,

    DELETE_ADMINPROJECT_FAIL,
    DELETE_ADMINPROJECT_REQUEST,
    DELETE_ADMINPROJECT_RESET,
    DELETE_ADMINPROJECT_SUCCESS,

    PROJECT_DETAILS_REQUEST,
    PROJECT_DETAILS_FAIL,
    PROJECT_DETAILS_SUCCESS,
    CLEAR_ERRORS,
}from '../constants/projectAllConstants';

export const getAllProject = () =>async (dispatch)=>{
    try{
        dispatch({type:ALL_PROJECTALL_REQUEST});
        const {data} = await axios.get("/api/v1/projectDetails");
        dispatch({
            type:ALL_PROJECTALL_SUCCESS,
            payload:data,
        })
    }catch(error){
        dispatch({
            type:ALL_PROJECTALL_FAIL,
            payload:error.response.data.message,
        })
    }
}
//get All project for admin
export const getAdminAllProject = () =>async (dispatch)=>{
    try{
        dispatch({type:ADMIN_PROJECTALL_REQUEST});
        const {data} = await axios.get("/api/v1/admin/projectAdminDetailsAll");
        dispatch({
            type:ADMIN_PROJECTALL_SUCCESS,
            payload:data,
        })
    }catch(error){
        dispatch({
            type:ADMIN_PROJECTALL_FAIL,
            payload:error.response.data.message,
        })
    }
}

// Delete Product
// export const deleteProject = (id) => async (dispatch) => {
//     try {
//       dispatch({ type: DELETE_PROJECT_REQUEST });
  
//       const { data } = await axios.delete(`/api/v1/admin/projectDetail/${id}`);
  
//       dispatch({
//         type: DELETE_PROJECT_SUCCESS,
//         payload: data.success,
//       });
//     } catch (error) {
//       dispatch({
//         type: DELETE_PROJECT_FAIL,
//         payload: error.response.data.message,
//       });
//     }
//   };
// Delete Admin Product
export const deleteAdminProject = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_ADMINPROJECT_REQUEST });

    const { data } = await axios.delete(`/api/v1/admin/projectAdminDetailsAll/${id}`);

    dispatch({
      type: DELETE_ADMINPROJECT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_ADMINPROJECT_FAIL,
      payload: error.response.data.message,
    });
  }
};
export const getAllProjectDetails = (id) =>async (dispatch)=>{
    try{
        dispatch({type:PROJECT_DETAILS_REQUEST});
        const {data} = await axios.get(`/api/v1/projectDetail/${id}`);
        dispatch({
            type:PROJECT_DETAILS_SUCCESS,
            payload:data,
        });
    }catch(error){
        dispatch({
            type:PROJECT_DETAILS_FAIL,
            payload:error.response.data.message,
        });
    }
}

//admin create
// Create Product
export const createProjectAdmin = (projectData) => async (dispatch) => {
    try {
      dispatch({ type: NEW_PROJECT_REQUEST });
  
      const config = {
        headers: { "Content-Type": "application/json" },
      };
  
      const { data } = await axios.post(
        `/api/v1/admin/projectDetailcreate/new`,
        projectData,
        config
      );
  
      dispatch({
        type: NEW_PROJECT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: NEW_PROJECT_FAIL,
        payload: error.response.data.message,
      });
    }
  };

  // export const createProjectAdmin = (projectData) => async (dispatch) => {
  //   try {
  //     dispatch({ type: NEW_PROJECT_REQUEST });
  
  //     const config = {
  //       headers: { "Content-Type": "application/json" },
  //     };
  
  //     const { data } = await axios.post(
  //       `/api/v1/admin/projectDetail/new`,
  //       projectData,
  //       config
  //     );
  
  //     dispatch({
  //       type: NEW_PROJECT_SUCCESS,
  //       payload: data,
  //     });
  //   } catch (error) {
  //     dispatch({
  //       type: NEW_PROJECT_FAIL,
  //       payload: error.response.data.message,
  //     });
  //   }
  // };
// Clearing Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
  };

