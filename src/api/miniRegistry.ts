import axios from 'axios';

export const getMiniApps = async () => {
  try {
    const res = await axios.get('http://192.168.1.82:8080/mini-app-versions');
    return res?.data;
  } catch (error) {}
};
