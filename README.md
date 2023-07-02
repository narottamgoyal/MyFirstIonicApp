# My First Ionic App

# Enable Google API for map

```
Directions API
Geocoding API
Maps JavaScript API
```

# packaging (Run CMD in admin mode)

```
ionic build --prod
```

```
npx cap init
```

```
ionic cap add android
```

### Add inside AndroidManifest.xml

```
    <uses-permission android:name="android.permission.SCHEDULE_EXACT_ALARM" />
    <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
    <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
    <uses-feature android:name="android.hardware.location.gps" />
```

### Add under android/app/src/main/res/values/strings.xml

```
    <string name="server_client_id"></string>
```

# keytool command

Generate SHA-1 and put this firbase console under projextSetting> android app

```
keytool -list -v -keystore C:\Users\<PC-Name>\.android\debug.keystore -alias androiddebugkey -storepass android -keypass android
```

or

```
keytool -list -v -alias androiddebugkey -keystore %USERPROFILE%\.android\debug.keystore
```

```
android
```

# Inspect/Debug app

```
chrome://inspect/#devices
```

# Push Notificaion

### Endpoint

```
https://fcm.googleapis.com/v1/projects/<project-Id>/messages:send
```

### Message Body

```
{
    "message": {
        "token": "<Device Registration Token>",
        "notification": {
            "title": "My Title-3",
            "body": "My Body-4"
        },
        "data": {
            "key1": "value1",
            "key2": "value2"
        }
    }
}
```
