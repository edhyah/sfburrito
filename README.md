# Who has the best Mission burrito?

Just a simple webapp where people can vote for what they think is the best
tacqueria that serves Mission burritos in San Francisco.

## Why?

I've gotten in countless debates with friends and non-friends arguing about
which tacqueria is the best. I got frustrated. So here it is.

That said, I also wanted to create the webapp just to see how fast I can develop
it. I did most of the work in two or three days. This also gives me a template
to build more similar (simple) webapps in the future.

## Tech stack

The implementation is just a classic MERN stack (MongoDB, Express, React, Node)
with TailwindCSS as my front-end framework.

## Deployment

I followed
[this](https://betterprogramming.pub/deploy-mern-stack-app-on-aws-ec2-with-letsencrypt-ssl-8f463c01502a)
post to deploy my MERN stack online. I also did the following:
* In `default.conf`, inside the `server` block, I added:
```
location /api/ {
    proxy_pass http://localhost:5000/api/;
}
```
* I whitelisted the IP address of the server in MongoDB Atlas.

## Contact

Email me at <edward@edwardahn.me>!
