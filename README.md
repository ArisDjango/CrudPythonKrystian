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
- metode GET, masukkan http://127.0.0.1:8000/api/users/,
  output json menunjukkan data user saat ini
- metode POST, masukkan http://127.0.0.1:8000/api/users/, body>form-data
  pada key, tambahkan username, password untuk membuat user baru.
  output berupa data id berbentuk json
- jika kembali ke GET, maka akan didapatkan data user baru

TOKEN
- http://127.0.0.1:8000/admin/
- tokens>add, buat token baru secara manual untuk username salah satu user
- membuat token secara otomatis setiap add user, code ada di serializers.py
- Testing token di postman:
- GET http://127.0.0.1:8000/auth/ menghasilkan 'not allowed'
- POST http://127.0.0.1:8000/auth/ , tentukan user/password, maka hasilnya akan menggenerate data token
- daftar token bisa dilihat di http://127.0.0.1:8000/admin/authtoken/tokenproxy/

