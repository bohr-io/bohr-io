type BohrResponse<T> = {
  data: T | null
  error: any
  status?: number
}

export default async function bohrFetch<T = any>(...params: Parameters<typeof fetch>): Promise<BohrResponse<T>> {
  try {
    let resParsedJson;
    const res = await fetch(...params);

    const resContentType = res.headers.get('content-type');
    if (
      res.status !== 204 &&
      resContentType?.includes('application/json')
    ) {
      resParsedJson = await res.json();
    } else {
      resParsedJson = await res.text() || null;
    }

    if (!res.ok) {
      return {
        data: null,
        error: resParsedJson || res.statusText,
        status: res.status
      };
    }

    return {
      data: resParsedJson,
      error: null,
      status: res.status,
    };
  } catch (error) {
    console.log(error);

    return {
      data: null,
      error: error
    };
  }
}
