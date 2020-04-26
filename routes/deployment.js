const express = require('express');
const router = express.Router();
const _ = require('lodash');
const async = require('async');
var multer = require('multer');
const Deployment = require('../models/deployment');





// Register new task
router.post('/add', (req, res) => {
    // console.log(req, "ttt", req.query);
    
    try {
        let newDeployment = new Deployment({
            name : req.body.name,
            url: req.body.url,
            version: req.body.version,
            deployedAt : new Date()
        })
        newTodo.save()
            .then((saved) => {
                console.log('saved');
                
                res.status(200).json('')

            })
            .catch(err => {
                console.log(err);
                let responseObj = {
                    "response_type": "in_channel",
                    "text": "Not saved"
                }
                res.status(400).json(responseObj)
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
        let deployments = await Deployment.find({});
        console.log(deployments,"tt")
        if (deployments.length !=0) {
            res.status(200).json(deployments);
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
        res.status(200).json('Deleted successfully');
    } catch (e){
        console.log(e);
        res.status(200).json('Error occurred');
    }
})

module.exports = router;
