import { User } from './User';

export interface SchedulePattern {
  schedulePatternId: number;
  schedulePatternName: string;
  pattern: string;
  createAt: Date;
  updateAt: Date;
  isPrivate: boolean;
  createdUser: User;
  updatedUser: User;
}
