import axios from "axios";

export const forwardRequest = async (req, res, targetUrl) => {
  try {
    const method = req.method.toLowerCase();
    const headers = { ...req.headers };
    delete headers.host;

    const response = await axios({
      url: `${targetUrl}${req.originalUrl}`,
      method,
      headers,
      data: req.body,
      params: req.query,
    });

    return res.status(response.status).json(response.data);
  } catch (error) {
    const status = error.response?.status || 500;
    const data = error.response?.data || { message: error.message };
    return res.status(status).json(data);
  }
};
