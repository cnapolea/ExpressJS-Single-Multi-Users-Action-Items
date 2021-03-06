import Lists from '../models/lists.js';
import Tasks from '../models/items.js';

export const getActionItems = async (req, res) => {

    try {
        const actionListId = req.params.listId;

        await Lists.findById(actionListId, (err, list) => {
            if (err) {throw err}
            else {
                res.status(200).json({items:list.items});
            }
        });
        
    } catch (err) {
        res.status(404).json({message: err.message});
    }
    
};

export const createActionItem = async (req, res) => {
    try {
        const actionListId = await req.params.listId;
        const itemFields = await req.body;

        await Lists.findById(actionListId, (err, list) => {
            if (err) {throw err}
            else {
                const newActionItem = new Items(itemFields);

                list.items.push(newActionItem);

                list.save(err => {
                    if (err) {throw err}
                    else {
                        res.status(201).json(newActionItem);
                    }
                });
            }
        });

    } catch (err) {
        res.status(400).json({message: err.message});
    }
};

export const deleteActionItems = async (req, res) => {
    try {
        const actionListId = await req.params.listId;
        
        await Lists.findById(actionListId, (err, list) => {
            if (err) {throw err}
            else {
                list.items.remove();
                list.save(err => {
                    if (err) {throw err}
                    else {
                        res.status(200).json({message: 'Deleted all action items'});
                    }
                });
            }
        });
    } catch (err) {
        res.status(400).json({message: err.message});
    }
};

export const updateActionItem = async (req, res) => {
    try {
        const actionListId = await req.params.listId;
        const actionItemId = await req.params.itemId;

        await Lists.update({_id: actionListId, 'items._id': actionItemId}, { '$set': { "items": await req.bodyl } }, (err) => {
            if (err) {throw err}
            else {
                res.status(202).json({message: 'Your action item was updated successfully'});
            }
        }
        );

    } catch (err) {
        res.status(409).json({message: err.message});
    }
};

export const deleteActionItem = async (req, res) => {
    const actionListId = await req.params.listId;
    const actionItemId = await req.params.itemId;

    try {
        Lists.findById(actionListId, (err, list) => {
            if (err) {throw err}
            else {
                list.items.id(actionItemId).remove()
                list.save(err => {
                    if (err) {throw err}
                    else {
                        res.status(202).json({message: 'Action item deleted successfuly.'});
                    }
                });
            }
        });        
    } catch (err) {
        res.status(409).json({message: err.message});
    }
}