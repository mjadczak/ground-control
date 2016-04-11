import Relay from 'react-relay'

export default class GCNetworkLayer extends Relay.DefaultNetworkLayer {
  handleStructuredError(error) {
    let parsedError = null;

    try {
      parsedError = JSON.parse(error.message);
    } catch (ex) {
      return false
    }

    if (parsedError) {
      log.debug(parsedError);

      if (parsedError.status === 401 || parsedError.status === 403) {
        window.location = `/signup?next=${window.location.pathname}`;
      } else if (parsedError.status === 404) {
        window.location = '/404';
      }
      return true
    }
  }

  sendQueries(requests) {
    return Promise.all(requests.map((request) => {
      return this._sendQuery(request)
        .then((result) => {
          return result.json();
        })
        .then((payload) => {
          if (payload.hasOwnProperty('errors')) {
            let userError = false
            if (payload.errors.length > 0)
              userError = this.handleStructuredError(payload.errors[0]);

            let errorString = 'Server request for query `' + request.getDebugName() + '` ' + 'failed for the following reasons:\n\n' + this.formatRequestErrors(request, payload.errors);
            if (!userError)
              log.error(errorString, payload.errors);

            let error = new Error(errorString);
            error.source = payload;
            request.reject(error);
          } else if (!payload.hasOwnProperty('data')) {
            let errorMsg = 'Server response was missing for query `' + request.getDebugName() + '`.';
            log.error(errorMsg);

            request.reject(new Error(errorMsg));
          } else {
            request.resolve({ response: payload.data });
          }
        })
        .catch((error) => {
          log.error(error.message);
          return request.reject(error);
        });
    }));
  };
}
