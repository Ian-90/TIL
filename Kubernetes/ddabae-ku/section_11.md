## 1. [Secret](https://kubernetes.io/ko/docs/concepts/configuration/secret/) 만들기
### 1.1 Secret vs ConfigMap
* ConfigMap - 컨테이너 구성 정보를 한곳에 모아서 관리
  |PASSWORD|ttabae|
  |--------|------|
  |SCORE|90|

* Secret - 컨테이너가 사용하는 password, auth token, ssh key와 같은 중요한 정보를 저장하고 민감한 구성정보를 base64로 인코딩해서 한 곳에 모아서 관리
  |PASSWORD|dHRhYmFICg==|
  |--------|------|
  |SCORE|OTAK|
* 민감하지 않은 일반 설정파일은 configMap을 사용하고 민감한 데이터는 secret을 사용
* Secret 데이터 전달 방법
  * Commandline Argument
  * Environment Variable
  * Volume Mount

### 1.2 만들기
* 만들기
  ```
  kubectl create secret [Available Commands] name [flags] [options]
  ```
  * Available Commands
    * docker-registry
    ```
    kubectl create secret docker-registry reg-secret --docker-username=hello --docker-password=pass --docker-email=hello@hello.com
    ```
    * generic
    ```
    kubectl create secret generic ttabae-secret --from-literal=INTERVAL=2 --from-file=./genid-web-config/
    ```
    * tls
    ```
    kubectl create secret tls my-secret --cert=path/to/cert/file --key=path/to/key/file
    ```
* 확인
```
kubectl get secrets
```

## 2. Secret 사용하기
* 정의된 Secret을 Pod의 Container에 전달하는 방법
  * environment variable로 전달
    ```yml
    apiVersion: v1
    kind: Pod
    metadata:
      name: genid-env-secret
    spec:
      containers:
      - image: smlunx/genid:env
        env:
        - name: INTERVAL
          valueFrom:
            secretKeyRef:
              name: ttabae-secret
              key: INTERVAL
        name: fakeid-generator
        volumeMounts:
        - name: html
          mountPaht: /webdata
    ```
  * Commandline Argument로 전달
  * Volume에 secret을 사용하여 컨테이너 디렉토리에 Mount

## 3. Secret 용량 제한하기
* Secret etcd에 암호화 하지 않은 텍스트로 저장되므로 secret value가 커지면 메모리 용량을 많이 사용하게 됨
* secret의 최대 크기는 1MB
