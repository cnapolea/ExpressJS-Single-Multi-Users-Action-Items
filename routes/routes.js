
module.exports = (app) => {
    
    app.get("/", (req, res) => {

        // get tasks array
        Item.find({}, (err, tasks) => {
            if (err) {
                console.log(err);
            } else {
                res.render("index", {
                    nameOfList: "Home",
                    tasks: tasks
                });
            }
        });
    });

    app.post("/", (req, res) => {

        let listName = _.replace(_.lowerCase(req.body.list), " ", "-");
        let task = new Item({
            description: req.body.taskInput,
        });
    
        if (listName === "home") {
            task.save();
            res.redirect("/");
    
        } else {
            Lists.findOne({
                name: listName
            }, (err, list) => {
                if (err) {
                    console.log(err);
                } else {
                    list.lists.push(task);
                    list.save();
                    res.redirect(`/${listName}`);
                }
            });
        }
    
    
    });
    
    app.post("/delete/:listName", (req, res) => {
        let checkedItemId = req.body.checkbox;
        let listName = req.params.listName;
    
        console.log(listName);
    
        if (listName === "Home") {
    
            Item.findByIdAndRemove(checkedItemId, (err) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Successfully deleted task in root route");
                    res.redirect("/");
                }
            });
        } else {
            Lists.findOne({
                name: _.replace(_.lowerCase(listName), " ", "-")
            }, (err, list) => {
                if (err) {
                    console.log(err);
                } else {
    
                    list.lists.pull({
                        _id: checkedItemId
                    });
                    list.save();
                    res.redirect(`/${listName}`);
                }
            });
        }
    
    });
    
    
    app.get("/:todoListName", (req, res) => {
    
        let listName = _.replace(_.lowerCase(req.params.todoListName), " ", "-");
    
        Lists.findOne({
            name: listName
        }, (err, list) => {
            if (!err) {
                if (!list) {
    
                    let newList = new Lists({
                        name: listName,
                        lists: [],
                    });
    
                    newList.save();
                    res.redirect(`/${listName}`);
    
                } else {
                    res.render("index", {
                        nameOfList: _.startCase(list.name),
                        tasks: list.lists,
                    });
                }
            }
    
        });
    
    });


}; 





