docker build -t ignatandrei/wfhaddnew .. -f ./addNew.txt  
docker run -d --name wfhaddnew  ignatandrei/wfhaddnew
# docker cp wfhaddnew:/usr/src/obj/all.md .
# docker cp wfhaddnew:/usr/src/obj/all.js .
# docker cp wfhaddnew:/usr/src/wfhaddnewResourcesApp/src/app/table-wfhaddnew/data.ts .
# docker cp wfhaddnew:/usr/src/obj/wfhaddnewAng/ ./wfhaddnewAng/
docker cp wfhaddnew:/usr/src/obj/ ../
docker container kill wfhaddnew
docker container rm wfhaddnew