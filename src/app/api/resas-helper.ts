export type ApiResponse<Result extends object> = {
  message: string | null;
  result: Result;
};

const BASE_URL = "https://opendata.resas-portal.go.jp/api/v1";

const ERROR_MESSAGES = {
  fetchFailed: (url: string, status: number, statusText: string) =>
    `Failed to fetch ${url}: ${status} ${statusText}`,
  apiError: (url: string, message: string) =>
    `API error occurred ${url}: ${message}`,
  resultNotFound: (url: string) =>
    `Result not found ${url}: Response does not contain result field`,
};

export const fetchResasApi = async <Result extends object>(
  url: string,
): Promise<Result> => {
  const endpoint = `${BASE_URL}${url}`;

  const res = await fetch(endpoint, {
    headers: {
      "X-API-KEY": process.env.RESAS_API_KEY ?? "",
    },
  });

  if (!res.ok) {
    throw new Error(
      ERROR_MESSAGES.fetchFailed(res.url, res.status, res.statusText),
    );
  }

  const data: ApiResponse<Result> = await res.json();

  if (data.message) {
    throw new Error(ERROR_MESSAGES.apiError(res.url, data.message));
  }

  if (!data.result) {
    throw new Error(ERROR_MESSAGES.resultNotFound(res.url));
  }

  return data.result;
};
