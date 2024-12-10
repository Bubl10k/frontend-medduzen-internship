import { toast } from 'react-toastify';
import TokenService from '../services/token.service';

const socketMiddleware =
  socketService =>
  ({ dispatch }) =>
  next =>
  action => {
    const { type } = action;

    switch (type) {
      case 'socket/connect':
        socketService.connect(
          `${process.env.VITE_WEBSOCKET_URL}/?token=${
            TokenService.getTokens()?.access
          }`,
        );

        socketService.on('message', event => {
          const data = JSON.parse(event.data);
          toast.info(data.notification);
        });

        socketService.on('close', () => {
          dispatch({ type: 'socket/disconnected' });
        });

        break;

      case 'socket/disconnect':
        socketService.disconnect();
        break;

      default:
        break;
    }

    return next(action);
  };

export default socketMiddleware;
