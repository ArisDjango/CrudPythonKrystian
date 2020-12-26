# CrudPythonKrystian
1. **BACK END API**
    - **Instalasi Django**
        - `clone git`
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
        - Masuk ke folder backendapi>[settings.py](https://github.com/ArisDjango/CrudPythonKrystian/blob/2-front_end_login/backendapi/backendapi/settings.py),
        - pada INSTALLED_APPS tambahkan:
        ```
        'rest_framework',
        'corsheaders',
        'api'
        ```
        - Karena ada perubahan pada settings, maka lakukan migrate:
        `<python manage.py migrate>`

    - **Menjalankan server**
        - `<python manage.py runserver>`

    - **view.py**
        - Fungsi: menampilkan viewSet
        - Buka api>[views.py](https://github.com/ArisDjango/CrudPythonKrystian/blob/2-front_end_login/backendapi/api/views.py), masukkan code:
            - import:
            ```
            from rest_framework import viewsets
            from django.contrib.auth.models import User
            from .serializers import UserSerializer
            ```
            - Buat class UserViewSet:
            ```
            class UserViewSet(viewsets.ModelViewSet):
                queryset = User.objects.all()
                serializer_class = UserSerializer
            ```
    - **Menambahkan serializers.py**
        - Fungsi: Serializer berfungsi untuk mengatur data-data apa saja yang akan kita keluarkan melalui endpoint API, conntohnya di model Song kita punya field album, file_type, dan song_title. nah Kita bisa membuat output API ini hanya mengeluarkan field album dan song_title saja jadi tanpa field file_type.
        - buat file baru, api>[serializers.py](https://github.com/ArisDjango/CrudPythonKrystian/blob/2-front_end_login/backendapi/api/serializers.py), masukkan code:
            - import:
            ```
            from rest_framework import serializers
            from django.contrib.auth.models import User
            ```
            - Buat class UserSerializer:
            ```
            class UserSerializer(serializers.ModelSerializer):
                class Meta:
                    model = User
                    fields = ['id', 'username', 'password']
            ```

    - **Redirect url bawaan django ke api/urls.py (buatan sendiri)**
        - Fungsi: melakukan redirect url bawaan django ke api/urls.py (buatan sendiri)
        - buka file backendapi>[urls.py](https://github.com/ArisDjango/CrudPythonKrystian/blob/2-front_end_login/backendapi/backendapi/urls.py), code:

            - menggunakan include: `from django.conf.urls import include`
            - tambahkan path:
                `...path('api/', include('api.urls')),`
    
    - **Routing & buat api>urls.py**
        - Fungsi: Routing url, alur:
            - dari url base django (backendapi/urlspy) di redirect ke url buatan sendiri (api/urls.py)
            - di api/urls.py ditambahkan router
            - dengan router ini meregister viewset yang ada di views.py
            - Register router akan Menghasilkan path seperti ini: http://127.0.0.1:8000/api/users/
        - Buat file api>[urls.py](https://github.com/ArisDjango/CrudPythonKrystian/blob/2-front_end_login/backendapi/api/urls.py), code :
            - import:
                ```
                from django.urls import path
                from django.conf.urls import include
                from rest_framework import routers
                from .views import UserViewSet
                ```
            - untuk membuat Router, tambahkan:
                ```
                router = routers.DefaultRouter()
                router.register('users', UserViewSet)
                ```
            - Memasukkan nama path yang sudah ter-register di router ke dalam path
                - pada urlpatterns, tambahkan: 
                `path('', include(router.urls))`

    - **Testing api (add user)**
        - Fungsi: Memastikan fields di serializers (id, username, password) berhasil terkirim/tampil
        - Pastikan server running
        - test api menggunakan [postman](https://web.postman.co/home)
        - GET http://127.0.0.1:8000/api/users/,
        output json menunjukkan data user saat ini
        - POST http://127.0.0.1:8000/api/users/, body>form-data, dan pada key, tambahkan username, password untuk membuat user baru. output berupa data id, username berbentuk json
        - jika kembali ke GET, maka akan didapatkan data user baru

    - **Hide Passwords**
        - Fungsi: Hasil testing menunjukkan output id, user, password, namun password seharusnya ter hide dari view.py.
        - Buka api/serializers.py
        - pada Class UserSerializers, Tambahkan:
            ```
            extra_kwargs = {'password':{'write_only': True, 'required': True}}
            ```
        - Jika di tes di postman (lihat bab sebelumnya), seharusnya menghasilkan id dan username saja

    - **Hash Passwords**
        - Fungsi: hashing password. password selain tersembunyi juga stringnya teracak.
        - Pada dasarnya membuat fungsi yang me re-create Model. User menjadi ter-hash
        - Buka serializers.py
        - Tambahkan:
            ```
            def create(self, validated_data):
                user = User.objects.create_user(**validated_data)
                return user
            ```
        - Tes di postman, jika ingin melihat password sudah berhasil ter-hash, nonaktifkan dulu fungsi hide password. lalu buat user baru. seharusnya password yang muncul sudah ter-hash. setelah memastikan hash berhasil, kembalikan hide password.

    - **Menambahkan fungsi Token (Authentication)**
        - Fungsi: Menambahkan/install fungsi Token
        - Buat path url `auth`
            - buka `backendapi/urls.py`
            - tambahkan import `from rest_framework.authtoken.views import obtain_auth_token`
            - Tambahkan path baru `path('auth/', obtain_auth_token)`
        - Menambahkan authtoken pada INSTALLED_APPS (daftar lib yg terinstall):
            - Buka backendapi/settings.py
            - Tambahkan pada INSTALLED_APPS, `'rest_framework.authtoken'`
            - untuk menyimpan settings, pada terminal `python manage.py migrate`

    - **Tes fungsi Token di admin**
        - Fungsi: Mencoba tes fungsi Token di admin
        - http://127.0.0.1:8000/admin/
        - Jika proses penambahan fungsi token berhasil, akan muncul menu Auth Tokens di admin
        - pilih `tokens>add`, coba buat token baru secara manual untuk username salah satu user. Jika muncul table `key` dengan value token, maka secara fungsi, fasilitas token berhasil dibuat
    
    - **Membuat fungsi Token otomatis**
        - Fungsi: untuk membuat token secara otomatis tercipta setiap ada penambahan user baru
        - Buka serializers.py
        - tambahkan :
            - Import
             ```
            from rest_framework.authtoken.models import Token
             ```
        - Pada Class UserSerializer>def create, tambahkan:
            ```
            Token.objects.create(user=user)
            ```
    - **Tes fungsi Token otomatis di Postman**
        - Fungsi: Testing token otomatis di postman:
        - Simulasi membuat user baru di postman:
            - POST http://127.0.0.1:8000/api/users
            - masukkan `username/pass` baru, output seharusnya berupa id, username
            - Ketika di cek di GET http://127.0.0.1:8000/auth/ , seharusnya muncul " not allowed.".
            - Ketika di cek di POST http://127.0.0.1:8000/auth/ , token untuk username baru tersebut seharusnya muncul/tercipta.
            - Ketika di cek di admin>menu token, token baru untuk user ini juga seharusnya muncul
        - daftar token tiap user bisa dilihat di http://127.0.0.1:8000/admin/authtoken/tokenproxy/

2. **FRONT END**
    - **Instalasi React**
        - pastikan node sudah terinstall
        - posisi dir (venv) PS D:\TUTORIAL\PYTHON\CrudPythonKrystian\frontend>
        - `npx create-react-app frontendapp`
        - `cd frontendapp`
        - `yarn start`, app akan berjalan di localhost
    
    - **Membuat login.js dan menampilkan pada App.js**
        - aplikasi kita di src>[App.js](https://github.com/ArisDjango/CrudPythonKrystian/blob/2-front_end_login/frontend/frontendapp/src/App.js), _(hapus logo.svg, app.test.js karena ndak butuh)_
        - di src, buat folder components/[login.js](https://github.com/ArisDjango/CrudPythonKrystian/blob/2-front_end_login/frontend/frontendapp/src/components/login.js)
        - isi login.js dengan component react <Login> sederhana berisi form dulu user,pass,login button
        - pada App.js: import <Login> dari login.js (ingat semua tempilan ada di app.js)
        - cek pada browser apakah berhasil terender/tampil

    - **Fungsional login.js**
        - Masuk components/[login.js](https://github.com/ArisDjango/CrudPythonKrystian/blob/2-front_end_login/frontend/frontendapp/src/components/login.js)
        - buat state bernama credentials
            - Fungsi: menyimpan nilai input username dan password
            - object = username, password
            - code:
                ```
                state = {
                    credentials: {username:'', password:''}
                }
                ```
        - buat method 'login'
            - Fungsi: sbg event/action dari tombol login / 'onClick'
            - melakukan fetch pada url auth api http://127.0.0.1:8000/auth/ --> backend Django
            - membuat premis .then mengambil data bentuk json
            - membuat premis .then menampilkan data.token
            - membuat premis .catch untuk menghandle error
            - code:
                ```
                login = event => {
                    //console.log(this.state.credentials);
                    fetch('http://127.0.0.1:8000/auth/',{
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(this.state.credentials)    
                })
                .then(data => data.json())//Mengambil data bentuk json
                .then(
                    data => {
                    //console.log(data.token);//menyimpan data di local storage
                    this.props.userLogin(data.token);
                    }
                ).catch( error => console.error(error))
                }
                ```
        - buat method 'inputChanged'
            - berfungsi mengambil nilai dari form input 'onChange' dan mengembalikan nilai ke state
            - Membuat const cred dengan nilai state credentials
            - code:
                ```
                    inputChanged = event => {
                        const cred = this.state.credentials; 
                        cred[event.target.name] = event.target.value;/
                        this.setState({credentials: cred});
                    }
                ```

    - **Tes koneksi login di frontend terhadap backendAPI**
        - konfigurasi penting penghubung frontend dan backendapi ada pada method 'login' di [login.js](https://github.com/ArisDjango/CrudPythonKrystian/blob/2-front_end_login/frontend/frontendapp/src/components/login.js), jadi perhatikan code nya
        - Tambahkan konfigurasi cors pada backendapi/[setting.py](https://github.com/ArisDjango/CrudPythonKrystian/blob/2-front_end_login/backendapi/backendapi/settings.py)
            - CORS (Cross-origin resource sharing) adalah permasalahan umum pada djangoAPI, diperlukan permission request karena ketatnya security django
        - Lebih lengkapnya jika ada masalah dengan cors django bisa dilihat di https://dzone.com/articles/how-to-fix-django-cors-error atau https://stackoverflow.com/questions/38482059/enabling-cors-cross-origin-request-in-django
        - Pastikan backend 127.0.0.1:8000 kondisi running
        - cek di postman metode POST http://127.0.0.1:8000/auth/ , pastikan output berupa json token user masih berhasil tergenerate
        - cek di di inspect chrome>network>headers, pastikan menghasilkan request method = POST dan request payload=value dari username dan password
        - chrome>network>preview dan response memberikan output json token user

3. **REGISTER, GET, DAN AUTH TOKEN**
    - **Register**
        - Kita bisa meghubungkan FE dan BE melalui API, bisa melakukan request, namun belum sepenuhnya bisa berkomunikasi.
        - fungsi : button register, sehingga user baru bisa ditambahkan melalui frontend dan tersimpan di backend
        - buka login.js
        - buat _method register_, code copas dari login, edit code api:
            - fetch http://127.0.0.1:8000/api/users/
        - buat button register, _onClick->method register_
        - tes koneksi pada chrome:
            - jika register dengan username yang sudah terdaftar maka akan muncul pesan "sudah terdaftar" pada network.
            - Jika register dengan username baru, seharusnya berhasil muncul user/pass.(cek di admin)
            - Jika login dengan user terdaftar, maka akan muncul token
            - Jika login dengan user tak terdaftar, maka akan muncul pesan "tidak bisa login"
    
    - **Auth token**
        - ketika login berhasil, mendapatkan data mendapatkan token, lalu:
        - pada App.js, buat method _const userLogin_
            ```
            const userLogin = (tok) => {
                setToken(tok);
            ```
        - import _{useState}_, lalu buat method baru diatas _userLogin_ :
            ```
            const [token, setToken] = useState('');
            ```   
        - pada App.js,`<Login>` buat props userLogin, value mengambil _const userLogin_ diatas.
        - pada login.js>method login>.then, panggil  `this.props.userLogin(data.token)`

    - **Book.js (content `<h1>`)**
        - fungsi : menampilkan book.js untuk sementara sederhana, yang penting tampil. untuk fungsi menampilkan daftar buku dari models dibahas nanti
        - buat komponen baru, Component/book.js
            - isi dengan component dasar dulu
        - pada App.js, tambahkan `<Books>`
        - `import Books from './components/books';`
        - cek pada browser, apakah component berhasil tampil

    - **models book**
        - fungsi: menghandle data buku
        - buka api/models.py
        - buat class book
        - buat record/table title
        - update models:
            - `python manage.py makemigrations`
            - `python manage.py migrate`

    - **Menampilkan models book di admin**
        - fungsi: agar ada menu book di admin backend
        - buka api/admin.py
        - `from .models import Book`
        - `admin.site.register(Book)`
        - Menambahkan daftar buku
            - http://127.0.0.1:8000/admin/api/book/
            - add book, tambahkan contoh 3 daftar buku

    - **Membuat BookSerializer** 
        - buka api/serializers.py
        - `from .models import Book`
        -   ```
            class BookSerializer(serializers.ModelSerializer):
                class Meta:
                    model = Book
                    fields = ['id', 'title']
            ``` 

    - **Menambahkan BookViewSet di view** 
        - buka api/views.py
        - `from .models import Book`
        - Membuat BookViewSet:
            ```
            class BookViewSet(viewsets.ModelViewSet):
                queryset = Book.objects.all()
                serializer_class = BookSerializer
                authentication_classes = [TokenAuthentication, ]
                permission_classes = [IsAuthenticated, ]
            ```
    - **Routing book url** 
        - buka api/urls.py
        - `from .views import BookViewSet`
        - `router.register('books', BookViewSet)`

    - **Testing fungsi book di postman**
        - metode:GET http://127.0.0.1:8000/api/books
        - Seharusnya menghasilkan Json book berupa id,title sebanyak 3 buah

    - **Fetch book dari Frontend ke BackendAPI**
        - Fungsi: mengambil data book di backendapi dari frontend react
        - Buka App.js
        - pada `<Books>`, buat prop `token={token}`
        - Buka books.js
        - Buat state kosong untuk menyimpan data book dari api/button `load Books`:
            ```
            state = {
                books: []
            }
            ```
        - Buat button 'Load Books', `onClick={this.loadBooks}`
        - Buat method `loadBooks`, isinya copy paste fungsi dari method register di login.js, edit contennya:
            - fetch('http://127.0.0.1:8000/api/books'
            - method: 'GET'
            - Premis
                ```
                .then(
                    data => {
                        this.setState({books: data});
                    }
                ```
        - Pada `render()`, tampilkan data Book 
            ```
            <h1>Books</h1>
              {this.state.books.map(book => {
                return <h3 key={book.id}>{book.title}</h3>
              })}
            ```
        - Buka http://127.0.0.1:3000, seharusnya data books sudah muncul

    - **Hak akses Load Books**
        - Fungsi: Mengatur akses Load books. hanya yang sudah login yang bisa mengakses Load books. karena saat ini semua orang bisa mengaksesnya
        - 
        - Buka views.py
        - Mengatur Authentication dan Permissions akses Load book:
            - import
            ```
            from rest_framework.authentication import TokenAuthentication
            from rest_framework.permissions import IsAuthenticated
            ```
            - Pada `class BookViewSet`, tambahkan:
            ```
            ...
            authentication_classes = [TokenAuthentication, ]
            permission_classes = [IsAuthenticated, ]

            ```
        - Buka books.js
        - pada method loadBooks()>headers tambahkan:
            ```
            Authorization: `Token ${this.props.token}`
            ```
        - Tes Pada chrome
            - Login, lalu Load Books, seharusnya berhasil muncul daftar buku. tanpa login akan menghasilkan error
            - inspect >Headers>request headers>Authorization seharusnya value = token

    

    
        

        

            
