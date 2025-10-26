// 实验页面JavaScript
let experimentData = [];
let isRunning = false;

// 实验类
class VirtualExperiment {
    constructor(experimentId, category) {
        this.experimentId = experimentId;
        this.category = category;
        this.data = [];
        this.canvas = document.getElementById('experimentCanvas');
        this.ctx = this.canvas ? this.canvas.getContext('2d') : null;
        
        this.initExperiment();
    }

    initExperiment() {
        console.log(`初始化实验: ${this.experimentId}`);
        
        // 根据不同的实验类型初始化
        switch(this.experimentId) {
            case 'pendulum':
                this.initPendulum();
                break;
            case 'freefall':
                this.initFreefall();
                break;
            case 'titration':
                this.initTitration();
                break;
            case 'microscope':
                this.initMicroscope();
                break;
            default:
                this.initDefault();
        }
    }

    initPendulum() {
        // 单摆实验初始化
        const controls = document.getElementById('controls');
        controls.innerHTML = `
            <div>
                <label>摆长 (m):</label>
                <input type="range" id="length" min="0.1" max="2.0" step="0.1" value="1.0">
                <span id="lengthValue">1.0</span>
            </div>
            <div>
                <label>质量 (kg):</label>
                <input type="range" id="mass" min="0.1" max="2.0" step="0.1" value="0.5">
                <span id="massValue">0.5</span>
            </div>
            <div>
                <label>初始角度 (度):</label>
                <input type="range" id="angle" min="5" max="30" step="1" value="15">
                <span id="angleValue">15</span>
            </div>
        `;

        // 添加事件监听
        document.getElementById('length').addEventListener('input', (e) => {
            document.getElementById('lengthValue').textContent = e.target.value;
        });
        document.getElementById('mass').addEventListener('input', (e) => {
            document.getElementById('massValue').textContent = e.target.value;
        });
        document.getElementById('angle').addEventListener('input', (e) => {
            document.getElementById('angleValue').textContent = e.target.value;
        });

        this.drawPendulum(1.0, 15);
    }

    drawPendulum(length, angle) {
        if (!this.ctx) return;
        
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        const centerX = this.canvas.width / 2;
        const centerY = 50;
        const scale = 150;
        
        // 转换角度为弧度
        const angleRad = (angle * Math.PI) / 180;
        
        // 计算摆球位置
        const bobX = centerX + length * scale * Math.sin(angleRad);
        const bobY = centerY + length * scale * Math.cos(angleRad);
        
        // 绘制支点
        this.ctx.fillStyle = '#333';
        this.ctx.fillRect(centerX - 5, centerY - 5, 10, 10);
        
        // 绘制摆线
        this.ctx.strokeStyle = '#667eea';
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.moveTo(centerX, centerY);
        this.ctx.lineTo(bobX, bobY);
        this.ctx.stroke();
        
        // 绘制摆球
        this.ctx.fillStyle = '#764ba2';
        this.ctx.beginPath();
        this.ctx.arc(bobX, bobY, 20, 0, Math.PI * 2);
        this.ctx.fill();
        
        // 绘制角度标记
        this.ctx.strokeStyle = '#ccc';
        this.ctx.lineWidth = 1;
        this.ctx.beginPath();
        this.ctx.moveTo(centerX, centerY);
        this.ctx.lineTo(centerX, centerY + length * scale);
        this.ctx.stroke();
    }

    initFreefall() {
        const controls = document.getElementById('controls');
        controls.innerHTML = `
            <div>
                <label>高度 (m):</label>
                <input type="range" id="height" min="1" max="100" step="1" value="50">
                <span id="heightValue">50</span>
            </div>
            <div>
                <label>质量 (kg):</label>
                <input type="range" id="mass" min="0.1" max="10" step="0.1" value="1.0">
                <span id="massValue">1.0</span>
            </div>
        `;

        document.getElementById('height').addEventListener('input', (e) => {
            document.getElementById('heightValue').textContent = e.target.value;
        });
        document.getElementById('mass').addEventListener('input', (e) => {
            document.getElementById('massValue').textContent = e.target.value;
        });

        this.drawFreefall(50, 0);
    }

    drawFreefall(height, currentHeight) {
        if (!this.ctx) return;
        
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        const centerX = this.canvas.width / 2;
        const scale = 3;
        
        // 绘制地面
        this.ctx.fillStyle = '#8B4513';
        this.ctx.fillRect(0, this.canvas.height - 30, this.canvas.width, 30);
        
        // 绘制参考线
        this.ctx.strokeStyle = '#ccc';
        this.ctx.lineWidth = 1;
        this.ctx.setLineDash([5, 5]);
        this.ctx.beginPath();
        this.ctx.moveTo(centerX, 50);
        this.ctx.lineTo(centerX, this.canvas.height - 30);
        this.ctx.stroke();
        this.ctx.setLineDash([]);
        
        // 绘制物体
        const objectY = this.canvas.height - 30 - 20 - currentHeight * scale;
        this.ctx.fillStyle = '#667eea';
        this.ctx.fillRect(centerX - 15, objectY, 30, 30);
        
        // 绘制高度标记
        this.ctx.fillStyle = '#333';
        this.ctx.font = '14px Arial';
        this.ctx.fillText(`高度: ${currentHeight.toFixed(2)}m`, centerX + 30, objectY + 15);
    }

    initTitration() {
        const controls = document.getElementById('controls');
        controls.innerHTML = `
            <div>
                <label>滴定速度:</label>
                <input type="range" id="speed" min="1" max="10" step="1" value="5">
                <span id="speedValue">5</span>
            </div>
            <p>点击"开始实验"进行滴定</p>
        `;

        document.getElementById('speed').addEventListener('input', (e) => {
            document.getElementById('speedValue').textContent = e.target.value;
        });
    }

    initMicroscope() {
        const controls = document.getElementById('controls');
        controls.innerHTML = `
            <div>
                <label>放大倍数:</label>
                <select id="magnification">
                    <option value="40">40x</option>
                    <option value="100">100x</option>
                    <option value="400">400x</option>
                </select>
            </div>
            <div>
                <label>光圈:</label>
                <input type="range" id="aperture" min="1" max="10" step="1" value="5">
                <span id="apertureValue">5</span>
            </div>
        `;

        document.getElementById('aperture').addEventListener('input', (e) => {
            document.getElementById('apertureValue').textContent = e.target.value;
        });
    }

    initDefault() {
        const controls = document.getElementById('controls');
        controls.innerHTML = '<p>实验控制面板</p>';
        
        if (this.ctx) {
            this.ctx.fillStyle = '#667eea';
            this.ctx.font = '20px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.fillText('虚拟实验演示区域', this.canvas.width/2, this.canvas.height/2);
        }
    }

    start() {
        console.log('开始实验');
        isRunning = true;
        
        // 根据实验类型执行相应的实验
        switch(this.experimentId) {
            case 'pendulum':
                this.runPendulum();
                break;
            case 'freefall':
                this.runFreefall();
                break;
            default:
                this.runDefault();
        }
    }

    runPendulum() {
        const length = parseFloat(document.getElementById('length').value);
        const mass = parseFloat(document.getElementById('mass').value);
        const angle = parseFloat(document.getElementById('angle').value);
        
        // 计算周期 T = 2π√(L/g)
        const g = 9.8;
        const period = 2 * Math.PI * Math.sqrt(length / g);
        
        this.addData('摆长', length, 'm');
        this.addData('质量', mass, 'kg');
        this.addData('初始角度', angle, '度');
        this.addData('理论周期', period.toFixed(3), 's');
        
        Utils.showMessage(`实验完成！测量周期: ${period.toFixed(3)}秒`);
    }

    runFreefall() {
        const height = parseFloat(document.getElementById('height').value);
        const mass = parseFloat(document.getElementById('mass').value);
        
        // 计算自由落体时间 t = √(2h/g)
        const g = 9.8;
        const time = Math.sqrt(2 * height / g);
        
        // 动画演示下落
        let currentHeight = height;
        const startTime = Date.now();
        
        const animate = () => {
            const elapsed = (Date.now() - startTime) / 1000;
            
            if (elapsed < time && isRunning) {
                currentHeight = height - 0.5 * g * elapsed * elapsed;
                this.drawFreefall(height, currentHeight);
                requestAnimationFrame(animate);
            } else {
                this.drawFreefall(height, 0);
                this.addData('高度', height, 'm');
                this.addData('质量', mass, 'kg');
                this.addData('下落时间', time.toFixed(3), 's');
                this.addData('重力加速度', g, 'm/s²');
                isRunning = false;
                Utils.showMessage(`实验完成！下落时间: ${time.toFixed(3)}秒`);
            }
        };
        
        animate();
    }

    runDefault() {
        this.addData('实验时间', new Date().toLocaleString(), '');
        this.addData('实验状态', '已完成', '');
        Utils.showMessage('实验已完成！');
    }

    addData(parameter, value, unit) {
        const row = {
            id: this.data.length + 1,
            parameter: parameter,
            value: value,
            unit: unit
        };
        this.data.push(row);
        experimentData.push(row);
        
        this.updateDataTable();
    }

    updateDataTable() {
        const tbody = document.getElementById('dataTableBody');
        tbody.innerHTML = '';
        
        this.data.forEach(row => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${row.id}</td>
                <td>${row.parameter}</td>
                <td>${row.value} ${row.unit}</td>
            `;
            tbody.appendChild(tr);
        });
    }

    reset() {
        console.log('重置实验');
        this.data = [];
        experimentData = [];
        isRunning = false;
        this.updateDataTable();
        this.initExperiment();
    }

    saveResults() {
        console.log('保存实验结果');
        
        const results = {
            experiment_id: this.experimentId,
            category: this.category,
            timestamp: Utils.getTimestamp(),
            data: this.data
        };
        
        fetch('/api/save_result', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(results)
        })
        .then(response => response.json())
        .then(data => {
            Utils.showMessage(data.message);
        })
        .catch(error => {
            console.error('保存失败:', error);
            Utils.showMessage('保存失败，请重试');
        });
    }
}

// 页面加载完成后初始化实验
document.addEventListener('DOMContentLoaded', function() {
    if (typeof experimentId !== 'undefined') {
        const experiment = new VirtualExperiment(experimentId, category);
        
        // 绑定按钮事件
        document.getElementById('startBtn').addEventListener('click', () => {
            if (!isRunning) {
                experiment.start();
            }
        });
        
        document.getElementById('resetBtn').addEventListener('click', () => {
            experiment.reset();
        });
        
        document.getElementById('saveBtn').addEventListener('click', () => {
            if (experimentData.length > 0) {
                experiment.saveResults();
            } else {
                Utils.showMessage('请先进行实验！');
            }
        });
    }
});
