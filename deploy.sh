#!/bin/bash

if [ $# -lt 1 ]; then
    echo '请指明要部署到测试还是开发服务器上,测试：feature，开发：dev,测试2:test2'
    echo "usage: $0  <feature|dev|test2>"
    exit 1
fi


# 配置属性
apppath='/export/docker_apps/'
modelname='fe-app-integral'
port=18012
logdriver=' --log-driver=fluentd --log-opt fluentd-address=10.211.4.115:24224 --log-opt tag="nginx_access_108_'${modelname}'" --log-opt  fluentd-async-connect '


# 判断要部署到哪台服务器上
if [ $1 == 'feature' ]; then
    serverip='10.211.4.108'
elif [ $1 == 'dev' ]; then
    serverip='10.211.4.110'
else
    echo '参数不正确'
    exit 1
fi

nowdate=`date +%Y%m%d`

source /home/thor/.bashrc
# rm -rf node_modules
# rm -rf node_modules/.cache/hard-source  # Error with [hardsource:5bbbea2b] Could not freeze ./src/...
nvm use v8.11.2
npm install
npm run lan
nvm use v6.12.2

echo "Packageing ...$1 ..."

echo "压缩..."
zip -r ./${modelname}${nowdate}.zip ./ -x "./node_modules/*"

echo "上传到服务器 ..."
scp  -rp -P 22 ${modelname}${nowdate}.zip thor@${serverip}:/export/deploy/
\rm -rf ./${modelname}${nowdate}.zip
echo "[已上传]"

echo "删除原应用文件 ..."
ssh -p 22 thor@${serverip} "rm -rf ${apppath}${modelname}/*"
echo "[已删除]"

echo "解压并部署文件 ..."
ssh -p 22 thor@${serverip} "unzip -o /export/deploy/${modelname}${nowdate}.zip -d ${apppath}${modelname}/"
ssh -p 22 thor@${serverip} "docker stop ${modelname}"
ssh -p 22 thor@${serverip} "docker rmi \$(docker image ls  ${modelname} -q)"
ssh -p 22 thor@${serverip} "cd ${apppath}${modelname}  && docker build -t ${modelname}:latest ."
ssh -p 22 thor@${serverip} "docker run --rm --name ${modelname} -p ${port}:80 -d  -v /etc/localtime:/etc/localtime:ro ${logdriver}  ${modelname}:latest"
#ssh -p 22 thor@${serverip} "docker logs ${modelname}"
echo "[完成]"

echo "[部署完成]"
exit 0
