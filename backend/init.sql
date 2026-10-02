CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    user_name VARCHAR(100) NOT NULL,
    user_email VARCHAR(255) UNIQUE NOT NULL,
    user_password VARCHAR(255) NOT NULL
);

CREATE TABLE posts (
    post_id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(user_id),
    post_title VARCHAR(255) NOT NULL,
    post_desc TEXT NOT NULL,
    post_img VARCHAR(255),
    post_type VARCHAR(10) NOT NULL CHECK (post_type IN ('lost', 'found')),
    post_status VARCHAR(20) NOT NULL DEFAULT 'open',
    post_date TIMESTAMP DEFAULT NOW()
);

CREATE TABLE comment (
    comment_id SERIAL PRIMARY KEY,
    post_id INTEGER NOT NULL REFERENCES posts(post_id) ON DELETE CASCADE,
    user_id INTEGER NOT NULL REFERENCES users(user_id),
    comment_content TEXT NOT NULL,
    comment_likes INTEGER DEFAULT 0,
    comment_time TIMESTAMP DEFAULT NOW()
);

CREATE TABLE claims (
    claim_id SERIAL PRIMARY KEY,
    post_id INTEGER NOT NULL REFERENCES posts(post_id) ON DELETE CASCADE,
    user_id INTEGER NOT NULL REFERENCES users(user_id),
    claim_status VARCHAR(20) NOT NULL DEFAULT 'pending'
        CHECK (claim_status IN ('pending', 'approved', 'rejected')),
    claim_time TIMESTAMP DEFAULT NOW()
);