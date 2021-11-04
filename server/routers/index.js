import express from 'express';
const router = express.Router();

router.get('/',(req,res)=>{
    res.send("Hello iam siva back to Mern projects");
});


export default router;