---
layout: post
title: "마인크래프트 배드락 서버"
order: 30
---

```shell
#서버 이미지 실행
sudo docker run -d \
 --name mc \ 
 -p 19134:19134/udp \
 -v $HOME/mineserver:/data \
 -e SERVER_PORT=19134 \
 -e EULA=TRUE \
 -e ALLOW_CHEATS=true \
 -e SERVER_NAME="마크서버" \
 -e GAMEMODE=survival\
 -e DIFFICULTY=normal\
 -e DEFAULT_PLAYER_PERMISSION_LEVEL=operator \
 itzg/minecraft-bedrock-server

# 좌표 
sudo docker exec mc send-command gamerule showCoordinates true
```

