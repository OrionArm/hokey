/*
interface Action<T extends string> {
  type: T;
}

interface ActionWithPayload<T extends string, P> extends Action<T> {
  payload: P;
}

export function createAction<T extends string>(type: T): Action<T>;
export function createAction<T extends string, P>(type: T, payload: P): ActionWithPayload<T, P>;
export function createAction(type: string, payload?: any) {
  return payload ? { type, payload } : { type };
}

type ActionFn<T extends string> = () => Action<T>;
type ActionWithPayloadFn<T extends string, P> = (payload: P) => ActionWithPayloadFn<T, P>;

function action<T extends string>(type: T): ActionFn<T>;
function action<T extends string, P>(type: T, payload: P): ActionWithPayloadFn<T, P>;
function action(type: string) {
  return  (payload?: any) => (payload ? { type, payload } : { type });
}

export default action;
*/
