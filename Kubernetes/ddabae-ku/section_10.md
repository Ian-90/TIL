## 1. ConfigMap 생성
### 1.1 ConfigMap이란?
* 컨테이너 구성 정보를 한곳에 모아서 관리. key-value의 형태를 가짐
* 생성 방법
  ```
  kubectl create configmap NAME [--from-file=source] [--from-literal=key1=value1]
  ```

* 기본 명령어 실습
  ```
  kubectl create configmap CONFIG_NAME --from-literal=id=b2021002 --from-literal=class=bigdata
  kubectl create configmap CONFIG_NAME --from-file=text.file
  kubectl create configmap CONFIG_NAME --from-file=mydata=text.file
  kubectl create configmap CONFIG_NAME --from-file=/configmap.dir/
  ```

### 1.2 ConfigMap 실습
* 명령어
  ```
  kubectl create configmap ttabae-config --from-literal=INTERVAL=2 --from-literal=OPTION=boy --from-file=config.dir/
  ```

* 생성된 configMap: ttabae-config
  | Key | Value |
  |-----|-------|
  |INTERVAL|2|
  |OPTION|boy|
  |nginx-config.conf| server { ... }|

* configmap 확인하기
  ```
  kubectl get describe configmaps [configmap name]
  ```

## 2. ConfigMap의 일부분을 적용하기
* 생성한 ConfigMap의 key를 pod의 컨테이너에 적용
* genid.yaml
  ```yml
  apiVersion: v1
  kind: Pod
  metadata:
    name: genid-stone
  spec:
    containers:
    - image: smlinux/genid:env
      env:
      - name: INTERVAL
        valueFrom:
          configMapKeyRef:
            name: ttabae-config
            key: INTERVAL
      name: fakeid
      volumMounts:
      - name: html
        mountPath: /webdata
  ```

## 3. ConfigMap 전체를 적용하기
* genid.yaml
  ```yml
  apiVersion: v1
  kind: Pod
  metadata:
    name: genid-stone
  spec:
    containers:
    - image: smlinux/genid:env
      envFrom: ## ConfigMap 전체 전달
      - configMapKeyRef:
          name: ttabae-config
      name: fakeid
      volumMounts:
      - name: html
        mountPath: /webdata
  ```

* 실행
```
kubectl create -f genid.yaml
kubectl get pods -o wide
kubectl exec genid -- env
```

## 4. ConfigMap을 볼륨으로 적용하기
* config-volume.yaml
  ```yml
  apiVersion: v1
  kind: Pod
  metadata:
    name: web-server
  spec:
    containers:
    - image: nginx:1.14
      name: web-server
      ports:
      - containerPort: 80
      volumMounts:
      - name: html
        mountPath: /usr/share/nginx/html
        readOnly: true
      - name: config
        mountPath: /etc/nginx/conf.d
        readOnly: true
      volumes:
      - name: config
        configMap:
          name: ttabae-config
          items:
          - key: nginx-config.conf
            path: nginx-config.conf
  ```