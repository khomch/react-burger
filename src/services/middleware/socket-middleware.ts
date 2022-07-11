import { Middleware, MiddlewareAPI } from "redux";
import { AppDispatch, RootState } from "../store-types";

export const socketMiddleware = (wsActions: object): Middleware => {
  return (store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return (next: (arg0: any) => void) => (action: { type: string; payload: string; }) => {
      const { dispatch } = store;
      const { type, payload } = action;
      const { wsInit, onOpen, onClose, onError, onMessage, disconnect }: any = wsActions;

      if (type === wsInit) {
        socket = new WebSocket(`${payload}`);
      }
      if (socket) {
        socket.onopen = (event: Event) => {
          dispatch({ type: onOpen, payload: event });
        };

        socket.onerror = (event: Event) => {
          dispatch({ type: onError, payload: event });
        };

        socket.onmessage = (event: { data: string; }) => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;

          dispatch({ type: onMessage, payload: restParsedData });
        };

        socket.onclose = (event: Event) => {
          dispatch({ type: onClose, payload: event });
        };
      }

      if (type === disconnect) {
        socket?.close()
      }

      next(action);
    };
  };
};