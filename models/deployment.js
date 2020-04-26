const mongoose = require('mongoose');
const Schema = mongoose.Schema;




const DeploymentSchema = mongoose.Schema({
    
    name : {
        type : String
    },
    url: {
        type : String
    },
    version: {
        type : String
    },
    deployedAt : {
        type : Date
    }
    

});

DeploymentSchema.index({ name: 'text' });
DeploymentSchema.plugin(require('mongoose-timestamp'));
DeploymentSchema.plugin(require('mongoose-delete'), {
    overrideMethods: true,
    deletedAt: true
});

const Deployment = module.exports = mongoose.model('Todo', DeploymentSchema);








