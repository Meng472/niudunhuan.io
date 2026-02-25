#!/bin/bash

# 牛顿环虚拟仿真实验平台 - HTTP服务启动脚本
echo "正在启动牛顿环虚拟仿真实验平台..."
echo "服务地址：http://localhost:8000"
echo "按 Ctrl+C 停止服务"
echo "========================="

# 启动HTTP服务器
python3 -m http.server 8000
