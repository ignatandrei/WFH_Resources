docker build -t ignatandrei/wfh .. -f ./compile.txt  
docker run -d --name wfh  ignatandrei/wfh
docker cp wfh:/usr/src/obj/all.md .
docker cp wfh:/usr/src/obj/all.js .
docker cp wfh:/usr/src/WFHResourcesApp/src/app/table-wfh/data.ts .
docker cp wfh:/usr/src/obj/WFHAng/ ./WFHAng/
docker container kill wfh
docker container rm wfh