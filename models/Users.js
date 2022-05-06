const { Schema, model } = require('mongoose');


const usersSchema = new Schema (
    {
        username: {
            type: String, 
            unique: true, 
            trim: true, 
            required: 'Username is required!'
        },
        email: {
            type: String, 
            unique: true, 
            required: 'Email is required!',
            match: [/.+@.+\..+/]
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thoughts'
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref:'Users'
            }

        ]
    },
    {
        toJSON: {
            virtuals: true, 
            getters: true
        },
        id: false
    }
);


usersSchema.virtual('thoughtsCount').get(function() {
    return this.thoughts.reduce(
        (total, thought) => total + thought.reactions.length + 1, 
        0
    );
});

usersSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

const Users = model('Users', UsersSchema);


module.exports = Users;