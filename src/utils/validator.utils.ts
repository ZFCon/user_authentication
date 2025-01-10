import { validate } from 'class-validator';

export function dtoToValidator(dtoClass: new () => any) {
  return async (body: Object) => {
    return await validate(Object.assign(new dtoClass(), body));
  };
}
