export type RequestOptions = {
  json?: boolean;
  browser?: boolean;
};

export async function request(
  method: "GET" | "POST" | "PUT" | "DELETE",
  url: string,
  body?: any,
  headers?: { [key: string]: string },
  options?: RequestOptions
) {
  if (options?.json) {
    headers = {
      ...headers,
      "Content-Type": "application/json",
      "Accept": "application/json",
    };
    body = JSON.stringify(body);
  }

  try {
    const response = await fetch(url, {
      method: method,
      body: body,
      headers: headers,
    });

    // Check if the response is an HTTP status code, i.e. between 100 and 599
    if (response.status < 100 || response.status > 599) {
      throw new Error("Invalid HTTP status code");
    }

    return response;
  } catch (err) {
    if (!options || options.browser === undefined || options.browser === null || options.browser) {
      alert("An error occurred while processing your request. Please try again later.");
    }
    throw err;
  }
}

export async function get(url: string, headers?: { [key: string]: string }, options?: RequestOptions) {
  return request("GET", url, undefined, headers, options);
}

export async function post(url: string, body?: any, headers?: { [key: string]: string }, options?: RequestOptions) {
  return request("POST", url, body, headers, options);
}

export async function put(url: string, body?: any, headers?: { [key: string]: string }, options?: RequestOptions) {
  return request("PUT", url, body, headers, options);
}

export async function del(url: string, headers?: { [key: string]: string }, options?: RequestOptions) {
  return request("DELETE", url, undefined, headers, options);
}
