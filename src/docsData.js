export const repoHighlights = [
  {
    label: 'Node Minimal',
    value: 'Node.js >= 20',
    description:
      'Mengikuti panduan scaffold Backurus. Panduan juga menyebut project contoh berjalan di Node 24.',
  },
  {
    label: 'CLI',
    value: 'node urus',
    description:
      'Satu pintu untuk generator, migrate, serve, queue, schedule, testing, dan utilitas lain.',
  },
  {
    label: 'Docs API',
    value: '/docs dan /docs.json',
    description: 'Swagger UI dan endpoint spec yang tersedia di runtime.',
  },
  {
    label: 'Realtime',
    value: '/ws',
    description: 'Endpoint WebSocket untuk event/notification realtime dari server.',
  },
]

export const docsSections = [
  {
    id: 'introduction',
    eyebrow: 'Mulai',
    title: 'Apa Itu Backurus',
    summary:
      'Backurus adalah framework backend Node.js bergaya Laravel (ES Modules) dengan fokus utama DX cepat dan ekspresif untuk membangun REST API.',
    content: [
      'Scaffold Backurus menyediakan CLI, router, response helper, global error handler (dev/prod), validator advanced, ORM Eloquent-style, migration + seeder, JWT auth, gate/policy, cache, event bus, queue, scheduler, WebSocket, Swagger docs, helpers/facades, dan test runner.',
      'Dokumentasi ini mengikuti isi panduan scaffold (panduan.txt) dan merangkum cara pakai fitur-fitur utama dengan contoh praktis.',
    ],
    bullets: [
      'Pola Laravel: route -> controller -> validate -> model -> response.',
      'Fitur runtime: queue, schedule, websocket, swagger docs.',
    ],
    codeExamples: [
      {
        title: 'Tujuan utama',
        language: 'text',
        code: `DX cepat dan ekspresif untuk REST API di Node.js
Dengan pola Laravel: routing, controller, validation, ORM, migrations, seeders, auth, middleware.`,
      },
    ],
    sourceFiles: ['panduan.txt'],
    keywords: ['backurus', 'laravel', 'node', 'dx', 'rest api'],
  },
  {
    id: 'project-structure',
    eyebrow: 'Struktur',
    title: 'Struktur Folder Project',
    summary:
      'Struktur scaffold memisahkan code aplikasi (app/, routes/) dan core framework (core/) plus konfigurasi (config/) dan database assets (database/).',
    content: [
      'Aplikasi kamu ada di `app/` (controllers, models, requests, middleware, jobs, events, listeners, resources, policies, modules).',
      'Framework runtime ada di `core/` (server, router, response, error handler, validator, ORM, DB, cache, events, queue, scheduler, swagger, websocket, helpers, testing).',
    ],
    bullets: [
      'Routes: `routes/api.js`, `routes/web.js`, `routes/console.js`.',
      'i18n validation: `resources/lang/en/validation.js` dan `resources/lang/id/validation.js`.',
      'Static root: `public/`.',
      'App logs: `storage/logs/` (Logger).',
      'Framework error logs: `logs/error.log` (5xx/database).',
    ],
    codeExamples: [
      {
        title: 'Folder tree (ringkas)',
        language: 'text',
        code: `app/
  controllers/
  models/
  requests/
  middleware/
  events/
  listeners/
  jobs/
  resources/
  policies/
  modules/
bootstrap/
config/
core/
database/
  migrations/
  seeders/
plugins/
routes/
resources/lang/
public/
storage/
logs/
urus`,
      },
    ],
    sourceFiles: ['panduan.txt'],
    keywords: ['struktur', 'folder', 'app', 'core', 'config', 'routes'],
  },
  {
    id: 'quickstart',
    eyebrow: 'Quickstart',
    title: 'Menjalankan Project',
    summary:
      'Jalankan scaffold Backurus dengan install dependency, migrate, seed, lalu start development server dengan watcher.',
    content: [
      'Untuk development, gunakan `node urus serve` agar watcher + hot reload aktif. Untuk start tanpa watcher, gunakan `node index.js`.',
      'Hot reload memakai restart aman (stop -> wait -> start) untuk mencegah port conflict seperti EADDRINUSE.',
    ],
    bullets: ['Node minimal: 20+.'],
    codeExamples: [
      {
        title: 'Quickstart',
        language: 'bash',
        code: `npm install
node urus migrate
node urus db:seed
node urus serve`,
      },
      {
        title: 'Start tanpa watcher',
        language: 'bash',
        code: `node index.js`,
      },
    ],
    sourceFiles: ['panduan.txt'],
    keywords: ['quickstart', 'serve', 'migrate', 'seed', 'watcher'],
  },
  {
    id: 'env-configuration',
    eyebrow: 'Config',
    title: 'ENV & Konfigurasi',
    summary:
      'Konfigurasi utama dibaca dari `.env` lalu dirangkum oleh `core/config.js` dan `config/*` (app, auth, cache, database, queue, storage).',
    content: [
      'Disarankan tidak commit `.env` ke repository publik.',
      'Kunci penting: APP_*, DB_*, JWT_SECRET, REDIS_*, QUEUE_CONNECTION, CACHE_DRIVER, RATE_LIMIT_*, dan CORS_*.',
    ],
    bullets: [
      'Locale: `APP_LOCALE` (misal `id`).',
      'Rate limit: `RATE_LIMIT_MAX`, `RATE_LIMIT_WINDOW_MS`.',
      'CORS: `CORS_ORIGIN`, `CORS_METHODS`, `CORS_HEADERS`, `CORS_CREDENTIALS`.',
    ],
    codeExamples: [
      {
        title: 'Contoh .env',
        language: 'env',
        code: `APP_NAME=Backurus
APP_PORT=3001
APP_ENV=development
APP_URL=http://127.0.0.1:3001
APP_LOCALE=id

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=testfw
DB_USERNAME=root
DB_PASSWORD=secret

JWT_SECRET=supersecretkey

REDIS_HOST=127.0.0.1
REDIS_PORT=6379
REDIS_PASSWORD=

QUEUE_CONNECTION=sync

CACHE_DRIVER=memory
CACHE_PREFIX=backurus:

RATE_LIMIT_MAX=100
RATE_LIMIT_WINDOW_MS=60000

CORS_ORIGIN=http://localhost:5173
CORS_METHODS=GET,POST,PUT,PATCH,DELETE,OPTIONS
CORS_HEADERS=Content-Type, Authorization, X-Requested-With
CORS_CREDENTIALS=false`,
      },
    ],
    sourceFiles: ['panduan.txt'],
    keywords: ['env', 'config', 'cors', 'rate limit', 'cache', 'queue'],
  },
  {
    id: 'cli-commands',
    eyebrow: 'CLI',
    title: 'CLI (node urus)',
    summary:
      'CLI Backurus (`node urus`) adalah pusat workflow: generator, database, route utilities, queue, scheduler, serve, config cache, storage link, sampai test runner.',
    content: [
      'Generator membuat file boilerplate untuk controller, model, migration, middleware, request, job, event, seeder, policy, resource, dan module.',
      'Command operasional meliputi migrasi, seed, route:list, queue worker, schedule runner, serve watcher, config cache, storage symlink, dan testing.',
    ],
    bullets: [
      'Generator: `node urus make:*`.',
      'Database: `migrate*`, `db:seed`, `route:list`.',
      'Queue & Scheduler: `queue:work`, `queue:restart`, `schedule:run`.',
      'Serve & Config: `serve`, `config:cache`, `config:clear`, `storage:link`.',
      'Testing: `node urus test`.',
    ],
    codeExamples: [
      {
        title: 'Generator',
        language: 'bash',
        code: `node urus make:controller UserController
node urus make:model User
node urus make:migration create_users_table
node urus make:middleware AuthMiddleware
node urus make:request StoreUserRequest
node urus make:job SendEmailJob
node urus make:event UserRegistered
node urus make:seeder UserSeeder
node urus make:policy UserPolicy
node urus make:resource UserResource
node urus make:module Admin`,
      },
      {
        title: 'Serve, config, storage, test',
        language: 'bash',
        code: `node urus serve
node urus config:cache
node urus config:clear
node urus storage:link
node urus test`,
      },
    ],
    sourceFiles: ['panduan.txt'],
    keywords: ['cli', 'urus', 'make:model', 'migrate', 'route:list', 'test'],
  },
  {
    id: 'routing',
    eyebrow: 'HTTP',
    title: 'Routing',
    summary:
      'Routes disusun di `routes/api.js`, `routes/web.js`, dan `routes/console.js`. Router mendukung metode HTTP, parameter `:id`, aksi `Controller@method`, middleware alias, validasi route, dan penamaan route.',
    content: [
      'Contoh REST routes ditulis dengan `Route.get/post/put/delete` lalu chaining `.name(...)` dan `.middleware(...)`.',
      'Validasi bisa otomatis di route dengan `.validate(StoreUserRequest)`.',
    ],
    bullets: [
      'Lihat semua routes: `node urus route:list`.',
      'Docs routes (Swagger UI): `GET /docs` dan `GET /docs.json`.',
    ],
    codeExamples: [
      {
        title: 'Contoh REST routes',
        language: 'javascript',
        code: `Route.get('/users', 'UserController@index').name('users.index')
Route.post('/users', 'UserController@store').name('users.store')
Route.get('/users/:id', 'UserController@show').name('users.show')
Route.put('/users/:id', 'UserController@update').name('users.update')
Route.delete('/users/:id', 'UserController@destroy').name('users.destroy')

Route.get('/profile', 'UserController@profile').middleware('auth')`,
      },
      {
        title: 'Validasi auto di route',
        language: 'javascript',
        code: `Route.post('/users', 'UserController@store')
  .validate(StoreUserRequest)
  .name('users.store')`,
      },
    ],
    sourceFiles: ['panduan.txt'],
    keywords: ['routing', 'routes', 'middleware', 'validate', 'route:list'],
  },
  {
    id: 'controllers',
    eyebrow: 'Application',
    title: 'Controller & Response',
    summary:
      'Controller pattern mirip Laravel: class dengan method `index/store/show/update/destroy` dan return response helper konsisten.',
    content: [
      'Response success/error memiliki format yang seragam agar mudah dipakai frontend dan mudah debugging.',
      'Helper response tersedia di `core/response.js` (success/created/paginated/error/validationError/serverError/databaseError/notFound/unauthorized/forbidden).',
    ],
    bullets: [
      'Success: `status`, `success`, `code`, `message`, `data`.',
      'Error: `status`, `success`, `code`, `type`, `message`, `errors`.',
    ],
    codeExamples: [
      {
        title: 'Controller contoh',
        language: 'javascript',
        code: `export default class UserController {
  async index(req, res) {
    const users = await User.all()
    return res.success(users, 'OK')
  }
}`,
      },
      {
        title: 'Response helper',
        language: 'text',
        code: `res.success(data, message = 'OK', statusCode = 200)
res.created(data, message = 'Created', statusCode = 201)
res.paginated(items, meta, message = 'OK')
res.error(message, code = 400, errors = null)
res.validationError(errors, message = 'Validation failed')
res.serverError(message = 'Internal Server Error')
res.databaseError(message, code = 500)
res.notFound(message = 'Not Found')
res.unauthorized(message = 'Unauthorized')
res.forbidden(message = 'Forbidden')`,
      },
    ],
    sourceFiles: ['panduan.txt'],
    keywords: ['controller', 'response', 'success', 'error'],
  },
  {
    id: 'error-handling',
    eyebrow: 'Errors',
    title: 'Global Error Handling (Dev vs Prod)',
    summary:
      'Semua error ditangani oleh global error handler. Saat development, response lebih detail dan bisa menampilkan pretty error page untuk HTML. Saat production, error 5xx disamarkan.',
    content: [
      'HTTP error classes: HttpError, NotFoundError, UnauthorizedError, ForbiddenError, ValidationError, DatabaseError.',
      'Logging: error handler menulis ke `logs/error.log` untuk error 5xx dan database.',
    ],
    bullets: ['Development: detail file/line/stack.', 'Production: 5xx disamarkan.'],
    codeExamples: [
      {
        title: 'Contoh throw HttpError',
        language: 'javascript',
        code: `throw new NotFoundError('User not found')`,
      },
    ],
    sourceFiles: ['panduan.txt'],
    keywords: ['error handler', 'development', 'production', 'logs/error.log'],
  },
  {
    id: 'validation',
    eyebrow: 'Validation',
    title: 'Validation (Request, Schema, Sanitize)',
    summary:
      'Validator advanced mendukung request class ala Laravel, schema validation langsung, nested path, array wildcard, conditional rules, file/image validation, i18n, sanitization, dan fluent hooks.',
    content: [
      'Request class menyediakan rules(), messages(), dan sanitize(). Bisa dipakai di controller atau otomatis di route.',
      'Schema validation langsung mendukung nested key seperti user.email dan wildcard tags.*.',
    ],
    bullets: [
      'Conditional: required_if, required_unless, required_with, required_without.',
      'File/image: file, mimes, image, dimensions, max/min.',
      'Localization: `APP_LOCALE` + file i18n validation.',
    ],
    codeExamples: [
      {
        title: 'Request class contoh',
        language: 'javascript',
        code: `class StoreUserRequest {
  rules() {
    return {
      name: 'required|alpha_spaces|min:3',
      email: 'required|email',
      password: 'required|password'
    }
  }

  messages() {
    return {
      email: {
        required: 'Email wajib diisi',
        email: 'Format email tidak valid'
      }
    }
  }

  sanitize() {
    return {
      name: 'trim',
      email: 'trim|lowercase'
    }
  }
}`,
      },
      {
        title: 'Nested + wildcard + conditional',
        language: 'javascript',
        code: `await validate(data, {
  'user.name': 'required|min:3',
  'user.email': 'required|email',
  tags: 'array',
  'tags.*': 'string|min:2',
  role: 'required',
  secret: 'required_if:role,admin'
})`,
      },
      {
        title: 'File validation',
        language: 'javascript',
        code: `await validate(
  {},
  { avatar: 'required|file|mimes:png,jpg|max:2048' },
  null,
  { files: req.files }
)`,
      },
    ],
    sourceFiles: ['panduan.txt'],
    keywords: ['validation', 'sanitize', 'i18n', 'wildcard', 'file'],
  },
  {
    id: 'request-parsing',
    eyebrow: 'HTTP',
    title: 'Request Parsing (JSON, FORM, MULTIPART)',
    summary:
      'Backurus membaca body request untuk JSON, x-www-form-urlencoded, dan multipart/form-data, termasuk dukungan file buffer untuk upload.',
    content: [
      'Akses data melalui `req.body`, `req.query`, `req.params`.',
      'File tersedia lewat `req.files` dan helper `req.file(name)` untuk mengambil file single.',
    ],
    bullets: ['JSON, form-urlencoded, multipart/form-data.'],
    codeExamples: [
      {
        title: 'Akses file single',
        language: 'javascript',
        code: `const avatar = req.file('avatar')
// { originalName, mimetype, size, buffer }`,
      },
    ],
    sourceFiles: ['panduan.txt'],
    keywords: ['multipart', 'files', 'req.body', 'req.file'],
  },
  {
    id: 'orm',
    eyebrow: 'ORM',
    title: 'ORM & Query Builder',
    summary:
      'Model Backurus bergaya Eloquent: define `static table`, lalu gunakan CRUD helper dan query builder chaining. Mendukung relasi dan soft delete.',
    content: ['CRUD: all, find, create, update, delete.', 'Query builder: where, first, get, orderBy, limit, paginate, with(relations).'],
    bullets: ['Relasi: hasMany, hasOne, belongsTo, belongsToMany.', 'Soft delete: `static softDeletes = true`.'],
    codeExamples: [
      {
        title: 'Model contoh',
        language: 'javascript',
        code: `import Model from '../../core/model'
export default class User extends Model {
  static table = 'users'
}`,
      },
      {
        title: 'CRUD + query builder',
        language: 'javascript',
        code: `await User.all()
await User.find(1)
await User.create({ name: 'Rakha' })
await User.update(1, { name: 'Rakha Aja' })
await User.delete(1)

await User.where('age', '>', 18).get()
await User.where('email', 'a@b.com').first()
await User.orderBy('created_at', 'desc').limit(10).get()
await User.paginate(10, 1)
await User.with('posts').find(1)`,
      },
    ],
    sourceFiles: ['panduan.txt'],
    keywords: ['orm', 'model', 'query builder', 'relations', 'soft delete'],
  },
  {
    id: 'migrations',
    eyebrow: 'Database',
    title: 'Migrations & Schema Builder',
    summary:
      'Migrations ditulis sebagai module JS dengan method up/down dan schema builder API (table.id, table.string, table.timestamps, dll).',
    content: ['Command tersedia: migrate, rollback, reset, fresh, status.'],
    bullets: [],
    codeExamples: [
      {
        title: 'Contoh migration',
        language: 'javascript',
        code: `export default {
  async up(schema) {
    await schema.create('users', (table) => {
      table.id()
      table.string('name')
      table.string('email').unique()
      table.timestamps()
    })
  },
  async down(schema) {
    await schema.drop('users')
  }
}`,
      },
      {
        title: 'Command migration',
        language: 'bash',
        code: `node urus migrate
node urus migrate:rollback
node urus migrate:reset
node urus migrate:fresh
node urus migrate:status`,
      },
    ],
    sourceFiles: ['panduan.txt'],
    keywords: ['migrations', 'schema builder', 'rollback', 'fresh'],
  },
  {
    id: 'seeders',
    eyebrow: 'Database',
    title: 'Seeders + Faker',
    summary:
      'Seeders dibuat dengan `make:seeder` dan dijalankan lewat `db:seed`. Tersedia helper faker untuk generate data dummy.',
    content: [],
    bullets: ['Buat: `node urus make:seeder UserSeeder`.', 'Run: `node urus db:seed`.'],
    codeExamples: [
      {
        title: 'Faker contoh',
        language: 'javascript',
        code: `const user = await User.create({
  name: faker().name(),
  email: faker().email()
})`,
      },
    ],
    sourceFiles: ['panduan.txt'],
    keywords: ['seeders', 'faker', 'db:seed'],
  },
  {
    id: 'auth',
    eyebrow: 'Security',
    title: 'Auth JWT + Middleware',
    summary:
      'JWT auth tersedia melalui route login/register dan middleware alias `auth` yang memeriksa header Authorization Bearer.',
    content: ['Middleware `auth` memverifikasi token via `JWT_SECRET`.'],
    bullets: ['Routes default: `/login`, `/register`, `/profile`.'],
    codeExamples: [
      {
        title: 'Route auth',
        language: 'text',
        code: `Route.post('/login', 'AuthController@login')
Route.post('/register', 'AuthController@register')
Route.get('/profile', 'UserController@profile').middleware('auth')`,
      },
      {
        title: 'Header yang dibutuhkan',
        language: 'text',
        code: `Authorization: Bearer <token>`,
      },
    ],
    sourceFiles: ['panduan.txt'],
    keywords: ['auth', 'jwt', 'middleware', 'bearer'],
  },
  {
    id: 'gate-policy',
    eyebrow: 'Authorization',
    title: 'Gate / Policy',
    summary:
      'Gate/Policy concept tersedia untuk authorization. Definisikan ability dan panggil authorize sebelum menjalankan aksi.',
    content: ['Gunakan facade `Gate` untuk define/authorize.'],
    bullets: [],
    codeExamples: [
      {
        title: 'Gate facade',
        language: 'javascript',
        code: `Gate.define('update-post', (user, post) => user.id === post.user_id)
await Gate.authorize('update-post', user, post)`,
      },
    ],
    sourceFiles: ['panduan.txt'],
    keywords: ['gate', 'policy', 'authorize'],
  },
  {
    id: 'cache',
    eyebrow: 'Cache',
    title: 'Cache',
    summary:
      'Cache driver mendukung memory (default) atau redis (CACHE_DRIVER=redis), lengkap dengan facade dan helper.',
    content: ['Gunakan `Cache.remember` untuk caching query yang sering dipakai.'],
    bullets: [],
    codeExamples: [
      {
        title: 'Cache facade/helper',
        language: 'javascript',
        code: `await Cache.set('users', data, 60)
await Cache.get('users')
await Cache.remember('users', 60, async () => await User.all())
await Cache.delete('users')
await Cache.flush()

await cache().remember('users', 60, async () => await User.all())`,
      },
    ],
    sourceFiles: ['panduan.txt'],
    keywords: ['cache', 'redis', 'memory', 'remember'],
  },
  {
    id: 'events',
    eyebrow: 'Events',
    title: 'Events',
    summary:
      'Event bus tersedia lewat helper dan facade untuk emit/listen event di dalam aplikasi.',
    content: [],
    bullets: [],
    codeExamples: [
      {
        title: 'Event helper/facade',
        language: 'javascript',
        code: `event('user.created', user)
listen('user.created', async (user) => { /* ... */ })

Event.emit('user.created', user)
Event.listen('user.created', handler)`,
      },
    ],
    sourceFiles: ['panduan.txt'],
    keywords: ['events', 'event bus', 'listen'],
  },
  {
    id: 'queue',
    eyebrow: 'Async',
    title: 'Queue',
    summary:
      'Queue driver sync (default) atau redis (QUEUE_CONNECTION=redis). Dispatch job bisa langsung atau delay. Worker dijalankan lewat CLI.',
    content: [],
    bullets: ['Worker: `node urus queue:work`.', 'Restart: `node urus queue:restart`.'],
    codeExamples: [
      {
        title: 'Dispatch + worker',
        language: 'text',
        code: `await Queue.dispatch(new SendEmailJob(user))
await Queue.dispatchLater(new SendEmailJob(user), 3000)

node urus queue:work
node urus queue:restart`,
      },
    ],
    sourceFiles: ['panduan.txt'],
    keywords: ['queue', 'redis', 'dispatch', 'worker'],
  },
  {
    id: 'scheduler',
    eyebrow: 'Automation',
    title: 'Scheduler',
    summary:
      'Scheduler mendefinisikan command terjadwal di `routes/console.js` dan dijalankan lewat `node urus schedule:run`.',
    content: ['Biasanya dipanggil via cron (di luar) untuk mengeksekusi `node urus schedule:run` tiap menit.'],
    bullets: [],
    codeExamples: [
      {
        title: 'Run scheduler',
        language: 'bash',
        code: `node urus schedule:run`,
      },
    ],
    sourceFiles: ['panduan.txt'],
    keywords: ['scheduler', 'schedule:run', 'routes/console.js'],
  },
  {
    id: 'plugins',
    eyebrow: 'Extensibility',
    title: 'Plugins',
    summary:
      'Plugins auto-loaded dari `plugins/*/index.js`. Cocok untuk register middleware, logging, dan extension behavior lainnya.',
    content: ['Contoh plugin logger tersedia di `plugins/logger-plugin/index.js`.'],
    bullets: [],
    codeExamples: [
      {
        title: 'Struktur plugin',
        language: 'text',
        code: `plugins/
  logger-plugin/
    index.js`,
      },
    ],
    sourceFiles: ['panduan.txt'],
    keywords: ['plugins', 'logger'],
  },
  {
    id: 'websocket',
    eyebrow: 'Realtime',
    title: 'WebSocket',
    summary: 'Endpoint WebSocket tersedia di `/ws`. Server bisa emit event notification ke client.',
    content: [],
    bullets: [],
    codeExamples: [
      {
        title: 'Emit notification',
        language: 'javascript',
        code: `req.container.make('ws').emit('notification', { message: 'Hello' })`,
      },
    ],
    sourceFiles: ['panduan.txt'],
    keywords: ['websocket', 'ws', 'emit'],
  },
  {
    id: 'swagger-docs',
    eyebrow: 'Docs',
    title: 'Swagger Docs',
    summary: 'Swagger docs tersedia di `GET /docs` dan `GET /docs.json`.',
    content: [],
    bullets: [],
    codeExamples: [
      {
        title: 'Docs routes',
        language: 'text',
        code: `GET /docs
GET /docs.json`,
      },
    ],
    sourceFiles: ['panduan.txt'],
    keywords: ['swagger', 'docs', 'openapi'],
  },
  {
    id: 'helpers',
    eyebrow: 'Helpers',
    title: 'Helpers (Fluent + Macro + Container + Facade)',
    summary:
      'Helpers global seperti collect(), str(), app(), cache(), event(), listen(), log(), faker(), limit() serta facade objects seperti Cache, DB, Event, Gate, Log, Queue, Storage.',
    content: [
      'Collection fluent untuk manipulasi array/object, String fluent untuk transform string, dan macro system untuk menambah method custom.',
      'Service container: bind/make untuk dependency injection sederhana.',
    ],
    bullets: [],
    codeExamples: [
      {
        title: 'Collection fluent',
        language: 'javascript',
        code: `collect(users)
  .filter((u) => u.active)
  .pluck('email')
  .unique()
  .values()
  .all()`,
      },
      {
        title: 'String fluent + macro',
        language: 'javascript',
        code: `str('hello world').slug().upper().toString()

str.macro('reverse', (value) => value.split('').reverse().join(''))
str('rakha').reverse().toString()`,
      },
      {
        title: 'Service container',
        language: 'javascript',
        code: `app.bind('mailer', MailService)
const mailer = app.make('mailer')`,
      },
      {
        title: 'Rate limit helper per-route',
        language: 'javascript',
        code: `Route.post('/login', 'AuthController@login', limit('login', 10, 60))`,
      },
    ],
    sourceFiles: ['panduan.txt'],
    keywords: ['helpers', 'collect', 'str', 'macro', 'container', 'facade'],
  },
  {
    id: 'logging',
    eyebrow: 'Observability',
    title: 'Logging',
    summary:
      'Ada dua jalur log: framework error log di `logs/error.log` dan app log via Logger service di `storage/logs/backurus.log`.',
    content: [],
    bullets: [],
    codeExamples: [
      {
        title: 'Log facade/helper',
        language: 'javascript',
        code: `await Log.info('User created', { userId: 1 })
await log().error('Database failed')`,
      },
    ],
    sourceFiles: ['panduan.txt'],
    keywords: ['logging', 'logs/error.log', 'storage/logs'],
  },
  {
    id: 'testing',
    eyebrow: 'Quality',
    title: 'Testing',
    summary:
      'Test runner tersedia lewat `node urus test`. File test diletakkan di `tests/*.test.js` dengan globals `test`, `expect`, dan `http`.',
    content: ['Helper http memakai baseUrl dari `TEST_BASE_URL` atau `APP_URL/APP_PORT`.'],
    bullets: [],
    codeExamples: [
      {
        title: 'Contoh test',
        language: 'javascript',
        code: `test('create user', async () => {
  const res = await http.post('/users', { name: 'Rakha' })
  expect(res.status).toBe(201)
})`,
      },
      {
        title: 'Jalankan test',
        language: 'bash',
        code: `node urus test`,
      },
    ],
    sourceFiles: ['panduan.txt'],
    keywords: ['testing', 'urus test', 'tests'],
  },
  {
    id: 'troubleshooting',
    eyebrow: 'Help',
    title: 'Troubleshooting',
    summary:
      'Checklist cepat untuk masalah umum saat development: port conflict, DB connect, dan detail error response.',
    content: [
      'Port conflict (EADDRINUSE): cek proses lain memakai APP_PORT.',
      'DB connect error: pastikan MySQL/Redis hidup dan `.env` benar.',
      'Error response tidak detail: pastikan `APP_ENV=development`.',
    ],
    bullets: [],
    codeExamples: [],
    sourceFiles: ['panduan.txt'],
    keywords: ['troubleshooting', 'EADDRINUSE', 'database', 'APP_ENV'],
  },
  {
    id: 'crud-summary',
    eyebrow: 'Workflow',
    title: 'Ringkasan Membuat Resource Baru (CRUD)',
    summary:
      'Langkah standar untuk membuat CRUD resource baru: generate file, tambah route, migrate, seed, serve.',
    content: [],
    bullets: [
      '1) node urus make:model NamaModel',
      '2) node urus make:controller NamaController',
      '3) node urus make:request StoreNamaRequest',
      '4) node urus make:migration create_namas_table',
      '5) node urus make:seeder NamaSeeder',
      '6) Tambahkan route di routes/api.js (opsional: .validate(StoreNamaRequest))',
      '7) node urus migrate',
      '8) node urus db:seed',
      '9) node urus serve',
    ],
    codeExamples: [],
    sourceFiles: ['panduan.txt'],
    keywords: ['crud', 'workflow', 'make:model', 'make:controller'],
  },
]
