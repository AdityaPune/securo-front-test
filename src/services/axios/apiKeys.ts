import axios, { getJWT } from './axios';

function formatURL({
  key = '',
  isSandbox = false,
}: {
  key?: string;
  isSandbox?: boolean;
}) {
  let url = `/api/v1/api-key/${key}`;

  if (isSandbox) {
    url += '?sandbox=true';
  }

  return url;
}

export const getApiKeys = async (isSandbox = false) => {
  const header = await getJWT();
  const res = await axios.get(formatURL({ isSandbox }), header);
  return res.data;
};

export const createApiKey = async (isSandbox = false) => {
  const header = await getJWT();
  const res = await axios.post(formatURL({ isSandbox }), {}, header);
  return res.data;
};

export const deleteApiKey = async (key: string, isSandbox = false) => {
  const header = await getJWT();
  const res = await axios.delete(formatURL({ key, isSandbox }), header);
  return res.data;
};

export const getApiKey = async (key: string, isSandbox = false) => {
  const header = await getJWT();
  const res = await axios.get(formatURL({ key, isSandbox }), header);
  return res.data;
};

export const updateApi = async (
  key: string,
  permissions: number[],
  ips: string[],
  isSandbox = false
) => {
  const header = await getJWT();
  const res = await axios.patch(
    formatURL({ key, isSandbox }),
    {
      permissions,
      ips,
    },
    header
  );
  return res.data;
};
