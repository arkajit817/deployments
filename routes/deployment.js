const express = require('express');
const router = express.Router();
const _ = require('lodash');
const async = require('async');
var multer = require('multer');
const Deployment = require('../models/deployment');
const moment = require('moment');





// Register new deployment
router.post('/add', (req, res) => {
    // console.log(req, "ttt", req.query);
    
    try {
        let newDeployment = new Deployment({
            name : req.body.name,
            url: req.body.url,
            version: req.body.version,
            deployedAt : new Date()
        })
        newDeployment.save()
            .then((saved) => {
                console.log('saved');
                
                res.status(200).json({msg: 'saved successfully'})

            })
            .catch(err => {
                console.log(err);
                
                res.status(400).json({msg : 'Error occurred'})
            })
    } catch (err) {
        console.log(err);
        res.status(400).json('Error occurred')
    }



});









//get all the deployments 
router.get('/all', async (req, res) => {
    // console.log(req.body)
    try {
        let deployments = await Deployment.find({}).lean();
        console.log(deployments,"tt")
        if (deployments.length !=0) {
            let changedDate = deployments.map((a)=>{
                a.deployedAt =  moment(a.deployedAt).format('DD-MM-YYYY');
                return a;
            })
            res.status(200).json(changedDate);
        } else {
            
            res.status(200).json('No deployment found');
        }

    } catch (e) {
        console.log(e);
        res.status(200).json('Error occurred');
    }
})


router.delete('/delete/:id',async(req,res)=>{
    try {
        let deleteDep = await Deployment.findByIdAndDelete(req.params.id);
        res.status(200).json({msg :'Deleted successfully'});
    } catch (e){
        console.log(e);
        res.status(200).json({msg :'Error occurred'});
    }
})

module.exports = router;
