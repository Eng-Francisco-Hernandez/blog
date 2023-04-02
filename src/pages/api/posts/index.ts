import Post from "@/models/Post";
import { connectToDb } from "@/utils/util-db";
import type { NextApiRequest, NextApiResponse } from "next";

connectToDb();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body } = req;

  switch (method) {
    case "GET":
      try {
        const posts = await Post.find();
        return res.status(200).json(posts);
      } catch (error: any) {
        return res.status(400).json({ msg: error.message });
      }
    case "POST":
      try {
        const newPost = new Post(body);
        const savedPost = await newPost.save();
        return res.status(201).json(savedPost);
      } catch (error: any) {
        return res.status(400).json({ msg: error.message });
      }
    default:
      return res.status(400).json({ msg: "This method is not supported" });
  }
};
