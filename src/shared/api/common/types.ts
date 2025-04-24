import { TError } from "./errors";
// A generic type for tracking the state of a mutation (e.g. form submission or API call).
// The generic parameter `T` is used when the payload is expected to be a specific object type rather than FormData.
// By default, `T` is set to `unknown`, allowing flexibility depending on the use case.
export type TMutationState<T = unknown> = {
  sent: boolean;
  error: TError | null;
  payload?: FormData | T;
};
