CREATE TABLE users 
(userid VARCHAR,
 username VARCHAR(150),
 password TEXT,
 email VARCHAR(255),
 phone TEXT,
 role  TEXT
 );
 
CREATE TABLE votings 
(voterid VARCHAR,
 userid VARCHAR,
 count INT,
 voting_created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
 );

CREATE TABLE candidates 
(candidateid VARCHAR,
 candidatename VARCHAR,
 candidate_created_at date DEFAULT CURRENT_DATE
 );

SELECT * FROM votings;
SELECT * FROM candidates;
SELECT * FROM users; 

ALTER TABLE users 
ALTER COLUMN username TYPE UNIQUE;

SELECT * FROM users WHERE username = 'Deepa';

DELETE FROM users WHERE username = 'Deepa';

