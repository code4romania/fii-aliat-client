import axios from "axios";

const BASE_URL = process.env.VUE_APP_API;

const getOne = (path, cb, isArray) => {
  axios
    .get(BASE_URL + path)
    .then(({ data }) => {
      cb(null, isArray ? data[0] : data);
    })
    .catch(error => cb(error, null));
};

const getMany = (path, cb) =>
  axios
    .get(BASE_URL + path)
    .then(({ data }) => {
      cb(null, data);
    })
    .catch(error => cb(error, null));

const post = (path, body) =>
  axios.post(BASE_URL + "/stories", body);

const getPage = (slug, cb) => getOne(`/pages?slug=${slug}`, cb, true);
const getStories = cb => getMany("/stories", cb);
const getStory = (id, cb) => getOne(`/stories/${id}`, cb);
const getBanners = cb => getMany("/banners", cb);
const postStory = body => post("/stories", body);

export default {
  getPage,
  getStories,
  getStory,
  getBanners,
  postStory
};
