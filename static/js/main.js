// 主JavaScript文件
console.log('XTU虚拟实验平台已加载');

// 通用工具函数
const Utils = {
    // 显示消息
    showMessage: function(message, type = 'info') {
        console.log(`[${type.toUpperCase()}] ${message}`);
        // 可以扩展为显示toast通知
        alert(message);
    },

    // 格式化数字
    formatNumber: function(num, decimals = 2) {
        return Number(num).toFixed(decimals);
    },

    // 获取当前时间戳
    getTimestamp: function() {
        return new Date().toISOString();
    }
};

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    console.log('页面加载完成');
    
    // 为所有卡片添加动画效果
    const cards = document.querySelectorAll('.experiment-card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
});
