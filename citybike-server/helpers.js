const axios = require("axios");

module.exports = requests = async (req) => {
  try {
    const response = await axios.get(req.url);
    return response;
  } catch (err) {
    console.log(err);
  }
};

module.exports = getDataAndEmit = async (socket, url) => {
  const res = await requests({ url: url });
  res.data.network.timestamp = Date.now();
  console.log('Send At:', new Date());
  socket.emit("map:data", res.data.network);
};
