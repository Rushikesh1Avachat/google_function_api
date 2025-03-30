import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
      const response = await fetch('https://cloud.appwrite.io/v1/account/sessions/oauth2/callback/google/67e6498a00349285df8c');
      if (!response.ok) throw new Error('Failed to fetch users');
      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  