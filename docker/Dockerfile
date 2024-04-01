FROM php:8.2-apache

RUN docker-php-ext-install sockets
RUN a2enmod rewrite include proxy proxy_wstunnel
RUN mv "$PHP_INI_DIR/php.ini-production" "$PHP_INI_DIR/php.ini"

COPY . /graphite
