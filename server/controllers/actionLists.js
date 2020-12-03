import Lists from '../models/lists.js';

export const getActionLists = async (req, res) => {
    
    try {
        const actionLists = await Lists.find();
        
        console.log(actionLists);

        res.status(200).json(actionLists);
        
    } catch (err) {
        res.status(404).json({message: err.message});
    }
    
};

export const createActionList = async (req, res) => {
    const newActionList = await new List(req.body);
    
    try {
        newActionList.save((err) => {
            if (err) {
                throw err
            } else {
                res.status(201).json(this);
            }
        })
    } catch (err) {
        res.status(409).json({message: err.message});
    }
};

export const deleteActionLists = async (req, res) => {

    try {
        const removedLists = Lists.remove();
        res.status(200).json({message: "Deleted all action lists."});
        
    } catch (err) {
        res.status(400).json({message: err.message});
    }
};

export const updateActionList = async (req, res) => {
    try {
        const actionListId = await req.params.id;

        // The client will be sending an object with the fields to be updated in the action lists. the names of the input should match the model's field names
        const updateInfo = await req.body.updateInfo;

        Lists.updateOne({_id : actionListId}, updateInfo, (err) => {
            if (err) {throw err}
            else {
                res.status(202).json({message: 'Your action list was updated successfully'});
            };
        });

    } catch (err) {
        res.status(409).json({message: err.message});
    }
}

export const deleteActionList = async (req, res) => {
    try {
        
    } catch (error) {
        
    }
}