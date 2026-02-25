// 课程思政报告生成模块
// 独立100分制评分报告

// 生成课程思政报告HTML（用于PDF转换）
function generateIdeologicalReportHTML(studentName, studentId, quizResults, videoWatched = true) {
    // 验证数据完整性
    if (!quizResults || !quizResults.results || quizResults.results.length === 0) {
        console.error('答题数据不完整:', quizResults);
        alert('答题数据不完整，请先完成课程思政答题！');
        return null;
    }

    const calculator = new IdeologicalScoreCalculator(IdeologicalReportConfig);
    const scoreResult = calculator.calculateTotalScore(quizResults, videoWatched);

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
        <div style="font-size: 16px; color: #7f8c8d;">课程思政评分报告</div>
    </div>

    <!-- 学生信息 -->
    <div style="display: flex; justify-content: space-between; margin-bottom: 30px; padding: 15px; background: #ecf0f1; border-radius: 5px;">
        <div style="font-size: 14px;"><strong style="color: #2c3e50;">姓名：</strong>${studentName}</div>
        <div style="font-size: 14px;"><strong style="color: #2c3e50;">学号：</strong>${studentId}</div>
        <div style="font-size: 14px;"><strong style="color: #2c3e50;">日期：</strong>${currentDate}</div>
    </div>

    <!-- 开头语 -->
    <div style="background: #e8f4f8; padding: 20px; border-radius: 5px; border-left: 4px solid #3498db; margin-bottom: 30px; white-space: pre-line;">
${IdeologicalReportConfig.introduction}
    </div>

    <!-- 综合评分 -->
    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 10px; margin-bottom: 30px; text-align: center;">
        <div>课程思政总分</div>
        <div style="font-size: 48px; font-weight: bold; margin: 10px 0;">${scoreResult.totalScore.toFixed(1)}</div>
        <div style="font-size: 24px; margin-top: 10px;">评价等级：${evaluation.level}</div>
    </div>

    <!-- 评分详情 -->
    <div style="margin-bottom: 30px;">
        <h2 style="font-size: 20px; color: #2c3e50; border-left: 4px solid #3498db; padding-left: 10px; margin-bottom: 15px;">一、评分详情</h2>

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

    scoreResult.breakdown.forEach(item => {
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
    </div>
`;

    // 答题详情
    if (quizResults && quizResults.results) {
        html += `
    <!-- 答题详情 -->
    <div style="margin-bottom: 30px;">
        <h2 style="font-size: 20px; color: #2c3e50; border-left: 4px solid #3498db; padding-left: 10px; margin-bottom: 15px;">二、答题详情</h2>
        <p style="margin-bottom: 20px; color: #7f8c8d;">
            <strong>答题统计：</strong>
            得分 ${quizResults.score}/${quizResults.total}，
            正确率 ${quizResults.percentage}%
        </p>
`;

        quizResults.results.forEach(result => {
            const statusIcon = result.isCorrect ? '✓' : '✗';
            const statusColor = result.isCorrect ? '#27ae60' : '#e74c3c';
            html += `
        <div style="margin-bottom: 20px; padding: 15px; background: #f8f9fa; border-radius: 5px; border-left: 4px solid ${statusColor};">
            <p style="margin-bottom: 10px;">
                <strong style="color: ${statusColor};">${statusIcon} 第${result.number}题（${result.type}）</strong>
            </p>
            <p style="margin-bottom: 8px;"><strong>题目：</strong>${result.question}</p>
            <p style="margin-bottom: 8px;"><strong>你的答案：</strong>${result.userAnswer}</p>
            <p style="margin-bottom: 8px;"><strong>正确答案：</strong>${result.correctAnswer}</p>
            <p style="color: #7f8c8d;"><strong>解析：</strong>${result.explanation}</p>
        </div>
`;
        });

        html += `
    </div>
`;
    }

    // 综合评价
    html += `
    <!-- 综合评价 -->
    <div style="margin-bottom: 30px;">
        <h2 style="font-size: 20px; color: #2c3e50; border-left: 4px solid #3498db; padding-left: 10px; margin-bottom: 15px;">三、综合评价</h2>

        <div style="background: #fff3cd; padding: 20px; border-radius: 5px; border-left: 4px solid #ffc107; margin-bottom: 20px; white-space: pre-line;">
            <strong>【思政评价】${evaluation.level}</strong>

${evaluation.comment}
        </div>

        <div style="background: #d1ecf1; padding: 20px; border-radius: 5px; border-left: 4px solid #17a2b8; white-space: pre-line;">
            <strong>【学习建议】</strong>

${evaluation.suggestions}
        </div>
    </div>

    <!-- 页脚 -->
    <div style="text-align: center; margin-top: 40px; padding-top: 20px; border-top: 2px solid #ecf0f1; color: #7f8c8d; font-size: 14px;">
        <p>牛顿环曲率测量虚拟仿真实验平台 - 课程思政模块</p>
        <p>报告生成时间：${new Date().toLocaleString('zh-CN')}</p>
    </div>
</div>
`;

    return html;
}

// 下载课程思政报告（PDF格式）
function downloadIdeologicalReport() {
    console.log('开始生成课程思政报告...');

    // 1. 获取用户信息
    const studentName = document.getElementById('student-name')?.value || '未填写';
    const studentId = document.getElementById('student-id')?.value || '未填写';

    // 2. 从 sessionStorage 读取答题结果
    let quizResults = null;
    try {
        const quizResultsJSON = sessionStorage.getItem('quizResults');
        console.log('读取到的答题结果JSON:', quizResultsJSON);

        if (quizResultsJSON) {
            quizResults = JSON.parse(quizResultsJSON);
            console.log('解析后的答题结果:', quizResults);
        }
    } catch (error) {
        console.error('读取答题结果失败:', error);
        alert('读取答题结果失败: ' + error.message);
        return;
    }

    // 3. 检查数据完整性
    if (!quizResults) {
        alert('未找到答题结果，请先完成课程思政答题！');
        return;
    }

    if (!quizResults.results || quizResults.results.length === 0) {
        alert('答题数据不完整，请确保已完成所有题目！');
        return;
    }

    // 4. 生成报告HTML
    const reportHTML = generateIdeologicalReportHTML(studentName, studentId, quizResults, true);

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
    const filename = `课程思政报告_${studentName}_${studentId}_${currentDate}.pdf`;

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
    loadingMsg.textContent = '正在生成课程思政PDF报告，请稍候...';
    document.body.appendChild(loadingMsg);

    // 9. 生成PDF
    html2pdf().set(opt).from(reportContainer).save().then(() => {
        console.log('课程思政PDF报告已下载');
        document.body.removeChild(tempDiv);
        document.body.removeChild(loadingMsg);
    }).catch(error => {
        console.error('生成PDF失败:', error);
        alert('生成PDF失败，请重试');
        document.body.removeChild(tempDiv);
        document.body.removeChild(loadingMsg);
    });
}

// 预览课程思政报告
function previewIdeologicalReport() {
    // 1. 获取用户信息
    const studentName = document.getElementById('student-name')?.value || '未填写';
    const studentId = document.getElementById('student-id')?.value || '未填写';

    // 2. 从 sessionStorage 读取答题结果
    let quizResults = null;
    try {
        const quizResultsJSON = sessionStorage.getItem('quizResults');
        if (quizResultsJSON) {
            quizResults = JSON.parse(quizResultsJSON);
        }
    } catch (error) {
        console.error('读取答题结果失败:', error);
    }

    // 3. 检查数据完整性
    if (!quizResults) {
        alert('未找到答题结果，请先完成课程思政答题！');
        return;
    }

    // 4. 生成报告HTML
    const reportHTML = generateIdeologicalReportHTML(studentName, studentId, quizResults, true);

    // 5. 在新窗口中打开报告
    const previewWindow = window.open('', '_blank');
    previewWindow.document.write(`
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>课程思政报告预览</title>
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
