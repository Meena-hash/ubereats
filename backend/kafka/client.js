var rpc = new (require("./kafkarpc"))();

function make_request(queue_name, msg_payload, callback) {
  rpc.makeRequest(queue_name, msg_payload, function (error, response) {
    if (error) {
      callback(error, null);
    } else {
      callback(null, response);
    }
  });
}

exports.make_request = make_request;
