import { ArgumentMetadata, Injectable, NotAcceptableException, PipeTransform } from "@nestjs/common";
import { Nickname } from "../type/user.type";


@Injectable()
export class IdWithNicknamePipe implements PipeTransform<Nickname, Nickname> {
  transform(value: Nickname, metadata: ArgumentMetadata) {
    if(!value.nickname) {
      throw new NotAcceptableException("nickname information is not existed")
    }
    return value
  }
}