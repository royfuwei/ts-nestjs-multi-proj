import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  BadRequestException,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate, ValidationError, ValidatorOptions } from 'class-validator';

@Injectable()
export class ReqValidationPipe implements PipeTransform {
  /* 擴充用的validateOptions */
  validateOptions: ValidatorOptions;
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, value);
    const defaultValidateOptions: ValidatorOptions = {
      validationError: {
        target: false, // 目標是否應在 ValidationError 中展示
        value: false, // 驗證值是否應在 ValidationError 中展示。
      },
      dismissDefaultMessages: false, // 如果設置為 true，驗證將不使用默認消息。如果錯誤消息未顯式設置，則為 undefined 的。
      skipMissingProperties: false, // 如果設置為 true，則驗證程序將跳過驗證對像中缺少的屬性的驗證。
      whitelist: true, // 如果設為true，會把非定義的key過濾掉。
      forbidNonWhitelisted: true, // 如果設為true，有非定義的key會報錯。
    };
    const validateOptions = Object.assign(
      {},
      defaultValidateOptions,
      this.validateOptions,
    );
    const errors = await validate(object, validateOptions);
    if (errors.length > 0) {
      console.log(errors);
      const errorMessage = this.mapValidationErrorsToStringArray(errors);
      throw new BadRequestException(errorMessage);
    }
    return object;
  }
  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }

  private getValidationErrorConstraints(errors: ValidationError[]) {
    if (errors.length > 0) {
      // 驗證到有錯誤後的動作
      const error = errors[0];
      if (!error.constraints)
        this.getValidationErrorConstraints(error.children);
      const constraints = Object.keys(error.constraints);
      const constraint = constraints[0];
      throw new BadRequestException(
        `Validation ${error.property} failed: ${error.constraints[constraint]}.`,
      );
    }
  }

  private mapValidationErrorsToStringArray = (
    errors: ValidationError[],
  ): string[] => {
    const mappedErrors: string[] = [];

    errors.forEach((err) => {
      if (err.children && err.children.length) {
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
