FROM nginx:1.15.3
ADD ./dist/    /usr/share/nginx/html
ADD nginx/nginx.conf /etc/nginx/nginx.conf
ADD nginx/my.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
STOPSIGNAL SIGTERM

CMD ["nginx", "-g", "daemon off;"]
