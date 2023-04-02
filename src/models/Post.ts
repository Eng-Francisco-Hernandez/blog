import { Schema, model, models } from "mongoose";

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      unique: true,
      trim: true,
      maxLength: [50, "Max length is 50 chars"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      maxLength: [500, "Max length is 500 chars"],
    },
    body: {
      type: String,
      required: [true, "Body is required"],
      trim: true,
      maxLength: [2000, "Max length is 2000 chars"],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default models.Post || model("Post", postSchema);
