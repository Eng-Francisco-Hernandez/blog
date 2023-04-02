import Post from "@/models/Post";
import { connectToDb } from "@/utils/util-db";
import type { NextApiRequest, NextApiResponse } from "next";

connectToDb();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body } = req;

  switch (method) {
    case "POST":
      try {
        const posts = await Post.find();
        const filteredPosts = posts.filter(
          (item) =>
            JSON.stringify(item)
              .toLowerCase()
              .indexOf(body.query.toLowerCase()) > -1
        );
        res.status(200).json(filteredPosts);
      } catch (error: any) {
        return res.status(400).json({ msg: error.message });
      }
    default:
      return res.status(400).json({ msg: "This method is not supported" });
  }
};
