module.exports = (model, Schema) => {
  const Task = new Schema ({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    title: String,
    notes: String,
    priority: Number,
    isChecked: Boolean,
    isArchived: Boolean
  }, {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
  })

  return model( 'Task', Task )
}