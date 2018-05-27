export function getRequest(url: string) {
  return new Promise<string>((resolve, reject) => {
    const req = new XMLHttpRequest();
    req.open('GET', url);
    req.onload = () => {
      if(req.status === 200) {
        resolve(req.responseText);
      } else {
        reject(req.statusText + req.responseText);
      }
    }
    req.send();
  });
}

export function postRequest(url: string, data: object) {
  return new Promise<string>((resolve, reject) => {
    const req = new XMLHttpRequest();
    req.open('POST', url);
    req.setRequestHeader('Content-Type', 'application/json');
    req.onload = () => {
      if(req.status === 200) {
        resolve(req.responseText);
      } else {
        reject(req.statusText + req.responseText);
      }
    }
    req.send(JSON.stringify(data));
  });
}