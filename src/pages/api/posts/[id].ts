import Post from "@/models/Post";
import { connectToDb } from "@/utils/util-db";
import type { NextApiRequest, NextApiResponse } from "next";

connectToDb();

export default async function postsHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    method,
    query: { id },
    body,
  } = req;

  switch (method) {
    case "GET":
      try {
        const post = await Post.findById(id);
        if (!post) return res.status(404).json({ msg: "Post does not exists" });
        return res.status(200).json(post);
      } catch (error: any) {
        return res.status(400).json({ msg: error.message });
      }
    case "PUT":
      try {
        const post = await Post.findByIdAndUpdate(id, body, {
          new: true,
          runValidators: true,
        });
        if (!post) return res.status(404).json({ msg: "Post does not exists" });
        return res.status(200).json(post);
      } catch (error: any) {
        return res.status(400).json({ msg: error.message });
      }
    case "DELETE":
      try {
        const deletedPost = await Post.findByIdAndDelete(id);
        if (!deletedPost)
          return res.status(404).json({ msg: "Post does not exists" });
        return res.status(204).json({
          success: true,
        });
      } catch (error: any) {
        return res.status(400).json({ msg: error.message });
      }
    default:
      return res.status(400).json({ msg: "This method is not supported" });
  }
}
