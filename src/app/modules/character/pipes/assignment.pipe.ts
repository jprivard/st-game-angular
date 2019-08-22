import { Pipe, PipeTransform } from '@angular/core';
import { Assignment, Character } from '../models/character.model';
import { TranslateService } from '@ngx-translate/core';

@Pipe({name: 'positionAndShip'})
export class AssignmentPipe implements PipeTransform {
  constructor(private translation: TranslateService) {}

  transform(assignment: Assignment): string {
    return `${ this.translation.instant(assignment.position) } (${ assignment.ship })`;
  }
}

@Pipe({name: 'fullname'})
export class FullnamePipe implements PipeTransform {
  transform(character: Character): string {
    return `${ character.firstName } ${ character.lastName }`;
  }
}
