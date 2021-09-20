# Schoology Technical Assessment

![NPM Build Status](https://github.com/pascalallen/SchoologyAssessment/workflows/NPM/badge.svg)
![Docker Compose Build Status](https://github.com/pascalallen/SchoologyAssessment/workflows/Docker%20Compose/badge.svg)
![Laravel Build Status](https://github.com/pascalallen/SchoologyAssessment/workflows/Laravel/badge.svg)

Technical assessment for Schoology

## Prerequisites

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

## Development Environment Setup

### Clone Repository

$ `cd <projects-parent-directory> && git clone https://github.com/pascalallen/SchoologyAssessment.git`

### Create Environment file and Modify

$ `cp .env.example .env`

### Create and start containers

$ `bin/up`

### Install Composer Dependencies

$ `bin/composer install`

### Set Directory Permissions

$ `chmod -R 777 storage bootstrap/cache`

### Set Application Key

$ `bin/artisan key:generate`

### Clear Application Cache

$ `bin/artisan optimize:clear`

### Run Migrations

$ `bin/artisan migrate`

### Run Seeds

$ `bin/artisan db:seed`

### Seed Database with Test Data

$ `bin/artisan db:seed --class=MockDataSeeder`

### Install NPM Dependencies

$ `bin/npm install`

### Compile NPM Project

$ `bin/npm run dev`

### Watch For Frontend Changes

$ `bin/npm run watch`

### Tail logs

$ `bin/logs`

### Run Unit Tests

$ `bin/phpunit`

### Stop and remove containers

$ `bin/down`

#### Code Style

Code style configuration file for PhpStorm is available for import: [CodeStyle.xml](etc/build/CodeStyle.xml)

[Copying Code Style Settings](https://www.jetbrains.com/help/phpstorm/copying-code-style-settings.html)
