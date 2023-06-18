const headers = {
    'Content-Type': 'application/json',
    //'Authorization': 'Bearer your_token'
  };
  
  const options = {
    method: 'GET',
    headers: headers,
    mode: 'cors',
    cache: 'no-cache'
    // Additional options can be added here
  };
  
  
  
  async function fetcher(url,options){
      const result = await fetch(url, options)
          .then(response => {
              if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
              }
              return response.text();
          })
          .catch(error => {
              // Handle any errors that occurred during the request
              console.error(error);
          });
      return result
  }