import {
  getDatabase,
  ref,
  query,
  equalTo,
  orderByChild,
  get,
} from 'firebase/database';
import firebasAcademia from './firebaseConfig';

const db = getDatabase(firebasAcademia);

export const readData = async (path, child, value) => {
  console.log(value);
  const user = query(ref(db, path), orderByChild(child), equalTo(value));
  return get(user);
};
