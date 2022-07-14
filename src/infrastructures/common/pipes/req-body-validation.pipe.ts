import {
  BadRequestException,
  Injectable,
  Optional,
  ValidationPipe,
  ValidationPipeOptions,
} from '@nestjs/common';
import { ValidationError } from 'class-validator';

@Injectable()
export class ReqBodyValidationPipe extends ValidationPipe {
  constructor(@Optional() options?: ValidationPipeOptions) {
    super(options);
  }

  public createExceptionFactory() {
    return (validationErrors: ValidationError[] = []) => {
      if (this.isDetailedOutputDisabled) {
        throw new BadRequestException([]);
      }
      const errors = this.mapValidationErrorsToStringArray(validationErrors);
      throw new BadRequestException(errors);
    };
  }

  private mapValidationErrorsToStringArray = (
    errors: ValidationError[],
  ): string[] => {
    const mappedErrors: string[] = [];

    errors.forEach((err) => {
      if (err.children.length) {
        const childrenConstraints = err.children.map((errChild) =>
          Object.values(errChild.constraints),
        );

        childrenConstraints.forEach((childrenError) => {
          childrenError.forEach((error) => mappedErrors.push(error));
        });
      }

      if (err.constraints !== undefined) {
        Object.values(err.constraints).forEach((error) => {
          mappedErrors.push(error);
        });
      }
    });

    return mappedErrors;
  };
}
