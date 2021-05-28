

create table organisations(                                                  
    org_id serial primary key,                                                          
    org_name varchar(250),                                                          
    org_address varchar(250),                                                             
    org_contacts varchar(250),                                                          
    org_district integer,
    org_type integer,
    FOREIGN KEY (org_id) REFERENCES users (id));

