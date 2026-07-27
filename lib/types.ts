/**
 * Structured response type returned by Next.js Server Actions.
 *
 * Invariants (documented at the type level — enforced by convention):
 *   - When `success === true`:  `errors` is `undefined`
 *   - When `success === false`: `data` is `undefined`
 *
 * These invariants cannot be expressed as a single TypeScript discriminated
 * union while keeping a generic type parameter, so they are captured via the
 * two narrowed union members below. Consumers should narrow on `success`
 * before accessing `data` or `errors`.
 *
 * @template T  The shape of the payload returned on a successful response.
 */
export type ActionResponse<T> =
  | {
      /** Indicates the operation completed without errors. */
      success: true;
      /** Human-readable confirmation message. */
      message: string;
      /** The returned payload. Always present when success is true. */
      data?: T;
      /** Never present when success is true. */
      errors?: undefined;
    }
  | {
      /** Indicates the operation failed. */
      success: false;
      /** Human-readable description of the failure. */
      message: string;
      /** Never present when success is false. */
      data?: undefined;
      /**
       * Field-level validation errors keyed by field name.
       * Each value is an array of error messages for that field.
       * May be absent when the failure is not validation-related.
       */
      errors?: Record<string, string[]>;
    };
