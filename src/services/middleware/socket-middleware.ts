import { Middleware } from "redux";
import { AppDispatch } from "../store-types";

export const socketMiddleware = (wsUrl: string, wsActions: object): Middleware => {
  return (store: { dispatch: AppDispatch; getState: object; }) => {
    let socket: WebSocket | null = null;

    return (next: (arg0: any) => void) => (action: { type: string; payload: string; }) => {
      const { dispatch } = store;
      const { type } = action;
      const { wsInit, onOpen, onClose, onError, onMessage }: any = wsActions;

      if (type === wsInit) {
        socket = new WebSocket(`${wsUrl}`);
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

      next(action);
    };
  };
};