module.exports = (model, Schema) => {
  const User = new Schema ({
    email: {
      type: String,
      unique: true
    },
    tasksList: [{ type: Schema.Types.ObjectId, ref: 'Task' }]
  }, { 
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } 
  })

  // User.plugin( require('passport-local-mongoose'))
  return model( 'User', User )
}
