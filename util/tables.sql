CREATE TABLE IF NOT EXISTS articles (
  id BIGINT(20) PRIMARY KEY AUTO_INCREMENT NOT NULL,
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  minimum_level ENUM('any', 'basic', 'trusted', 'moderator', 'administrator') NOT NULL,
  FULLTEXT(title,body)
);

CREATE TABLE IF NOT EXISTS actions (
  id BIGINT(20) PRIMARY KEY AUTO_INCREMENT NOT NULL,
  ip varchar(45) NOT NULL,
  time_occured TIMESTAMP DEFAULT NOW() NOT NULL,
  type ENUM('add', 'edit', 'view', 'delete', 'update'),
  target TEXT NOT NULL,
  user BIGINT(20)
);

CREATE TABLE IF NOT EXISTS users (
  id BIGINT(20) PRIMARY KEY AUTO_INCREMENT NOT NULL,
  username varchar(60) NOT NULL,
  password varchar(512) NOT NULL,
  email varchar(100) NOT NULL,
  level ENUM('vandal', 'basic', 'trusted', 'moderator', 'administrator') NOT NULL
);

CREATE TABLE IF NOT EXISTS errors (
  id BIGINT(20) PRIMARY KEY AUTO_INCREMENT NOT NULL,
  time_occured TIMESTAMP DEFAULT NOW() NOT NULL,
  source TEXT NOT NULL,
  userdata TEXT NOT NULL,
  error TEXT NOT NULL,
  user BIGINT(20)
);
