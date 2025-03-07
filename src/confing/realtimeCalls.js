import {
  getDatabase,
  ref,
  query,
  equalTo,
  orderByChild,
  get,
  push,
  remove,
  update,
} from 'firebase/database';
import firebasAcademia from './firebaseConfig';

const db = getDatabase(firebasAcademia);

export const readData = async (path, child, value) => {
  if (child == null || value == null) {
    const response = await get(ref(db, path));
    if (response.exists()) {
      return response.val();
    } else {
      console.log('No data available');
      return null;
    }
  } else {
    const response = query(ref(db, path), orderByChild(child), equalTo(value));
    return get(response);
  }
};

export const writeData = async (path, data, permissions) => {
  try {
    if (permissions == 'write' || permissions == 'admin') {
      await push(ref(db, path), data);
      return { success: true, error: null };
    } else {
      console.log('you have no permissions to write');
    }
  } catch (error) {
    console.log({ success: false, error: error.message });
    return { success: false, error: error.message };
  }
};

export const removeData = async (path, data, permissions) => {
  try {
    if (permissions == 'delete' || permissions == 'admin') {
      await remove(ref(db, path), data);
      return { success: true, error: null };
    } else {
      console.log('you have no permissions to write');
    }
  } catch (error) {
    console.log({ success: false, error: error.message });
    return { success: false, error: error.message };
  }
};

export const updateData = async (path, data, permissions) => {
  try {
    if (permissions == 'write' || permissions == 'admin') {
      await update(ref(db, path), data);
      return { success: true, error: null };
    } else {
      console.log('you have no permissions to write');
    }
  } catch (error) {
    console.log({ success: false, error: error.message });
    return { success: false, error: error.message };
  }
};
