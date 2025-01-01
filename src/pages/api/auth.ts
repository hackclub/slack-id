/* eslint-disable import/no-anonymous-default-export */
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import apps from "../../../applications.json";
import jwt from "jsonwebtoken";


const SLACK_OAUTH_BASE_URL = "https://slack.com/oauth/v2/authorize";
const SLACK_SCOPES = ["identify"];


export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { app } = req.query;
    const REDIRECT_URI = "https://localhost:3000" + "/api/callback";

    const state = {
      redirect_uri: REDIRECT_URI,
      app
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