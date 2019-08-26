import { Character } from '../../character/models/character.model';

export interface Mission {
  id: number;
  name: string;
  description: string;
  active: boolean;
  lastModified: Date;
  unreadMessages: number;
  participants: Character[];
}
