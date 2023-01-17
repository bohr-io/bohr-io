import store from '@/store/index';
import { ToastData } from '@/types';

type ToastRequest = Omit<ToastData, 'id'> & {
  isFixed?: boolean
}

type HelperOptions = Omit<ToastRequest, 'message' | 'type'>

class ToastService {
  show(toastRequest: ToastRequest) {
    const { message, type, action, isFixed } = toastRequest;
    const id = `${message} - ${Math.random()}`

    const messageData = {
      id,
      message,
      type: type || 'tip',
      action,
    };

    addMessage(messageData);
    const removeToastCallback = () => removeMessage(id);

    if (!isFixed) {
      const timeoutId = setTimeout(removeToastCallback, 2000);
      return () => {
        clearTimeout(timeoutId);
        removeToastCallback();
      }
    }

    return removeToastCallback;
  }

  error(message: string, options?: HelperOptions) {
    return this.show({
      message,
      type: 'error',
      ...options,
    });
  }

  warn(message: string, options?: HelperOptions) {
    return this.show({
      message,
      type: 'warn',
      ...options,
    });
  }

  success(message: string, options?: HelperOptions) {
    return this.show({
      message,
      type: 'success',
      ...options,
    });
  }
}

function addMessage(newMessage: ToastData) {
  const messages = store.state.toastData || [];
  const newMessages = [...messages, newMessage];
  store.commit('setToastData', newMessages);
}

function removeMessage(messageId: string) {
  const messages = store.state.toastData || [] as ToastData[];
  const newMessages = messages.filter((message) => message.id !== messageId);
  store.commit('setToastData', newMessages);
}

export default new ToastService();
