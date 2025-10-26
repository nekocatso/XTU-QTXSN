# XTU-QTXSN
XTU恰同学少年虚拟实验平台

## 项目简介

XTU恰同学少年虚拟实验平台是一个基于Web的虚拟实验系统，专为湘潭大学学生设计，提供物理、化学、生物等多学科的在线实验环境。

## 功能特点

- 🧪 **多学科实验**：支持物理、化学、生物等多个学科的虚拟实验
- 🎨 **可视化界面**：通过Canvas提供直观的实验演示
- 📊 **数据记录**：自动记录和展示实验数据
- 💾 **结果保存**：支持保存实验结果到本地
- 📱 **响应式设计**：支持多种设备访问

## 支持的实验

### 物理实验
- 单摆实验：测量单摆周期，验证周期公式
- 自由落体实验：测量重力加速度

### 化学实验
- 酸碱滴定实验：标准溶液滴定

### 生物实验
- 显微镜观察：虚拟显微镜观察细胞结构

## 技术栈

- **后端**：Python Flask
- **前端**：HTML5, CSS3, JavaScript (Canvas)
- **数据处理**：NumPy, Pandas
- **可视化**：Matplotlib

## 安装与运行

### 环境要求

- Python 3.8+
- pip

### 安装步骤

1. 克隆仓库
```bash
git clone https://github.com/nekocatso/XTU-QTXSN.git
cd XTU-QTXSN
```

2. 安装依赖
```bash
pip install -r requirements.txt
```

3. 运行应用

开发环境（启用调试）：
```bash
python app.py --debug
```

生产环境（推荐使用WSGI服务器）：
```bash
# 使用Gunicorn（需要先安装：pip install gunicorn）
gunicorn -w 4 -b 0.0.0.0:5000 app:app

# 或直接运行（不带调试模式）
python app.py
```

4. 访问应用
打开浏览器访问：`http://localhost:5000`

## 项目结构

```
XTU-QTXSN/
├── app.py                 # Flask应用主文件
├── requirements.txt       # Python依赖
├── README.md             # 项目说明
├── templates/            # HTML模板
│   ├── base.html        # 基础模板
│   ├── index.html       # 首页
│   ├── experiment.html  # 实验页面
│   └── about.html       # 关于页面
├── static/              # 静态资源
│   ├── css/
│   │   └── style.css    # 样式文件
│   └── js/
│       ├── main.js      # 主JS文件
│       └── experiment.js # 实验JS文件
└── experiments/         # 实验数据
    └── data/           # 实验结果保存目录
```

## 使用说明

1. 访问首页，浏览可用的实验列表
2. 点击"开始实验"进入实验页面
3. 调整实验参数
4. 点击"开始实验"运行实验
5. 查看实验数据和可视化结果
6. 点击"保存结果"保存实验数据

## 安全说明

本平台已实施以下安全措施：

- **路径遍历防护**：实验结果保存时验证文件路径，防止路径遍历攻击
- **输入验证**：对用户输入的实验ID进行严格验证，仅允许字母数字和特定字符
- **调试模式控制**：生产环境默认禁用Flask调试模式，避免安全风险
- **依赖安全**：使用已修复已知漏洞的Flask 2.3.2版本

**生产部署建议**：
- 使用WSGI服务器（如Gunicorn或uWSGI）而非Flask内置服务器
- 配置反向代理（如Nginx）处理静态文件和SSL
- 定期更新依赖包以获取安全补丁
- 限制文件上传大小和类型
- 实施访问控制和用户认证（如需要）

## 联系方式

如需技术支持或代做服务，请联系：

微信：NULL0001000

## 许可证

MIT License

## 致谢

感谢湘潭大学提供的支持和指导。
