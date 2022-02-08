const express = require("express");
const { getAllProjectDetails, createProjectDetail, updateProjectDetail, deleteProject, getProjectDetails, createProjectQuestion, getAdminAllProjectDetails, getAdminAllprojectDetailsall, creategetAdminAllProjectDetails ,deleteAdminProject, updateAdminProjectDetail } = require("../controllers/projectDetailController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const router = express.Router();

// router.route("/projectDetails").get(isAuthenticatedUser,authorizeRoles("admin"),getAllProjectDetails);
router.route("/projectDetails").get(getAllProjectDetails);

router.route("/admin/projectDetailcreate/new").post(isAuthenticatedUser,authorizeRoles("admin"),creategetAdminAllProjectDetails)
router.route("/admin/projectAdminDetailsAll").get(isAuthenticatedUser,authorizeRoles("admin"),getAdminAllprojectDetailsall);

router.route("/admin/projectAdminDetailsAll/:id")
.put(isAuthenticatedUser,authorizeRoles("admin"),updateAdminProjectDetail)
.delete(isAuthenticatedUser,authorizeRoles("admin"),deleteAdminProject)


//router.route("/admin/projectDetailAdmin/new").post(isAuthenticatedUser,authorizeRoles("admin"),getAdminAllProjectDetails);

router.route("/admin/projectDetail/new").post(isAuthenticatedUser,authorizeRoles("admin"),createProjectDetail);
router.route("/admin/projectDetail/:id")
.put(isAuthenticatedUser,authorizeRoles("admin"),updateProjectDetail)
.delete(isAuthenticatedUser,authorizeRoles("admin"),deleteProject)

router.route("/projectDetail/:id").get(getProjectDetails);

router.route("/ans").put(isAuthenticatedUser,createProjectQuestion)


// router.route("/allquesans").get(getALLprojectQuestion)
module.exports = router