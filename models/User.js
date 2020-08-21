module.exports = (model, Schema) => {
  const User = new Schema ({
    googleId: String,
    name: String,
    email: String,
    tasksList: [{ type: Schema.Types.ObjectId, ref: 'Task' }]
  }, { 
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } 
  })

  // User.plugin( require('passport-local-mongoose'))
  return model( 'User', User )
}
