import { Field, InputType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@InputType()
export class AssignStaffToFligh {
  @Field()
  @IsUUID()
  flightId: string;

  @Field()
  @IsUUID()
  staffId: string;
}
