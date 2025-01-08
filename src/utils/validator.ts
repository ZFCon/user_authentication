import { validateOrReject } from 'class-validator';

export function dtoToValidator(dtoClass: new () => any) {
  return (body: Object) => {
    return validateOrReject(Object.assign(new dtoClass(), body));
  };
}
