import axios from "axios";
import Cookies from "js-cookie";
import { header } from "../images";

const API_URL = process.env.REACT_APP_API_URL;

const saveData = async (api, _data) => {
  // console.log("check", _data, api);
  try {
    const token = Cookies.get("authToken");
    const loginAccessToken = Cookies.get("login_access_token");
    const accessToken = token || loginAccessToken;

    if (!accessToken) {
      // console.log("토큰이 없습니다");
      return;
    }

    const { data } = await axios.post(
      `${API_URL}/${api}`,
      {
        data: _data,
      },
      {
        headers: { Authorization: `Bearer ${accessToken}` },
        withCredentials: true,
      }
    );
    // console.log(data, "axios");
    return { state: 200, message: "success" };
  } catch (error) {
    return { state: 403, message: error };
  }
};

const getworkspaceDataOne = async () => {
  try {
    const token = Cookies.get("authToken");
    const loginAccessToken = Cookies.get("login_access_token");
    const accessToken = token || loginAccessToken;

    if (!accessToken) {
      // console.log("토큰이 없습니다");
      return;
    }
    // console.log("axiosget");
    const { data } = await axios.get(
      `${API_URL}/api/workspace/workspacedataOne`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
        withCredentials: true,
      }
    );
    // console.log(data, "axiosget");
    return data;
  } catch (error) {
    return { state: 403, message: error };
  }
};
const getworkspaceDataTwo = async () => {
  try {
    const token = Cookies.get("authToken");
    const loginAccessToken = Cookies.get("login_access_token");
    const accessToken = token || loginAccessToken;

    if (!accessToken) {
      // console.log("토큰이 없습니다");
      return;
    }
    // console.log("axiosget");
    const { data } = await axios.get(
      `${API_URL}/api/workspace/workspacedataTwo`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
        withCredentials: true,
      }
    );
    // console.log(data, "axiosget2");
    return data;
  } catch (error) {
    return { state: 403, message: error };
  }
};

const getTextdata = async () => {
  try {
    const token = Cookies.get("authToken");
    const loginAccessToken = Cookies.get("login_access_token");
    const accessToken = token || loginAccessToken;

    if (!accessToken) {
      // console.log("토큰이 없습니다");
      return;
    }

    const { data } = await axios.get(`${API_URL}/api/workspace/getPage`, {
      headers: { Authorization: `Bearer ${accessToken}` },
      withCredentials: true,
    });
    return data;
  } catch (error) {
    // console.log(error);
    return error;
  }
};

const getWspacecontent = async (wname) => {
  try {
    const token = Cookies.get("authToken");
    const loginAccessToken = Cookies.get("login_access_token");
    const accessToken = token || loginAccessToken;

    if (!accessToken) {
      // console.log("토큰이 없습니다");
      return;
    }

    const { data } = await axios.get(
      `${API_URL}/api/workspaceContent`,
      {
        wname,
      },
      {
        headers: { Authorization: `Bearer ${accessToken}` },
        withCredentials: true,
      }
    );
    // console.log(data, "getwspaceconte");
    return data;
  } catch (error) {
    // console.log(error);
    return error;
  }
};
const PostBlockcontent = async (
  workspacename,
  foldername,
  filename,
  { data },
  imgfile,
  blockId
) => {
  const token = Cookies.get("authToken");
  const loginAccessToken = Cookies.get("login_access_token");
  const accessToken = token || loginAccessToken;

  if (!accessToken) {
    // console.log("토큰이 없습니다");
    return;
  }
  if (imgfile) {
    // console.log(data, "axiosdata");
    // console.log("imgfile", imgfile);
    const form = new FormData();
    const dataJson = JSON.stringify(data);
    form.append("data", dataJson);
    form.append("imgfile", imgfile);

    const { data: workspaceData } = await axios.post(
      `${API_URL}/api/workspace/selectspace/${workspacename}/${foldername}/${filename}/image/${blockId}`,
      form,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  } else {
    // const form = new FormData();
    // form.append("workspacename", workspacename)
    // form.append("foldername", foldername)
    // form.append("filename", filename)
    // form.append("data", data)

    // const { data: workspaceData } = await
    //     axios.post(`${WORKSPACE_URL}/workspace/selectspace/${workspacename}/${foldername}/${filename}`,
    //         form,
    //         {
    //             header: {
    //                 'Content-Type': 'multipart/form-data'
    //             }
    //         }
    //     )
    const { data: workspaceData } = await axios.post(
      `${API_URL}/api/workspace/selectspace/${workspacename}/${foldername}/${filename}`,
      { data },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  }
  // const newData = JSON.parse(workspaceData.data.PageData.page_content)
  return { state: 200, message: "nice" };
};

const getBlockcontent = async (workspacename, foldername, filename) => {
  const token = Cookies.get("authToken");
  const loginAccessToken = Cookies.get("login_access_token");
  const accessToken = token || loginAccessToken;
  if (!accessToken) {
    // console.log("토큰이 없습니다");
    return;
  }
  const { data: workspaceData } = await axios.get(
    `${API_URL}/api/workspace/selectspace/${workspacename}/${foldername}/${filename}`,
    {
      headers: { Authorization: `Bearer ${accessToken}` },
      withCredentials: true,
    }
  );
  // console.log(workspaceData, "workspacedata");
  if (workspaceData.data.PageData) {
    const newData = JSON.parse(workspaceData.data.PageData.page_content);
    // console.log(newData);
    return newData;
  } else {
    return null;
  }
};
const getBlockIdcontent = async (result_id) => {
  try {

    const token = Cookies.get("authToken");
    const loginAccessToken = Cookies.get("login_access_token");
    const accessToken = token || loginAccessToken;
    // console.log(accessToken, 'accesstoken')
    if (!accessToken) {
      // console.log("토큰이 없습니다");
      return;
    }
    const { data: workspacePageData } = await axios.post(
      `${API_URL}/api/workspace/getBlockIdcontent`, {result_id },
      {
        headers: { Authorization: `Bearer ${accessToken}` },
        withCredentials: true,
      }
    );
    // console.log(workspacePageData, 'workspacepagedata return')
    return ({workspacePageData});
  } catch (error) {
    // console.log(error, 'error111')
    return error
  }

};

const DelWorkspace = async (workspacename, foldername) => {
  // console.log('Delworkspace', workspacename, foldername)
  const token = Cookies.get("authToken");
  const loginAccessToken = Cookies.get("login_access_token");
  const accessToken = token || loginAccessToken;
  // console.log("토큰이 이습니다");
  if (!accessToken) {
    // console.log("토큰이 없습니다");
    return;
  }
  const { data } = await axios.post(`${API_URL}/api/workspace/delworkspace`,
    { workspacename, foldername },
    {
      headers: { Authorization: `Bearer ${accessToken}` },
      withCredentials: true,
    }
  );
  return ('deleted')
};


const DelWorkspacepage = async (workspacename, foldername, filename) => {
  // console.log('Delworkspacepage', workspacename, foldername, filename)
  const token = Cookies.get("authToken");
  const loginAccessToken = Cookies.get("login_access_token");
  const accessToken = token || loginAccessToken;
  // console.log("토큰이 이습니다");
  if (!accessToken) {
    // console.log("토큰이 없습니다");
    return;
  }
  const { data } = await axios.post(`${API_URL}/api/workspace/delworkspacepage`,
    { workspacename, foldername, filename },
    {
      headers: { Authorization: `Bearer ${accessToken}` },
      withCredentials: true,
    }
  );
  return ('deleted')
};

const getPagecontent = async (result_id) => {
  const token = Cookies.get("authToken");
  const loginAccessToken = Cookies.get("login_access_token");
  const accessToken = token || loginAccessToken;
  // console.log("토큰이 이습니다");
  if (!accessToken) {
    // console.log("토큰이 없습니다");
    return;
  }
  const data = await axios.get(`${API_URL}/api/workspace/getpagecontent`, { result_id },
    {
      headers: { Authorization: `Bearer ${accessToken}` },
      withCredentials: true,
    }
  );
  return data
}


export {
  PostBlockcontent,
  getBlockIdcontent,
  DelWorkspacepage,
  DelWorkspace,
  saveData,
  getworkspaceDataOne,
  getworkspaceDataTwo,
  getTextdata,
  getWspacecontent,
  getBlockcontent,
  getPagecontent
};
