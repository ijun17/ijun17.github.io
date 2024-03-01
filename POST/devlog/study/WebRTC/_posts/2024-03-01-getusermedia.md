---
layout: post
title: "[WebRTC]getUserMedia"
order: 30
---

# 카메라 연결하기

getUserMedia를 통해 카메라를 사용할 수 있다. 

```html
<!DOCTYPE html>
<html>
<head>
    <title>Camera Test</title>
</head>
<body>
    <video autoplay playsinline></video>
    <script>
        //선호하는 카메라 해상도를 지정
        const constraints = { video: { width: 1920, height: 1080 } };

        const video = document.querySelector('video');

        navigator.mediaDevices.getUserMedia(constraints)
            .then((mediaStream)=>{video.srcObject = mediaStream;})
            .catch((error)=>{console.log('error: ', error);});
    </script>
</body>
</html>
```


# Virtual Camera 연결 오류

나는 엘지그램을 사용중이였는데 자꾸 Virtual Camera로 연결되는 오류가 있었다. 엘지그램에서 설정으로 들어가면 카메라가 두 개가 있다. 한개는 LGE Camera이고 다른 한개는 Mirametrix Virtual Camera이다. 후자인 가상 카메라에 연결되면 카메라에 X표친 이미지만 보여진다. 따라서 LGE Camera에 연결해야 했다. 물론 가상 카메라를 끄면 LGE Camera로 잘 잡히는데, 디스코드같은 사이트에서는 가상 카메라를 킨 상태여도 LGE Camera를 잘 잡았다. navigator.mediaDevices.enumerateDevices()를 사용하여 인식되는 디바이스를 봤지만 videoinput 장치는 Mirametrix Virtual Camera만 나타났다. 몇번에 삽질 끝에 getUserMedia에서 아래처럼 제약사항에서 선호하는 해상도를 설정하였더니 LGE Camera가 잘 연결되었다. 참고로 선호하는 해상도를 낮추면 가상 카메라로 연결될 수 있다. 그냥 해상도에 엄청 큰값을 넣는게 나을 수도 있을 것 같다.

```js
//가상 카메라에 연결된 설정
const constraintsVirtualCamera={
    video:true
}

//진짜 카메라에 연결된 설정
const constraintsRealCamera = {
    video: { width: 1920, height: 1080 },
};
```


