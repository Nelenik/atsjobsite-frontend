import { ListRecordsParams } from "@/types/airtable";
import axios from "axios";

const baseKey = process.env.NEXT_PUBLIC_AIRTABLE_API_KEY;
const baseUrl = `${process.env.NEXT_PUBLIC_AIRTABLE_ENDPOINT_URL}/${process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID}`;

//инициализация инстанса axios с общими для всех запросов настройками.
export const Axios = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${baseKey}`,
  },
});

export const getListRecords = async <T>(
  tableNameOrId: string,
  params: ListRecordsParams
): Promise<T> => {
  try {
    const response = await Axios.post(`/${tableNameOrId}/listRecords`, {
      data: params,
    });
    return response.data;
  } catch (err) {
    console.log(err);
    throw new Error(`Failed to fetch records: ${err}`);
  }
};
