import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

// const Contains =
//   <Domain, Domains extends Domain[]>(domains: [...Domains]) =>
//   (target: Object, propertyKey: string) => {
//     let value: string;
//     const getter = () => value;
//     const setter = function (newVal: Domain) {
//       if (domains.includes(newVal)) {
//         value = newVal;
//       } else {
//         throw Error(`Domain should be one of ${domains.join()}`);
//       }
//     };
//     Object.defineProperty(target, propertyKey, {
//       get: getter,
//       set: setter,
//     });
//   };
export type Currencies =
  | 'Dollar $'
  | 'Euro €'
  | 'Pound Sterling £'
  | 'Yen ¥'
  | 'Franc ₣'
  | 'Rupee ₹';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  displayedName?: string;

  @IsString()
  @IsOptional()
  avatarUrl?: string;

  @IsNumber()
  @IsOptional()
  TotalMonthBudget?: number;

  @IsString()
  @IsOptional()
  currencyFormat?: string;
  // @Contains([
  //   'Dollar $',
  //   'Euro €',
  //   'Pound Sterling £',
  //   'Yen ¥',
  //   'Franc ₣',
  //   'Rupee ₹',
  // ])
}
