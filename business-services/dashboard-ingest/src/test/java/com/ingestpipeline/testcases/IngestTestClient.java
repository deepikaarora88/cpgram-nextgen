package com.ingestpipeline.testcases;
 
import java.util.LinkedHashMap;
import java.util.List;

import org.springframework.web.client.RestTemplate;
import org.slf4j.Logger;
 

public class IngestTestClient {
 
    public static final String REST_SERVICE_URI = "http://localhost:8081/ingest/api";
     
    /* GET */
    @SuppressWarnings("unchecked")
    private static void listAllUsers(){
        RestTemplate restTemplate = new RestTemplate();
        List<LinkedHashMap<String, Object>> usersMap = restTemplate.getForObject(REST_SERVICE_URI+"/user/", List.class);
         
        if(usersMap!=null){
            for(LinkedHashMap<String, Object> map : usersMap){
                Logger("User : id="+map.get("id")+", Name="+map.get("name")+", Age="+map.get("age")+", Salary="+map.get("salary"));;
            }
        }else{
            Logger("No user exist----------");
        }
    }
     
    /* DELETE */
    private static void deleteUser() {
        RestTemplate restTemplate = new RestTemplate();
        restTemplate.delete(REST_SERVICE_URI+"/user/3");
    }
 
 
    /* DELETE */
    private static void deleteAllUsers() {
        RestTemplate restTemplate = new RestTemplate();
        restTemplate.delete(REST_SERVICE_URI+"/user/");
    }
 
    public static void main(String args[]){
        listAllUsers();
        listAllUsers();
        listAllUsers();
        //deleteUser();
        listAllUsers();
        //deleteAllUsers();
        listAllUsers();
    }
}