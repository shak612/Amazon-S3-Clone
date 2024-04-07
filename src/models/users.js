const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
    fullName: { 
        type: String, 
        require: true 
    },
    username: { 
        type: String, 
        require: true, 
        unique: true,
        validate: {
            validator: async function(value) {
              const user = await this.constructor.findOne({ username: value });
              return !user;
            },
            message: 'Username already exists'
        }
    },
    emailId: { 
        type: String, 
        require: true, 
        unique: true,
        validate: {
            validator: async function(value) {
              const user = await this.constructor.findOne({ emailId: value });
              return !user;
            },
            message: 'Email already exists'
        }
    },
    password: { 
        type: String, 
        require: true 
    },
})


// Define the plugin function
function autoIncrementPlugin(schema) {
    schema.add({
      id: {
        type: Number,
        unique: true
      }
    });
  
    schema.pre('save', async function(next) {
      if (!this.id) {
        try {
          const Model = this.constructor;
          const highestDoc = await Model.findOne({}, {}, { sort: { id: -1 } });
          const nextId = highestDoc ? highestDoc.id + 1 : 1;
          this.id = nextId;
          next();
        } catch (err) {
          next(err);
        }
      } else {
        next();
      }
    });
}
  
// Apply the plugin to your schema
usersSchema.plugin(autoIncrementPlugin);

const User = mongoose.model('User', usersSchema);

module.exports = User;
