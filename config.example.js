// 高德地图API配置文件
// 请将此文件复制为 config.js 并填入您的API密钥

const AMAP_CONFIG = {
    // 高德地图API密钥
    // 请访问 https://lbs.amap.com/ 申请您的API密钥
    API_KEY: 'YOUR_AMAP_KEY_HERE',
    
    // 地图默认配置
    DEFAULT_CENTER: [116.397428, 39.90923], // 北京市中心
    DEFAULT_ZOOM: 12,
    
    // 地图主题
    MAP_THEME: 'normal'
};

// 导出配置
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AMAP_CONFIG;
} else if (typeof window !== 'undefined') {
    window.AMAP_CONFIG = AMAP_CONFIG;
}
