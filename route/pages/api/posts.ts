import type { NextApiRequest, NextApiResponse } from 'next';
import { IPost } from '../../types/IPost';
import posts from './_post/posts.json';


export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<IPost[]>
) {
    if (req.method === 'GET') res.status(200).json(posts);
}