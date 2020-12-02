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

export const deleteActionList = async (req, res) => {
    const listId = await req.body.id;
    
};