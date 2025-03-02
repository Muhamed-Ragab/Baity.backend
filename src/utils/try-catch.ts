type ErrorConstructor = new (...args: any[]) => Error;

type TryCatchResponse<T, E extends ErrorConstructor> =
  | [undefined, T]
  | [InstanceType<E>];

type TryCatch = <T, E extends ErrorConstructor>(
  promise: Promise<T>,
  customError?: E
) => Promise<TryCatchResponse<T, E>>;

const tryCatch: TryCatch = async <T, E extends ErrorConstructor>(
  promise: Promise<T>,
  customError?: E
) => {
  return promise
    .then(data => [undefined, data] as TryCatchResponse<T, E>)
    .catch(error => {
      if (!customError || error instanceof customError) {
        return [error];
      }

      if (error instanceof Error) {
        return [
          new customError(error.message, {
            stack: error.stack,
            cause: error.cause,
          }),
        ];
      }

      return [
        new customError(
          'An unexpected error occurred. Please try again later.',
          { error }
        ),
      ];
    });
};

export default tryCatch;
