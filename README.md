# CrudPythonKrystian
1. **BACK END API**
    - **Instalasi Django**
        - clone git
        - buat venv
        - Langkah ketika bermasalah dengan privillage ketika aktivasi venv:
        - `Set-ExecutionPolicy Unrestricted -Scope Process`
        - `& d:/TUTORIAL/PYTHON/CrudPythonKrystian/venv/Scripts/Activate.ps1`
        - `pip install django djangorestframework django-cors-headers`
        - `django-admin startproject backendapi`
        - `cd backendapi/`
        - `django-admin strartapp api`

    - **Membuat superuser**
        - `python manage.py migrate`
        - `python manage.py createsuperuser`
        - isi username, email, isi password aris1985

    - **Menambahkan installed apps**
        - Masuk ke folder backendapi>settings.py,
        - pada INSTALLED_APPS tambahkan:
        ```
        'rest_framework',
        'corsheaders',
        'api'
        ```

    - **Menjalankan server**
        - `<python manage.py migrate>`
        - `<python manage.py runserver>`

    - **Kode api dan routing**
        - api>views.py, masukkan code
        - buat file api>serializers.py, masukkan code
        - buka file backendapi>urls.py, code
        - buat file api>urls.py, code

    - **Testing api (add user)**
        - test api menggunakan postman
        - metode GET, masukkan http://127.0.0.1:8000/api/users/,
        output json menunjukkan data user saat ini
        - metode POST, masukkan http://127.0.0.1:8000/api/users/, body>form-data
        pada key, tambahkan username, password untuk membuat user baru.
        output berupa data id berbentuk json
        - jika kembali ke GET, maka akan didapatkan data user baru

    - **Create Token di setiap add user**
        - http://127.0.0.1:8000/admin/
        - tokens>add, buat token baru secara manual untuk username salah satu user
        - untuk membuat token secara otomatis setiap add user, code ada di serializers.py
        - Testing token di postman:
        - GET http://127.0.0.1:8000/auth/ menghasilkan 'not allowed'
        - POST http://127.0.0.1:8000/auth/ , tentukan user/password, maka hasilnya akan menggenerate data token di tiap user
        - daftar token tiap user bisa dilihat di http://127.0.0.1:8000/admin/authtoken/tokenproxy/

2. **FRONT END**
    - **Instalasi React**
        - pastikan node sudah terinstall
        - posisi dir (venv) PS D:\TUTORIAL\PYTHON\CrudPythonKrystian\frontend>
        - `npx create-react-app frontendapp`
        - `cd frontendapp`
        - `yarn start`, app akan berjalan di localhost
    
    - **Membuat login.js dan menampilkan pada App.js**
        - aplikasi kita di src>App.js, (hapus logo.svg, app.test.js karena ndak butuh)
        - di src, buat folder components/login.js
        - isi login.js dengan component react <Login> sederhana berisi form dulu user,pass,login button
        - pada App.js: import <Login> dari login.js (ingat semua tempilan ada di app.js)
        - cek pada browser apakah berhasil terender/tampil

    - **Fungsional login.js**
        - buat state bernama credentials
            - berfungsi menyimpan nilai input username dan password
            - object = username, password
        - buat method 'login'
            - berfungsi sbg event/action dari tombol login
        - buat method 'inputChanged'
            - berfungsi mengambil nilai dari form input dan mengembalikan nilai ke state 

    - **Tes koneksi login di frontend terhadap backendAPI**
        - konfigurasi penting penghubung frontend dan backendapi ada pada method 'login' di login.js, jadi perhatikan code nya
        - Tambahkan konfigurasi cors pada backendapi/setting.py
            - CORS (Cross-origin resource sharing) adalah permasalahan umum pada djangoAPI, diperlukan permission request karena ketatnya security django
        - Lebih lengkapnya jika ada masalah dengan cors django bisa dilihat di https://dzone.com/articles/how-to-fix-django-cors-error atau https://stackoverflow.com/questions/38482059/enabling-cors-cross-origin-request-in-django
        - cek di postman metode POST http://127.0.0.1:8000/auth/ , pastikan output berupa json token user masih berhasil tergenerate
        - cek di di inspect chrome>network>headers, pastikan request method = POST dan request payload=value dari username dan password
        - chrome>network>preview dan response memberikan output json token user


            
