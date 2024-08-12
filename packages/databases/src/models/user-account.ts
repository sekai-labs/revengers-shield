import { BaseModel } from "./base-model";

export type TUserAccount = {
    id: string;
}
export class UserAccountModel extends BaseModel<TUserAccount> {
    async findUserAccountBySocialId(socialId: string): Promise<TUserAccount | undefined> {
        return await this.default.where('id', '=', socialId).first();
    }
}