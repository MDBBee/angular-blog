import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nameInitials',
})
export class NameInitialsPipe implements PipeTransform {
  transform(value: string): string {
    return value
      .split(' ')
      .map((word) => word.charAt(0))
      .join('');
  }
}
