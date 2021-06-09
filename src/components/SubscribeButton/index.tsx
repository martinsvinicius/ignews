import { signIn, useSession } from 'next-auth/client';
import { api } from '../../services/api';
import styles from './styles.module.scss';

export function SubscribeButton() {
  const [session] = useSession();

  async function handleSubscribe() {
    if(!session) {
      signIn('github');
      return;
    }

    try {
      const response = await api.post('/subscribe');

      const { sessionId } = response.data;
    } catch {

    }
  }

  return(
    <button 
      className={styles.subscribeButton} 
      type="button"
      onClick={handleSubscribe}>
      Subscribe now
    </button>
  );
}