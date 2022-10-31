import { ArgumentMetadata, Injectable, NotAcceptableException, PipeTransform } from "@nestjs/common";
import { UserNickname } from "src/type/user/user.type";



@Injectable()
export class IdWithNicknamePipe implements PipeTransform<UserNickname, UserNickname> {
  transform(value: UserNickname, metadata: ArgumentMetadata) {
    if(!value.nickname) {
      throw new NotAcceptableException("nickname information is not existed")
    }
    return value
  }
}