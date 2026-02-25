// 课程思政评分计算器
// 独立100分制评分系统

class IdeologicalScoreCalculator {
    constructor(config) {
        this.config = config;
    }

    // 计算课程思政总分
    calculateTotalScore(quizResults, videoWatched = true) {
        const scores = {
            videoScore: this.calculateVideoScore(videoWatched),
            correctnessScore: this.calculateCorrectnessScore(quizResults),
            completenessScore: this.calculateCompletenessScore(quizResults),
            understandingScore: this.calculateUnderstandingScore(quizResults)
        };

        const totalScore = scores.videoScore.score +
                          scores.correctnessScore.score +
                          scores.completenessScore.score +
                          scores.understandingScore.score;

        const level = this.config.getEvaluationLevel(totalScore);
        const evaluation = this.config.evaluations[level];

        return {
            totalScore: totalScore,
            breakdown: [
                {
                    item: '视频观看',
                    score: scores.videoScore.score,
                    maxScore: this.config.scoring.videoWatching.maxScore,
                    detail: scores.videoScore.detail
                },
                {
                    item: '答题正确率',
                    score: scores.correctnessScore.score,
                    maxScore: this.config.scoring.correctness.maxScore,
                    detail: scores.correctnessScore.detail
                },
                {
                    item: '答题完整性',
                    score: scores.completenessScore.score,
                    maxScore: this.config.scoring.completeness.maxScore,
                    detail: scores.completenessScore.detail
                },
                {
                    item: '思政理解深度',
                    score: scores.understandingScore.score,
                    maxScore: this.config.scoring.understanding.maxScore,
                    detail: scores.understandingScore.detail
                }
            ],
            evaluation: {
                level: evaluation.level,
                comment: evaluation.comment,
                suggestions: evaluation.suggestions
            },
            quizDetails: quizResults
        };
    }

    // 计算视频观看得分
    calculateVideoScore(videoWatched) {
        const config = this.config.scoring.videoWatching;

        if (videoWatched) {
            return {
                score: config.completed,
                detail: '已完整观看思政视频'
            };
        } else {
            return {
                score: config.notWatched,
                detail: '未观看思政视频'
            };
        }
    }

    // 计算答题正确率得分
    calculateCorrectnessScore(quizResults) {
        if (!quizResults || !quizResults.results) {
            return {
                score: 0,
                detail: '未完成答题'
            };
        }

        const config = this.config.scoring.correctness;
        let score = 0;
        let singleCorrect = 0;
        let multipleCorrect = 0;

        quizResults.results.forEach(result => {
            if (result.isCorrect) {
                if (result.type === '单选题') {
                    score += config.singleChoice.scorePerQuestion;
                    singleCorrect++;
                } else if (result.type === '多选题') {
                    score += config.multipleChoice.scorePerQuestion;
                    multipleCorrect++;
                }
            }
        });

        const detail = `单选题正确${singleCorrect}/${config.singleChoice.totalQuestions}题，多选题正确${multipleCorrect}/${config.multipleChoice.totalQuestions}题`;

        return {
            score: score,
            detail: detail
        };
    }

    // 计算答题完整性得分
    calculateCompletenessScore(quizResults) {
        if (!quizResults || !quizResults.results) {
            return {
                score: 0,
                detail: '未完成答题'
            };
        }

        const config = this.config.scoring.completeness;
        const totalQuestions = quizResults.results.length;
        const answeredQuestions = quizResults.results.filter(r => r.userAnswer !== '未作答').length;

        if (answeredQuestions === totalQuestions) {
            return {
                score: config.allAnswered,
                detail: `已完成全部${totalQuestions}道题目`
            };
        } else if (answeredQuestions > 0) {
            return {
                score: config.partialAnswered,
                detail: `完成${answeredQuestions}/${totalQuestions}道题目`
            };
        } else {
            return {
                score: config.notAnswered,
                detail: '未作答任何题目'
            };
        }
    }

    // 计算思政理解深度得分
    calculateUnderstandingScore(quizResults) {
        if (!quizResults || !quizResults.results) {
            return {
                score: 0,
                detail: '未完成答题，无法评估理解深度'
            };
        }

        const config = this.config.scoring.understanding;
        const correctRate = quizResults.percentage / 100;

        let score, detail;
        if (correctRate === 1.0) {
            score = config.excellent;
            detail = '全部正确，对思政内容理解深刻';
        } else if (correctRate >= 0.75) {
            score = config.good;
            detail = '正确率≥75%，对思政内容理解良好';
        } else if (correctRate >= 0.50) {
            score = config.medium;
            detail = '正确率≥50%，对思政内容有一定理解';
        } else {
            score = config.poor;
            detail = '正确率<50%，对思政内容理解不足';
        }

        return {
            score: score,
            detail: detail
        };
    }
}

// 导出类（用于模块化）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = IdeologicalScoreCalculator;
}
