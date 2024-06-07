---
layout: post
title: "[Connect]하이브리드 앱과 브리지"
order: 2
---

connect 앱은 `하이브리드 앱`으로 개발하였다. 하이브리드 앱은 앱의 ui로 웹 뷰를 사용하는 것이다. 브라우저와 다르게 주소창이 없기에 겉으로 보기에는 네이티브와 동일하다. 웹 뷰 위에 올려진 웹은 `브리지`라는 것으로 네이티브 코드와 소통한다. 이를 통해 자바스크립트로 네이티브의 기능을 사용할 수 있다. 하지만 브리지의 입출력은 숫자, 문자열 같은 단순한 데이터이기에 대용량 데이터를 다룬다면 네이티브보다 성능이 떨어질 것으로 보인다. 반면에 같은 코드 베이스로 IOS, Android, Window 등의 앱을 개발할 수 있기 때문에 네이티브보다 비용이 적게 들고, 유지보수하기 쉽다는 장점이 있다. 또한 웹을 변경하면 구글 플레이스토어나 앱스토어의 업데이트없이 앱을 변경할 수 있다.



# 안드로이드 브리지

안드로이드에서는 addJavascriptInterface 메소드를 통해 브리지를 만들 수 있다. 브리지의 이름을 Android라고 정했다. 이제 자바스크립트에서 "Android.함수"로 네이티브 코드를 실행할 수 있다. 

```java
webView.addJavascriptInterface(new WebAppInterface(this), "Android");
```

여기서 WebAppInterface는 아래와 같이 구현되었다. 브리지 안에는 총 5개의 메소드가 있다. 메소드 앞에 @JavascriptInterface 어노테이션을 붙여야 한다.

* getStartFolderPath: 시작 폴더 경로를 반환
* getFolder: 해당 경로 폴더 안에 파일들을 반환
* getFile: 파일 내용을 base64로 인코딩해서 반환
* saveFile: base64로 인코딩된 파일내용을 저장
* saveFolder: 폴더를 저장

```java
private static class WebAppInterface {
    Context mContext;
    WebAppInterface(Context c) {
        mContext = c;
    }
    @JavascriptInterface
    public String getStartFolderPath() { //시작 폴더 경로를 반환
        return Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_DOWNLOADS).toString();
    }
    @JavascriptInterface
    public String getFolder(String path) { //해당 경로 폴더 내에 파일 반환
        File dir = new File(path);
        File[] files = dir.listFiles();

        if(files == null) {
            Toast.makeText(mContext, "error getFolder", Toast.LENGTH_SHORT).show();
            return null;
        }
        ArrayList<String> jsonArr = new ArrayList<>();
        for(File file : files){
            jsonArr.add("{\"name\":\""+file.getName()+"\",\"type\":\""+((file.isFile())?"file":"folder")+"\"}");
        }
        Toast.makeText(mContext, "get folder: "+path, Toast.LENGTH_SHORT).show();
        return "["+String.join(",",jsonArr)+"]";
    }
    @JavascriptInterface
    public String getFile(String path) { //파일의 내용을 base64로 인코딩해서 반환
        try {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                byte[] fileContent = Files.readAllBytes(Paths.get(path));
                String content = Base64.getEncoder().encodeToString(fileContent);
                Toast.makeText(mContext, "get file: "+path, Toast.LENGTH_SHORT).show();
                return content;
            }else{
                return "null";
            }
        } catch (IOException e) {
            return "null";
        }
    }
    @JavascriptInterface
    public boolean saveFile(String path, String content) { //파일 내용 저장
        File file = new File(path);
        try {
            // 파일에 내용 쓰기 (덮어쓰기 모드)
            FileOutputStream outputStream = new FileOutputStream(file, false);
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                outputStream.write(Base64.getDecoder().decode(content));
            }else{
                return false;
            }
            outputStream.close();
        } catch (IOException e) {
            return false;
        }
        Toast.makeText(mContext, "파일 저장: "+path, Toast.LENGTH_SHORT).show();
        return true;
    }
    @JavascriptInterface
    public boolean saveFolder(String path){ //폴더 저장
        File filePath = new File(path);
        if (!filePath.mkdirs()) {
            Toast.makeText(mContext, "폴더 저장 실패: "+path, Toast.LENGTH_SHORT).show();
            return false;
        }
        Toast.makeText(mContext, "폴더 저장: "+path, Toast.LENGTH_SHORT).show();
        return true;
    }
}
```

# 파일 접근 권한 설정

물론 네이티브의 기능을 파일 접근 기능을 사용하려면 사용자에게 권한 요청을 해야한다.

```java
//현재 권한을 확인하고 권한이 없으면 권한 요청을 한다.
if (ContextCompat.checkSelfPermission(this, Manifest.permission.READ_EXTERNAL_STORAGE) != PackageManager.PERMISSION_GRANTED ||
        ContextCompat.checkSelfPermission(this, Manifest.permission.WRITE_EXTERNAL_STORAGE) != PackageManager.PERMISSION_GRANTED) {
    ActivityCompat.requestPermissions(this, new String[]{Manifest.permission.READ_EXTERNAL_STORAGE, Manifest.permission.WRITE_EXTERNAL_STORAGE}, REQUEST_EXTERNAL_STORAGE);
}
```

또한 AndroidManifest.xml파일에 다음에 권한을 명시해야 한다.

```xml
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" android:maxSdkVersion="32" />
<uses-permission android:name="android.permission.READ_MEDIA_IMAGES" />
<uses-permission android:name="android.permission.READ_MEDIA_VIDEO" />
<uses-permission android:name="android.permission.READ_MEDIA_AUDIO" />
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"  android:maxSdkVersion="32" tools:ignore="ScopedStorage" />
<uses-permission android:name="android.permission.WRITE_MEDIA_IMAGES" />
<uses-permission android:name="android.permission.WRITE_MEDIA_VIDEO" />
<uses-permission android:name="android.permission.WRITE_MEDIA_AUDIO" />
```

추가적으로 아래 requestLegacyExternalStorage도 application 태그에 추가시켜야 한다.


```xml
<application
    ...
    android:requestLegacyExternalStorage="true"
    ...>
    ...
</application>
```


# 웹과 다른 점

하이브리드 앱의 웹뷰는 브라우저와 거의 동일하게 작동했지만 몇가지 다른 점이 있었다.

* 자바스크립트의 alert를 무시한다.
* a태그로 인한 다운로드를 무시한다.
