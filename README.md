# Запуск
Если Expo client не подключается к серверу, возможно, 
что неверно прописан ip адрес компьютера в локальной сети, 
поэтому перед запуском необходимо прописать следующее:
```
set REACT_NATIVE_PACKAGER_HOSTNAME=192.168.0.102
expo login
expo start
```