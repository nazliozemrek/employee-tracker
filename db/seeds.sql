INSERT INTO department (department_name)
VALUES ('Sales'),('Engineering'),('Finance'),('Legal');

 INSERT INTO roles (title,salary,department_id)
  VALUES 
  ('Sales lead',100000,1),
  ('Salesperson',75000,1),
  ('Lead Engineer',120000,2),
  ('Software Engineer',110000,2),
  ('Accountant',80000,3),
  ('Accountant',75000,3),
  ('Legal Team Lead',72000,4),
  ('Lawyer',90000,4),
  ('Software Engineer',100000,2),
  ('Lead Engineer',150000,2);
  INSERT INTO employee (first_name, last_name,role_id,manager_id)
VALUES
  ('Ronald', 'Firbank',1,2),
  ('Virginia', 'Woolf',1,2),
  ('Piers', 'Gaveston',2,1),
  ('Charles', 'LeRoi',2,2),
  ('Katherine', 'Mansfield',3,1),
  ('Dora', 'Carrington',3,1),
  ('Edward', 'Bellamy',4,1),
  ('Montague', 'Summers',4,2),
  ('Octavia', 'Butler',2,1),
  ('Unica', 'Zurn',2,2);