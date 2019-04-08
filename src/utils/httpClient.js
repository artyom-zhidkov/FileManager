export default {
  GET(url, body = {}) {
    const promise = fetch(url, body);
    
    return promise.then((res) => {
        if (res.status >= 200 && res.status < 300) {
          return res;
        }
        throw new Error(res.statusText);
      }
    )
  },

  POST(url, body) {
    const promise = fetch(url,  {
      method: 'POST',
      headers: [
          ["Content-Type", "application/json"],
      ],
      body: JSON.stringify(body)
  });
    
    return promise.then((res) => {
        if (res.status >= 200 && res.status < 300) {
          return;
        }
        throw new Error(res.statusText);
      }
    )
  },

  DELETE(url) {
    const promise = fetch(url,  {
      method: 'DELETE',
      headers: [
      ["Content-Type", "application/json"],
      ],
    }
  );
    
    return promise.then((res) => {
        if (res.status >= 200 && res.status < 300) {
          return res;
        }
        throw new Error(res.statusText);
      }
    )
  }
}


