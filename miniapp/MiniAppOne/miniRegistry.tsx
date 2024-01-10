/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import {getBrand} from 'react-native-device-info';

export const initRegistry = async () => {
  try {
    return await getBrand();
  } catch (error) {}
};
