import { IsInt, IsString, IsUrl } from 'class-validator';

export class VenueDto {
  @IsInt()
  id: number;

  @IsString()
  name: string;

  @IsUrl()
  link: string;
}
