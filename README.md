# CrudPythonKrystian
- clone git
- buat venv
- pip install django djangorestframework django-cors-headers
- django-admin startproject backendapi
- cd backendapi/
- django-admin strartapp api

- python manage.py migrate
- python manage.py createsuperuser
- kosongkan username, email, isi password aris1985

Masuk ke folder backendapi>settings.py,
pada INSTALLED_APPS tambahkan:
'rest_framework',
'corsheaders',
'api'
- python manage.py migrate
- python manage.py runserver

- api>views.py, masukkan code
- buat file api>serializers.py, masukkan code
- buka file backendapi>urls.py, code
- buat file api>urls.py, code

- test api menggunakan postman
- masukkan http://127.0.0.1:8000/api/users/
