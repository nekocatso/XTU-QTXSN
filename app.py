"""
XTU恰同学少年虚拟实验平台
XTU Qia Tongxue Shaonian Virtual Experiment Platform

这是一个基于Flask的虚拟实验平台，用于支持湘潭大学的在线实验课程。
This is a Flask-based virtual experiment platform for supporting XTU's online experimental courses.
"""

from flask import Flask, render_template, jsonify, request
import json
import os
from datetime import datetime

app = Flask(__name__)
app.config['SECRET_KEY'] = 'xtu-qtxsn-virtual-experiment-2025'

# 实验列表配置
EXPERIMENTS = {
    'physics': {
        'name': '物理实验',
        'experiments': [
            {
                'id': 'pendulum',
                'title': '单摆实验',
                'description': '通过改变摆长和质量，测量单摆周期，验证单摆周期公式',
                'difficulty': '初级'
            },
            {
                'id': 'freefall',
                'title': '自由落体实验',
                'description': '测量物体自由下落的时间和距离，验证重力加速度',
                'difficulty': '初级'
            }
        ]
    },
    'chemistry': {
        'name': '化学实验',
        'experiments': [
            {
                'id': 'titration',
                'title': '酸碱滴定实验',
                'description': '使用标准溶液滴定未知浓度的溶液',
                'difficulty': '中级'
            }
        ]
    },
    'biology': {
        'name': '生物实验',
        'experiments': [
            {
                'id': 'microscope',
                'title': '显微镜观察',
                'description': '使用虚拟显微镜观察细胞结构',
                'difficulty': '初级'
            }
        ]
    }
}

# 构建允许的实验ID白名单（用于安全验证）
ALLOWED_EXPERIMENT_IDS = set()
for category_data in EXPERIMENTS.values():
    for exp in category_data['experiments']:
        ALLOWED_EXPERIMENT_IDS.add(exp['id'])

@app.route('/')
def index():
    """主页"""
    return render_template('index.html', experiments=EXPERIMENTS)

@app.route('/experiment/<category>/<exp_id>')
def experiment(category, exp_id):
    """实验页面"""
    if category not in EXPERIMENTS:
        return "实验类别不存在", 404
    
    exp_list = EXPERIMENTS[category]['experiments']
    experiment_data = None
    for exp in exp_list:
        if exp['id'] == exp_id:
            experiment_data = exp
            break
    
    if not experiment_data:
        return "实验不存在", 404
    
    return render_template('experiment.html', 
                         category=category,
                         experiment=experiment_data)

@app.route('/api/save_result', methods=['POST'])
def save_result():
    """保存实验结果"""
    data = request.get_json()
    
    # 验证experiment_id是否在白名单中（防止路径遍历攻击）
    experiment_id = data.get('experiment_id', '')
    if experiment_id not in ALLOWED_EXPERIMENT_IDS:
        return jsonify({'status': 'error', 'message': '无效的实验ID'}), 400
    
    # 确保data目录存在
    data_dir = os.path.join('experiments', 'data')
    os.makedirs(data_dir, exist_ok=True)
    
    # 保存实验结果 - 使用已验证的安全文件名
    # experiment_id已通过白名单验证，仅包含预定义的安全值（pendulum, freefall, titration, microscope）
    # 这些值不包含路径遍历字符，因此构造的文件路径是安全的
    filename = f"{experiment_id}_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json"
    filepath = os.path.join(data_dir, filename)
    
    # 安全提示：experiment_id已通过ALLOWED_EXPERIMENT_IDS白名单验证
    # lgtm[py/path-injection]
    with open(filepath, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    
    return jsonify({'status': 'success', 'message': '实验结果已保存'})

@app.route('/api/experiments')
def get_experiments():
    """获取实验列表API"""
    return jsonify(EXPERIMENTS)

@app.route('/about')
def about():
    """关于页面"""
    return render_template('about.html')

if __name__ == '__main__':
    # 仅在开发环境中启用debug模式
    # 生产环境应使用环境变量控制，或使用WSGI服务器
    import sys
    debug_mode = '--debug' in sys.argv
    app.run(debug=debug_mode, host='0.0.0.0', port=5000)
