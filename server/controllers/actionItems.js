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

