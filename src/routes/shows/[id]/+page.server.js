// src/routes/shows/[id]/+page.server.js
export const load = async (event) => {
    try {
      const { params } = event;
      const apiBase = import.meta.env.VITE_API_URL;
      
      // 添加缓存控制头
      const res = await event.fetch(`${apiBase}/api/shows/${params.id}`, {
        headers: {
          'Cache-Control': 'max-age=300' // 5分钟缓存
        }
      });
      
      // 验证响应状态
      if (!res.ok) {
        const errorText = await res.text(); // 先读取错误信息
        throw new Error(`HTTP error! Status: ${res.status}, Message: ${errorText}`);
      }
  
      // 一次性读取响应体
      const data = await res.json();
      return {
        show: {
          ...data,
          cover: data.coverImage,
          staff: data.staff || [],
          cast: data.cast || []
        }
      };
    } catch (error) {
      console.error('API请求失败:', error);
      return {
        status: 500,
        error: '无法加载番剧详情'
      };
    }
  }
