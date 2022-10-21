import { ArgumentMetadata, Injectable, NotAcceptableException, PipeTransform } from "@nestjs/common";
import { IdWithNickname } from "../type/user.type";


@Injectable()
export class IdWithNicknamePipe implements PipeTransform<IdWithNickname, IdWithNickname> {
  transform(value: IdWithNickname, metadata: ArgumentMetadata) {
    if(!value.identifier || !value.nickname) {
      throw new NotAcceptableException("identifier or nickname information is not existed")
    }
    return value
  }
}