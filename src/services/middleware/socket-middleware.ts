export const socketMiddleware = (wsUrl: string, wsActions: any):any => {
    return (store: { dispatch: any; getState: any; }) => {
      let socket: any = null;
  
      return (next: (arg0: any) => void) => (action: { type: any; payload: any; }) => {
        const { dispatch } = store;
        const { type, payload } = action;
        const { wsInit, wsSendMessage, onOpen, onClose, onError, onMessage }: any = wsActions;
        
        if (type === wsInit) {
          socket = new WebSocket(`${wsUrl}`);
        }
        if (socket) {
          socket.onopen = (event: any) => {
            dispatch({ type: onOpen, payload: event });
          };
  
          socket.onerror = (event: any) => {
            dispatch({ type: onError, payload: event });
          };
  
          socket.onmessage = (event: { data: any; }) => {
            const { data } = event;
            const parsedData = JSON.parse(data);
            const { success, ...restParsedData } = parsedData;
  
            dispatch({ type: onMessage, payload: restParsedData });
          };
  
          socket.onclose = (event: any) => {
            dispatch({ type: onClose, payload: event });
          };
  
          if (type === wsSendMessage) {
            const message = { ...payload };
            socket.send(JSON.stringify(message));
          }
        }
  
        next(action);
      };
    };
  };