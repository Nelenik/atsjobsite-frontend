'use server';

import { apiPost } from './api';
import { TMutationState } from './types';

export const storeCompany = async (_: TMutationState, body: FormData) => {
  try {
    const response = await apiPost<unknown>('/company', body);
    console.log({ response });
  } catch (error) {
    console.error(error);
    return { sent: true, error: 'Ошибка сохранения' };
  }

  return { sent: true, error: null };
};

export const storeCv = async (formdata: FormData) => {
  const formObject = Object.fromEntries(formdata.entries());

  console.log({ formObject });
};

export const storeVacancy = async (formdata: FormData) => {
  const formObject = Object.fromEntries(formdata.entries());

  console.log({ formObject });
};
