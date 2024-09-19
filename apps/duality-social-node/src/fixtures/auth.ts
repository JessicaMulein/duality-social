import { IUserDocument } from "@duality-social/duality-social-lib";
import { ISignedToken } from "../interfaces/signed-token";
import { JwtService } from "../services/jwt";

const jwtService: JwtService = new JwtService();
export async function getAuthToken(userDoc: IUserDocument): Promise<ISignedToken> {
    const authToken = await jwtService.signToken(userDoc);
    return authToken;
}