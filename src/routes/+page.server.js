// src/routes/+page.server.js
export const load = async (event) => {
  try {
    const apiBase = import.meta.env.VITE_API_URL;
    const res = await event.fetch(`${apiBase}/api/shows`);
    
    // 验证响应状态
    if (!res.ok) {
      const errorText = await res.text(); // 先读取错误信息
      throw new Error(`HTTP error! Status: ${res.status}, Message: ${errorText}`);
    }

    // 正确处理响应体
    const contentType = res.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
      throw new Error(`Invalid content type: ${contentType}`);
    }

    // 一次性读取响应体
    const responseBody = await res.json();
    return {
      shows: responseBody.data.map(show => ({
        ...show,
        cover: show.coverImage,
        staff: []
      }))
    };
  } catch (error) {
    console.error('API请求失败:', error);
    return {
      status: 500,
      error: '无法加载番剧列表'
    };
  }
}