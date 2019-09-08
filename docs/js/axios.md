## Axios

```js
const axios = require('axios');

// Make a request for a user with a given ID
axios.get('/user?ID=12345')
  .then(function (response) {
    // handle success
    console.log(response);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
  });

// Optionally the request above could also be done as
axios.get('/user', {
    params: {
      ID: 12345
    }
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  })
  .then(function () {
    // always executed
  });  

// Want to use async/await? Add the `async` keyword to your outer function/method.
async function getUser() {
  try {
    const response = await axios.get('/user?ID=12345');
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}
```

```js
axios.post('/user', {
    firstName: 'Fred',
    lastName: 'Flintstone'
});

axios({
  method: 'post',
  url: '/user/12345',
  data: {
    firstName: 'Fred',
    lastName: 'Flintstone'
  }
});
```

### Requrest config

```js
let config = {
    url: '/user',
    method: 'get', //default
    baseURL: 'https://a.com/api',
    headers: {
        'X-requested-Width': 'XMLHttpRequest'
    },
    params: {
        ID: 123
    },
    // `data` is the data to be sent as the request body. 
    // Only applicable for request methods 'PUT', 'POST', 'PATCH'.
    data: {
        firstName: 'Fred'
    },
    timeout: 1000,
    // the type of data that the server will respond with 
    // options are 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
    responseType: 'json',  // default
    proxy: {
        host: '127.4.4.0',
        port: 9000,
        auth: {
            username: 'mikey',
            password: '123'
        }
    }
}
```

### Response Schema

```js
let req = {
    data: {},
    status: 200,
    statusText: 'OK',
    headers: {},
    // `config` is the config that was provided to 'axios' for the request
    config: {},
    // the request that generated this response
    // an XMLHttpRequest instance in the browser
    request: {}
}
```

### Config Default

#### Global axios defaults

```js
axios.defaults.baseURL = 'https://a.com/api';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
```

### Interceptors

```js
// Add a request interceptor
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // Do something with response data
    return response;
  }, function (error) {
    // Do something with response error
    return Promise.reject(error);
  });
```













