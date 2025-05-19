import type { NextApiRequest, NextApiResponse } from "next";


const SLACK_OAUTH_BASE_URL = "https://slack.com/oauth/v2/authorize";
const SLACK_SCOPES = ["identify"];


export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { return_to, ...queryParams } = req.query;
    const REDIRECT_URI = "https://slack-id.hackclub.com" + "/callback";

    const state = {
      redirect_uri: REDIRECT_URI,
      return_to,
      queryParams
    };

    // Encode the state
    const encodedState = btoa(JSON.stringify(state));

    const params = {
      client_id: process.env.NEXT_PUBLIC_SLACK_CLIENT_ID as string,
      user_scope: SLACK_SCOPES.join(","),
      redirect_uri: REDIRECT_URI,
      state: encodedState,
    };

    const authUrl =
      SLACK_OAUTH_BASE_URL + "?" + new URLSearchParams(params).toString();

    res.redirect(authUrl);
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
};
