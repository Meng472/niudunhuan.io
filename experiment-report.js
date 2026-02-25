// 实验报告生成模块
// 独立100分制评分报告（只包含实验操作部分）

// 生成实验报告HTML（用于PDF转换）
function generateExperimentReportHTML(studentName, studentId, experimentData) {
    // 验证数据完整性
    if (!experimentData || !experimentData.measurements || experimentData.measurements.length === 0) {
        console.error('实验数据不完整:', experimentData);
        alert('实验数据不完整，请先完成实验并采集数据！');
        return null;
    }

    const calculator = new ScoreCalculator(ReportConfig);
    const scoreResult = calculator.calculateTotalScore(experimentData);

    if (!scoreResult || !scoreResult.evaluation) {
        console.error('评分计算失败:', scoreResult);
        alert('评分计算失败，请检查数据！');
        return null;
    }

    const currentDate = new Date().toLocaleDateString('zh-CN');
    const evaluation = scoreResult.evaluation;

    let html = `
<div class="report-container" style="max-width: 900px; margin: 0 auto; background: white; padding: 40px; font-family: 'Microsoft YaHei', Arial, sans-serif; line-height: 1.8; color: #333;">
    <!-- 报告头部 -->
    <div style="text-align: center; border-bottom: 3px solid #2c3e50; padding-bottom: 20px; margin-bottom: 30px;">
        <h1 style="font-size: 28px; color: #2c3e50; margin-bottom: 10px;">牛顿环曲率测量虚拟仿真实验</h1>
        <div style="font-size: 16px; color: #7f8c8d;">实验报告</div>
    </div>

    <!-- 学生信息 -->
    <div style="display: flex; justify-content: space-between; margin-bottom: 30px; padding: 15px; background: #ecf0f1; border-radius: 5px;">
        <div style="font-size: 14px;"><strong style="color: #2c3e50;">姓名：</strong>${studentName}</div>
        <div style="font-size: 14px;"><strong style="color: #2c3e50;">学号：</strong>${studentId}</div>
        <div style="font-size: 14px;"><strong style="color: #2c3e50;">日期：</strong>${currentDate}</div>
    </div>

    <!-- 实验目的 -->
    <div style="margin-bottom: 30px;">
        <h2 style="font-size: 20px; color: #2c3e50; border-left: 4px solid #3498db; padding-left: 10px; margin-bottom: 15px;">一、实验目的</h2>
        <ol style="line-height: 2;">
            <li>观察牛顿环的干涉现象，理解等厚干涉的原理</li>
            <li>学习利用牛顿环测量透镜曲率半径的方法</li>
            <li>掌握光学干涉测量技术在精密测量中的应用</li>
            <li>培养严谨的科学态度和实验操作能力</li>
        </ol>
    </div>

    <!-- 实验原理 -->
    <div style="margin-bottom: 30px;">
        <h2 style="font-size: 20px; color: #2c3e50; border-left: 4px solid #3498db; padding-left: 10px; margin-bottom: 15px;">二、实验原理</h2>
        <p>当平凸透镜的凸面与平面玻璃板接触时，在它们之间形成一个空气薄膜，厚度从接触点向外逐渐增加。单色光垂直入射时，从空气薄膜上下表面反射的两束光发生干涉，形成明暗相间的同心圆环，称为牛顿环。</p>
        <p style="margin-top: 15px;"><strong>干涉条件：</strong></p>
        <p>对于第m级暗环，光程差满足：</p>
        <p style="text-align: center; font-style: italic; margin: 15px 0;">2d + &lambda;/2 = m&lambda;</p>
        <p>其中d为空气薄膜厚度，&lambda;为光波长。由几何关系可得：</p>
        <p style="text-align: center; font-style: italic; margin: 15px 0;">r<sup>2</sup><sub>m</sub> = m&lambda;R</p>
        <p>其中r<sub>m</sub>为第m级暗环半径，R为透镜曲率半径。通过测量不同级次暗环的半径，绘制r<sup>2</sup><sub>m</sub>-m关系图，由斜率可求得曲率半径R。</p>
    </div>

    <!-- 实验仪器 -->
    <div style="margin-bottom: 30px;">
        <h2 style="font-size: 20px; color: #2c3e50; border-left: 4px solid #3498db; padding-left: 10px; margin-bottom: 15px;">三、实验仪器</h2>
        <ul style="line-height: 2;">
            <li>牛顿环装置（平凸透镜、平面玻璃板）</li>
            <li>钠光灯（波长&lambda; = 589 nm）</li>
            <li>读数显微镜</li>
            <li>虚拟仿真测量系统</li>
        </ul>
    </div>

    <!-- 综合评分 -->
    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 10px; margin-bottom: 30px; text-align: center;">
        <div>实验总分</div>
        <div style="font-size: 48px; font-weight: bold; margin: 10px 0;">${scoreResult.totalScore.toFixed(1)}</div>
        <div style="font-size: 24px; margin-top: 10px;">评价等级：${evaluation.level}</div>
    </div>

    <!-- 实验操作评分详情 -->
    <div style="margin-bottom: 30px;">
        <h2 style="font-size: 20px; color: #2c3e50; border-left: 4px solid #3498db; padding-left: 10px; margin-bottom: 15px;">四、实验操作评分详情</h2>

        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <thead>
                <tr>
                    <th style="padding: 12px; text-align: left; border-bottom: 1px solid #ecf0f1; background: #34495e; color: white;">评分项目</th>
                    <th style="padding: 12px; text-align: left; border-bottom: 1px solid #ecf0f1; background: #34495e; color: white;">得分</th>
                    <th style="padding: 12px; text-align: left; border-bottom: 1px solid #ecf0f1; background: #34495e; color: white;">满分</th>
                    <th style="padding: 12px; text-align: left; border-bottom: 1px solid #ecf0f1; background: #34495e; color: white;">详情</th>
                </tr>
            </thead>
            <tbody>
`;

    scoreResult.experimentScore.breakdown.forEach(item => {
        html += `
                <tr style="background: #f8f9fa;">
                    <td style="padding: 12px; border-bottom: 1px solid #ecf0f1;">${item.item}</td>
                    <td style="padding: 12px; border-bottom: 1px solid #ecf0f1;"><strong>${item.score}</strong></td>
                    <td style="padding: 12px; border-bottom: 1px solid #ecf0f1;">${item.maxScore}</td>
                    <td style="padding: 12px; border-bottom: 1px solid #ecf0f1;">${item.detail}</td>
                </tr>
`;
    });

    html += `
            </tbody>
        </table>

        <h3 style="margin-top: 30px; margin-bottom: 15px; color: #2c3e50;">实验测量数据</h3>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 14px;">
            <thead>
                <tr>
                    <th style="padding: 10px; text-align: center; border: 1px solid #ddd; background: #3498db; color: white;">序号</th>
                    <th style="padding: 10px; text-align: center; border: 1px solid #ddd; background: #3498db; color: white;">环序号 m</th>
                    <th style="padding: 10px; text-align: center; border: 1px solid #ddd; background: #3498db; color: white;">环类型</th>
                    <th style="padding: 10px; text-align: center; border: 1px solid #ddd; background: #3498db; color: white;">直径 D (mm)</th>
                    <th style="padding: 10px; text-align: center; border: 1px solid #ddd; background: #3498db; color: white;">直径平方 D<sup>2</sup> (mm<sup>2</sup>)</th>
                </tr>
            </thead>
            <tbody>
`;

    experimentData.measurements.forEach((m, index) => {
        const bgColor = index % 2 === 0 ? '#f8f9fa' : 'white';
        html += `
                <tr style="background: ${bgColor};">
                    <td style="padding: 10px; text-align: center; border: 1px solid #ddd;">${index + 1}</td>
                    <td style="padding: 10px; text-align: center; border: 1px solid #ddd;">${m.m}</td>
                    <td style="padding: 10px; text-align: center; border: 1px solid #ddd;">${m.type === 'dark' ? '暗环' : '亮环'}</td>
                    <td style="padding: 10px; text-align: center; border: 1px solid #ddd;">${m.diameter.toFixed(3)}</td>
                    <td style="padding: 10px; text-align: center; border: 1px solid #ddd;">${m.diameterSquared.toFixed(3)}</td>
                </tr>
`;
    });

    html += `
            </tbody>
        </table>

        <p style="margin-top: 15px; color: #7f8c8d;">
            <strong>实验参数：</strong>
            曲率半径 R = ${experimentData.parameters.radius} mm，
            波长 &lambda; = ${experimentData.parameters.wavelength} nm，
            线性拟合R<sup>2</sup> = ${experimentData.statistics?.r2?.toFixed(4) || 'N/A'}
        </p>
    </div>

    <!-- 数据分析 -->
    <div style="margin-bottom: 30px;">
        <h2 style="font-size: 20px; color: #2c3e50; border-left: 4px solid #3498db; padding-left: 10px; margin-bottom: 15px;">五、数据分析</h2>
        <p><strong>线性拟合分析：</strong></p>
        <p>根据牛顿环干涉原理，环半径平方r<sup>2</sup>与环序号m应呈线性关系：r<sup>2</sup> = m&lambda;R</p>
        <p>本次实验测量了${experimentData.measurements.length}个数据点，线性拟合相关系数R<sup>2</sup> = ${experimentData.statistics?.r2?.toFixed(4) || 'N/A'}，${experimentData.statistics?.r2 >= 0.98 ? '数据线性关系良好，符合理论预期' : '数据存在一定偏差，需要改进测量方法'}。</p>

        <p style="margin-top: 15px;"><strong>数据质量评估：</strong></p>
        <ul style="line-height: 2;">
            <li>测量点数量：${experimentData.measurements.length}个${experimentData.measurements.length >= 8 ? '（充足）' : '（建议增加）'}</li>
            <li>数据完整性：${experimentData.statistics?.hasDark && experimentData.statistics?.hasBright ? '包含暗环和亮环数据（完整）' : '仅包含单一类型环数据（建议补充）'}</li>
            <li>测量顺序：${experimentData.statistics?.isOrdered ? '按环序号递增测量（规范）' : '测量顺序不规范（需改进）'}</li>
        </ul>
    </div>

    <!-- 误差分析 -->
    <div style="margin-bottom: 30px;">
        <h2 style="font-size: 20px; color: #2c3e50; border-left: 4px solid #3498db; padding-left: 10px; margin-bottom: 15px;">六、误差分析</h2>

        <p><strong>误差来源：</strong></p>
        <ol style="line-height: 2;">
            <li><strong>测量误差：</strong>使用读数显微镜测量环直径时的读数误差，特别是对于较小的内环，边缘不够清晰。</li>
            <li><strong>光源波长不确定性：</strong>实验使用的钠光灯虽然接近单色光，但仍有一定的波长分布范围（589.0 nm和589.6 nm双线）。</li>
            <li><strong>温度影响：</strong>环境温度变化会导致玻璃材料热胀冷缩，影响曲率半径的测量精度。</li>
            <li><strong>接触点偏移：</strong>凸透镜与平面玻璃的接触点可能不在光轴上，导致环形不规则或偏心。</li>
            <li><strong>观察误差：</strong>观察环边缘位置时的主观判断差异，不同观察者可能有不同的判断标准。</li>
        </ol>

        <p style="margin-top: 15px;"><strong>改进方法：</strong></p>
        <ol style="line-height: 2;">
            <li>使用数字图像处理技术精确测量环的直径，避免人为读数误差，提高测量精度。</li>
            <li>使用波长更稳定的激光光源（如He-Ne激光，&lambda; = 632.8 nm），提高波长确定性。</li>
            <li>控制实验环境温度，使用恒温装置，减少热胀冷缩的影响。</li>
            <li>使用更精密的光学平台和调节装置，确保光轴与接触点对准，减小系统误差。</li>
            <li>多次重复测量，取平均值减小随机误差，并进行不确定度分析。</li>
        </ol>
    </div>

    <!-- 思考与讨论 -->
    <div style="margin-bottom: 30px;">
        <h2 style="font-size: 20px; color: #2c3e50; border-left: 4px solid #3498db; padding-left: 10px; margin-bottom: 15px;">七、思考与讨论</h2>

        <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; margin-bottom: 15px;">
            <p><strong>1. 为什么牛顿环中心是暗的而不是亮的？</strong></p>
            <p style="margin-top: 10px; color: #555;">在透镜与平板接触处，光线从两个界面反射。当光从低折射率介质（空气）入射到高折射率介质（玻璃）时，反射光产生π相位变化；而从高折射率到低折射率反射时不产生相位变化。因此两束反射光之间存在π相位差，导致相消干涉，形成暗斑。</p>
        </div>

        <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; margin-bottom: 15px;">
            <p><strong>2. 如果使用白光代替单色光，牛顿环会呈现什么样的图案？</strong></p>
            <p style="margin-top: 10px; color: #555;">白光由不同波长的可见光组成。根据公式r<sup>2</sup> = m&lambda;R，不同波长的光会在不同位置形成明暗环。当m较小时，不同波长的环几乎重叠；随着m增大，不同波长的环逐渐分离，形成彩色光环。中心仍为暗斑，因为零级干涉条件与波长无关。</p>
        </div>

        <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; margin-bottom: 15px;">
            <p><strong>3. 牛顿环实验在实际应用中有哪些重要价值？</strong></p>
            <p style="margin-top: 10px; color: #555;">牛顿环实验是精密光学测量的重要方法：(1) 测量透镜曲率半径，用于光学元件质量检测；(2) 检测光学表面平整度，发现表面缺陷；(3) 测量薄膜厚度；(4) 在LAMOST等大型望远镜中，用于超大口径镜面的精密检测和校准，确保纳米级精度。这体现了基础实验在大国重器研发中的重要作用。</p>
        </div>
    </div>

    <!-- 综合评价 -->
    <div style="margin-bottom: 30px;">
        <h2 style="font-size: 20px; color: #2c3e50; border-left: 4px solid #3498db; padding-left: 10px; margin-bottom: 15px;">八、综合评价</h2>

        <div style="background: #fff3cd; padding: 20px; border-radius: 5px; border-left: 4px solid #ffc107; margin-bottom: 20px; white-space: pre-line;">
            <strong>【实验评价】${evaluation.level}</strong>

${evaluation.comment}
        </div>

        <div style="background: #d1ecf1; padding: 20px; border-radius: 5px; border-left: 4px solid #17a2b8; white-space: pre-line;">
            <strong>【改进建议】</strong>

${evaluation.suggestions}
        </div>
    </div>

    <!-- 页脚 -->
    <div style="text-align: center; margin-top: 40px; padding-top: 20px; border-top: 2px solid #ecf0f1; color: #7f8c8d; font-size: 14px;">
        <p>牛顿环曲率测量虚拟仿真实验平台</p>
        <p>报告生成时间：${new Date().toLocaleString('zh-CN')}</p>
    </div>
</div>
`;

    return html;
}

// 下载实验报告（PDF格式）
function downloadExperimentReport() {
    console.log('开始生成实验报告...');

    // 1. 获取用户信息
    const studentName = document.getElementById('student-name')?.value || '未填写';
    const studentId = document.getElementById('student-id')?.value || '未填写';

    // 2. 从 sessionStorage 读取实验数据
    let experimentData = null;
    try {
        const experimentDataJSON = sessionStorage.getItem('experimentData');
        console.log('读取到的实验数据JSON:', experimentDataJSON);

        if (experimentDataJSON) {
            experimentData = JSON.parse(experimentDataJSON);
            console.log('解析后的实验数据:', experimentData);
        }
    } catch (error) {
        console.error('读取实验数据失败:', error);
        alert('读取实验数据失败: ' + error.message);
        return;
    }

    // 3. 检查数据完整性
    if (!experimentData) {
        alert('未找到实验数据，请先完成实验！');
        return;
    }

    if (!experimentData.measurements || experimentData.measurements.length === 0) {
        alert('实验数据不完整，请确保已采集测量数据！');
        return;
    }

    // 4. 生成报告HTML
    const reportHTML = generateExperimentReportHTML(studentName, studentId, experimentData);

    if (!reportHTML) {
        console.error('报告HTML生成失败');
        return;
    }

    console.log('报告HTML生成成功，长度:', reportHTML.length);

    // 5. 创建临时容器
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = reportHTML;
    tempDiv.style.position = 'absolute';
    tempDiv.style.left = '-9999px';
    document.body.appendChild(tempDiv);

    // 6. 获取报告容器
    const reportContainer = tempDiv.querySelector('.report-container');

    if (!reportContainer) {
        console.error('未找到报告容器');
        document.body.removeChild(tempDiv);
        return;
    }

    // 7. 配置PDF选项
    const currentDate = new Date().toLocaleDateString('zh-CN').replace(/\//g, '-');
    const filename = `实验报告_${studentName}_${studentId}_${currentDate}.pdf`;

    const opt = {
        margin: [10, 10, 10, 10],
        filename: filename,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: {
            scale: 2,
            useCORS: true,
            letterRendering: true,
            logging: false,
            scrollY: 0,
            scrollX: 0
        },
        jsPDF: {
            unit: 'mm',
            format: 'a4',
            orientation: 'portrait',
            compress: true
        },
        pagebreak: {
            mode: ['avoid-all', 'css', 'legacy'],
            before: '.page-break-before',
            after: '.page-break-after',
            avoid: ['h2', 'h3', 'table']
        }
    };

    // 8. 显示加载提示
    const loadingMsg = document.createElement('div');
    loadingMsg.style.cssText = 'position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background: rgba(0,0,0,0.8); color: white; padding: 20px 40px; border-radius: 8px; z-index: 10000; font-size: 16px;';
    loadingMsg.textContent = '正在生成实验报告PDF，请稍候...';
    document.body.appendChild(loadingMsg);

    // 9. 生成PDF
    html2pdf().set(opt).from(reportContainer).save().then(() => {
        console.log('实验报告PDF已下载');
        document.body.removeChild(tempDiv);
        document.body.removeChild(loadingMsg);
    }).catch(error => {
        console.error('生成PDF失败:', error);
        alert('生成PDF失败，请重试');
        document.body.removeChild(tempDiv);
        document.body.removeChild(loadingMsg);
    });
}

// 预览实验报告
function previewExperimentReport() {
    // 1. 获取用户信息
    const studentName = document.getElementById('student-name')?.value || '未填写';
    const studentId = document.getElementById('student-id')?.value || '未填写';

    // 2. 从 sessionStorage 读取实验数据
    let experimentData = null;
    try {
        const experimentDataJSON = sessionStorage.getItem('experimentData');
        if (experimentDataJSON) {
            experimentData = JSON.parse(experimentDataJSON);
        }
    } catch (error) {
        console.error('读取实验数据失败:', error);
    }

    // 3. 检查数据完整性
    if (!experimentData) {
        alert('未找到实验数据，请先完成实验！');
        return;
    }

    // 4. 生成报告HTML
    const reportHTML = generateExperimentReportHTML(studentName, studentId, experimentData);

    // 5. 在新窗口中打开报告
    const previewWindow = window.open('', '_blank');
    previewWindow.document.write(`
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>实验报告预览</title>
    <style>
        body {
            margin: 0;
            padding: 20px;
            background: #f5f5f5;
        }
    </style>
</head>
<body>
    ${reportHTML}
</body>
</html>
    `);
    previewWindow.document.close();
}
