import Api from '@/api';

const BASE_URL = '/user/';

const addUser = (params) => Api.post(`${BASE_URL}/add`, { params });

const delUser = (params) => Api.get(`${BASE_URL}/del`, { params });

const updateUser = (params) => Api.post(`${BASE_URL}/save`, { params });

const getUser = (params) => Api.post(`${BASE_URL}/list`, { params });

const userApi= {
  addUser, // 增加用户
  delUser, // 删除用户
  updateUser, // 更新用户
  getUser, // 获取用户
};

export default userApi;
