const ProjectDetail = require("../models/projectDetailsModel")
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHander = require("../utils/errorhander");
const cloudinary = require("cloudinary");
const ProjectDetailAdmin = require("../models/projectAdminModel")
//Create Project Details management ==>Admin
exports.createProjectDetail = catchAsyncErrors( async (req,res,next)=>{
//     let images = [];

//   if (typeof req.body.images === "string") {
//     images.push(req.body.images);
//   } else {
//     images = req.body.images;
//   }

//   const imagesLinks = [];

//   for (let i = 0; i < images.length; i++) {
//     const result = await cloudinary.v2.uploader.upload(images[i], {
//       folder: "products",
//     });

//     imagesLinks.push({
//       public_id: result.public_id,
//       url: result.secure_url,
//     });
//   }

//     req.body.description[0].url = imagesLinks;
//     req.body.description[0].text = "temp_text";
    req.body.user = req.user.id;
    const projectDetail = await ProjectDetail.create(req.body);
    res.status(201).json({
        success:true,
        projectDetail
    })
});
//get all project details
exports.getAllProjectDetails= catchAsyncErrors( async(req,res)=>{
    const projectDetails = await ProjectDetail.find();
    res.status(200).json({
        success:true,
        projectDetails
    })
});

//GET ALL PRODJECT (ADMIN) ===>for creating
exports.creategetAdminAllProjectDetails= catchAsyncErrors( async(req,res)=>{
    let images = [];

    if (typeof req.body.images === "string") {
      images.push(req.body.images);
    } else {
      images = req.body.images;
    }
  
    const imagesLinks = [];
  
    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "products",
      });
  
      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }
  

    const projectAdminDetailsAll = await ProjectDetailAdmin.create(req.body);
    res.status(200).json({
        success:true,
        projectAdminDetailsAll,
    })
});
exports.getAdminAllprojectDetailsall = catchAsyncErrors(async(req,res)=>{
    const projectAdminDetailsAll = await ProjectDetailAdmin.find();
    res.status(200).json({
        success:true,
        projectAdminDetailsAll,
    })
})
//get single Project Details
exports.getProjectDetails = catchAsyncErrors( async(req,res,next)=>{
    const projectDetail = await ProjectDetail.findById(req.params.id);
    // if(!projectDetail){
    //     return res.status(500).json({
    //         success:false,
    //         message:"Project detail not found"
    //     })
    // }
    if(!projectDetail){
        return next (new ErrorHander("Project not found",404));
    }
    res.status(200).json({
        success:true,
        projectDetail
    })
});
//Update Project Details
exports.updateProjectDetail = catchAsyncErrors( async(req,res,next)=>{
    let projectDetail = await ProjectDetail.findById(req.params.id);
    // if(!projectDetail){
    //     return res.status(500).json({
    //         success:false,
    //         message:"Project details not found"
    //     })
    // }
    if(!projectDetail){
        return next (new ErrorHander("Project not found",404));
    }
    projectDetail = await ProjectDetail.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    });
    res.status(200).json({
        success:true,
        projectDetail
    })

});
//UpdateAdmin Project Details
exports.updateAdminProjectDetail = catchAsyncErrors( async(req,res,next)=>{
    let projectAdminDetailsAll = await ProjectDetailAdmin.findById(req.params.id);
    
    if(!projectAdminDetailsAll){
        return next (new ErrorHander("Project not found",404));
    }
    projectAdminDetailsAll = await ProjectDetailAdmin.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    });
    res.status(200).json({
        success:true,
        projectAdminDetailsAll
    })

});

//Delete Project
exports.deleteProject =catchAsyncErrors( async(req,res,next)=>{
    const projectDetail = await ProjectDetail.findById(req.params.id);
    // if(!project){
    //     return res.status(500).json({
    //         success:false,
    //         message:"Project detail not found"
    //     })
    // }
    if(!projectDetail){
        return next (new ErrorHander("Project not found",404));
    }
    await projectDetail.remove();
    res.status(200).json({
        success:true,
        message:"Project details deleted successfully"
    })
});


//delete Admin project
exports.deleteAdminProject =catchAsyncErrors( async(req,res,next)=>{
    const projectAdminDetailsAll = await ProjectDetailAdmin.findById(req.params.id);
    if(!projectAdminDetailsAll){
        return next (new ErrorHander("Project not found",404));
    }
    // Deleting Images From Cloudinary
//   for (let i = 0; i < product.images.length; i++) {
//     await cloudinary.v2.uploader.destroy(product.images[i].public_id);
//   }

//   await product.remove();
    await projectAdminDetailsAll.remove();
    res.status(200).json({
        success:true,
        message:"Project  details deleted successfully"
    })
});








//create new question or update  ans

exports.createProjectQuestion = catchAsyncErrors(async(req,res,next)=>{
    const {question,ans,projectDetailId}=req.body
    const anwer = {
        user:req.user._id,
        name:req.user.name,
        question:question,
        ans,
    };
    const projectDetail = await ProjectDetail.findById(projectDetailId);
    const isAnswered = projectDetail.anwers.find(
       (an) => an.user.toString()===req.user._id());
    if(isAnswered){
        projectDetail.anwers.forEach((an)=>{
            if(an.user.toString()===req.user._id.toString())
            (an.question = question),(an.ans = ans);
        });

    }else{
        projectDetail.anwers.push(anwer)
    }

    // projectDetail.questionss=
    // projectDetail.questionss.questions.map((an)=>{
    //     an=an.questions;
    // })

    await projectDetail.save({validateBeforeSave:false});
    res.status(200).json({
        success:true,
    });

})

//get all questions of a project
// exports.getALLprojectQuestion = catchAsyncErrors(async(req,res,next)=>{
//     const projectDetail = await ProjectDetail.findById(req.query.id);
//     if(!projectDetail){
//         return res.status(500).json({
//             success:false,
//             message:"Project detail not found"
//         })
//     }
//     res.status(200).json({
//         success:true,
//         anwers:projectDetail.anwers,
//     })

// })