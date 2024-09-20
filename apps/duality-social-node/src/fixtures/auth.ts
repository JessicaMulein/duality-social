import { IUserDocument } from "@duality-social/duality-social-lib";
import { ISignedToken } from "../interfaces/signed-token.ts";
import { JwtService } from "../services/jwt.ts";

const jwtService: JwtService = new JwtService();
export async function getAuthToken(userDoc: IUserDocument): Promise<ISignedToken> {
    const authToken = await jwtService.signToken(userDoc);
    return authToken;
}