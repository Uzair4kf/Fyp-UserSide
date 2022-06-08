import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    const googleToken = token?.length > 1000;
    console.log("googleToken :", googleToken);

    if (googleToken) {
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });

      const payload = ticket.getPayload();
      req.user = {
        id: payload.sub,
        name: payload.name,
      };
    } else {
      // to do: verify our custom jwt token

      res.status(401).json({
        success: false,
        message: "Something is wrong with your authorization!",
      });
    }
    next();
  } catch (error) {
    console.log("google error", error);
  }
};

export default auth;
