import type { NextApiRequest, NextApiResponse } from "next";
import apps from "../../../applications.json";

const SLACK_ACCESS_TOKEN_URL = "https://slack.com/api/oauth.v2.access";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { code, state } = req.query;

    // Parse the state to retreive the workspace ID
    const decodedState = JSON.parse(atob(state as string));
    const { redirect_uri, app, queryParams } = decodedState;

    const body = new FormData();
    body.append("code", code as string);
    body.append("client_id", process.env.NEXT_PUBLIC_SLACK_CLIENT_ID as string);
    body.append("client_secret", process.env.SLACK_CLIENT_SECRET as string);
    body.append("grant_type", "authorization_code");
    body.append("redirect_uri", redirect_uri as string);

    // Exchange authorization code for access token
    const result = await fetch(SLACK_ACCESS_TOKEN_URL, {
      method: "POST",
      body,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      }
    }).then(res => res.json())

    const id = result.authed_user.id;

    console.log({ data: result.authed_user.id });

    // Get the access token from the response
    const { access_token } = result;

    // Save the access token to the database
    console.log("Access token: ", access_token);

    const params = {
      slack_id: id,
      ...queryParams
    }

    const url = (apps as any)[app] + "?" + new URLSearchParams(params).toString();

    res.redirect(url);
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
};
