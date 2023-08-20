const { Schema, model } = require ("mongoose");

const schema = new Schema({
  content: { type: String, requred: true },
  // which page is the comment on:
  pageId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  // who left the comment
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true }
}, {
  timestamps: { createdAt: "created_at" }
});

module.exports = model("Comment", schema);
