const { Thoughts, Users } = require('./models');

const thoughtsController = {
    // get all thoughts 
    getAllThoughts(req, res) {
        Thoughts.find({})
            .then(dbThoughtsData => res.json(dbThoughtsData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    // get thought by ID 
    getThoughtsById({ params }, res) {
        Thoughts.findOne({_id: params.id})
        .then(dbThoughtsData => {
            // if no thought is found send 404
            if (!dbThoughtsData) {
                res.status(404).json({ message: 'No Thought found with this id!' });
                return;
            }
            res.json(dbThoughtsData)
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },
    // create thoughts 
    createThoughts({ body }, res) {
        Thoughts.create(body)
        .then(({ _id }) => {
            return Users.findOneAndUpdate(
                { _id: body.usersId },
                { $push: {thoughts: _id} },
                { new: true }
            );
        })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No User found with this id!' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    },
    // add reaction 
    addReaction({ params, body }, res) {
        Thoughts.findOneAndUpdate(
            { _id: params.reactionId },
            { $push: { reactions: body } },
            { new: true, runValidators: true }
        )
        .then(dbUsersData => {
            if (!dbUsersData) {
            res.status(404).json({ message: 'No User found with this id!' });
            return;
            }
            res.json(dbUsersData);
            })
            .catch(err => res.json(err));
        
    },
    // update thoughts by id 
    updateThoughts({ params, body }, res) {
        Thoughts.findOneAndUpdate({ _id: params.id }, body, { new: true })
        .then(dbThoughtsData => {
            if (!dbThoughtsData) {
            res.status(404).json({ message: 'No Thought found with this id!' });
            return;
            }
            res.json(dbThoughtsData);
        })
        .catch(err => res.status(400).json(err));
    },
    // delete Thought
    deleteThoughts({ params }, res) {
        Thoughts.findOneAndDelete({ _id: params.id })
        .then(dbThoughtsData => {
            if (!dbThoughtsData) {
            res.status(404).json({ message: 'No Thought found with this id!' });
            return;
            }
            res.json(dbThoughtsData);
        })
        .catch(err => res.status(400).json(err));
    }

}


module.exports = thoughtsController;