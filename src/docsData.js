export const repoHighlights = [
  {
    label: 'Runtime',
    value: 'Node.js 20+',
    description: 'The repository package declares a Node.js >=20 engine and runs the framework through ESM entrypoints.',
  },
  {
    label: 'CLI',
    value: 'node urus',
    description: 'Framework commands are dispatched from the urus launcher into cli/urus.js.',
  },
  {
    label: 'Database',
    value: 'SQLite or MySQL',
    description: 'DatabaseManager supports better-sqlite3 for local storage and mysql2 for pooled MySQL connections.',
  },
  {
    label: 'Realtime',
    value: '/ws socket hub',
    description: 'A ws-based WebSocketHub attaches to the HTTP server and can broadcast queue or app events.',
  },
]

export const docsSections = [
  {
    id: 'introduction',
    eyebrow: 'Overview',
    title: 'Introduction',
    summary:
      'Backurus is a Laravel-inspired backend framework for Node.js that combines a lightweight HTTP server, expressive routing, an ORM-style model layer, migrations, validation, JWT authentication, queues, plugins, and generated docs endpoints.',
    content: [
      'The repository bootstraps the framework from bootstrap/app.js, where the config, container, event bus, queue manager, database manager, WebSocket hub, cache store, gate registry, scheduler, and storage manager are assembled into a single runtime.',
      'The example application inside the repository demonstrates REST endpoints for users and products, authentication with JWT, queue-backed welcome email dispatching, a logger plugin, static file serving, and a generated Swagger-style /docs route.',
    ],
    bullets: [
      'Main runtime entry: index.js spawns the register loader, imports bootstrap/app.js, creates the app, and starts the HTTP server.',
      'Dev workflow: package.json maps npm run dev to node urus serve, which watches app, config, routes, plugins, database, and core files.',
      'Built-in docs endpoint: core/swagger.js registers /docs.json and /docs from the router docs list.',
    ],
    codeExamples: [
      {
        title: 'Main runtime entry',
        language: 'javascript',
        code: `const { createApp } = await import('./bootstrap/app.js')
const app = await createApp()
await app.start()`,
      },
    ],
    sourceFiles: ['README.md', 'bootstrap/app.js', 'index.js', 'package.json'],
    keywords: ['overview', 'framework', 'bootstrap', 'websocket', 'docs'],
  },
  {
    id: 'installation',
    eyebrow: 'Setup',
    title: 'Installation',
    summary:
      'The README defines two installation paths: scaffold a new app with create-backurus-app, or run the checked-in repository scaffold directly with npm install and the urus commands.',
    content: [
      'The package scripts expose npm run dev for watched development and npm start for the production entry. The repo also ships package aliases for migrate, seed, serve, queue:work, and urus.',
      'Environment configuration is driven by dotenv across config/app.js, config/database.js, config/auth.js, config/queue.js, and config/storage.js, with extra CORS and rate-limit values synthesized in core/config.js.',
    ],
    bullets: [
      'Scaffold flow from README: npx create-backurus-app@latest, cd app-name, npm run dev.',
      'Repository flow from README: npm install, node urus migrate, node urus db:seed, npm run dev.',
      'Default local database: sqlite using storage/database.sqlite unless DB_CONNECTION switches to mysql.',
    ],
    codeExamples: [
      {
        title: 'README quickstart',
        language: 'bash',
        code: `npx create-backurus-app@latest
cd app-name
npm run dev`,
      },
      {
        title: 'Repository scaffold boot',
        language: 'bash',
        code: `npm install
node urus migrate
node urus db:seed
npm run dev`,
      },
    ],
    sourceFiles: ['README.md', 'package.json', 'config/database.js', 'core/config.js'],
    keywords: ['install', 'setup', 'quickstart', 'dotenv', 'scripts'],
  },
  {
    id: 'project-structure',
    eyebrow: 'Architecture',
    title: 'Project Structure',
    summary:
      'The repository follows an application-plus-framework layout: app and routes hold project code, config and database hold configuration and persistence assets, and core contains the reusable framework runtime.',
    content: [
      'The application layer lives under app/, including controllers, models, requests, middleware, jobs, events, listeners, modules, and policies. Routes are split into web.js, api.js, and console.js.',
      'The core layer contains the HTTP server, router, request parsing, response helpers, ORM model base class, database manager, migrator, seeder runner, auth middleware, queue manager, scheduler, plugin loader, cache, websocket, and gate utilities.',
    ],
    bullets: [
      'app/controllers: HTTP controllers such as UserController, ProductController, and AuthController.',
      'app/models: model classes extending core/model with table metadata and soft delete flags.',
      'app/requests: validation classes with rules() methods used by core/validator.',
      'database/migrations and database/seeders: migration modules and runnable seeders.',
      'plugins: auto-loaded plugin folders, each with its own index.js entrypoint.',
      'docs: the repository already includes a static docs site with EN and ID language files.',
    ],
    codeExamples: [
      {
        title: 'Repository tree',
        language: 'text',
        code: `app/
  controllers/
  events/
  jobs/
  listeners/
  middleware/
  models/
  modules/
  policies/
  requests/
bootstrap/
cli/
config/
core/
database/
  migrations/
  seeders/
docs/
plugins/
public/
routes/
storage/
urus`,
      },
    ],
    sourceFiles: ['app/', 'bootstrap/app.js', 'core/', 'database/', 'routes/', 'plugins/'],
    keywords: ['folders', 'structure', 'architecture', 'tree', 'directories'],
  },
  {
    id: 'cli-commands',
    eyebrow: 'CLI',
    title: 'CLI Commands',
    summary:
      'The Backurus CLI runs through the urus launcher, which reinvokes Node with --import backurus-register.mjs and then loads cli/urus.js. That file dispatches generators, migrations, queue workers, schedulers, config cache commands, storage linking, and the watched development server.',
    content: [
      'Generator commands are implemented directly in cli/urus.js through a templates() map. Each make:* command writes files into the expected framework directory with starter code for controllers, models, migrations, middleware, requests, jobs, events, seeders, policies, resources, and modules.',
      'Operational commands such as migrate, route:list, db:seed, queue:work, schedule:run, config:cache, config:clear, storage:link, and serve are also defined in cli/urus.js and use framework services like Migrator, Seeder, Router, QueueManager, and Scheduler.',
    ],
    bullets: [
      'serve uses chokidar to restart index.js when framework or app files change.',
      'route:list boots a Router instance, loads routes, registers docs routes, and prints METHOD URI ACTION NAME.',
      'make:module creates app/modules/<Name> with controllers, models, requests, services, and a module.js descriptor.',
    ],
    codeExamples: [
      {
        title: 'Common urus commands',
        language: 'bash',
        code: `node urus serve
node urus route:list
node urus migrate
node urus migrate:rollback
node urus migrate:status
node urus db:seed
node urus queue:work
node urus schedule:run
node urus config:cache
node urus storage:link`,
      },
      {
        title: 'CLI dispatch switch',
        language: 'javascript',
        code: `switch (command) {
  case 'make:model': return make('model', name)
  case 'make:controller': return make('controller', name)
  case 'serve': return startServe()
  case 'route:list': return routeList()
}`,
      },
    ],
    sourceFiles: ['urus', 'cli/urus.js', 'backurus-register.mjs'],
    keywords: ['urus', 'cli', 'commands', 'make:model', 'serve', 'route:list'],
  },
  {
    id: 'routing',
    eyebrow: 'HTTP',
    title: 'Routing',
    summary:
      'Backurus routing is implemented in core/router.js. It compiles colon-style route parameters into regular expressions, supports HTTP method helpers, route naming, route-specific middleware aliases, inline handlers, controller actions, and global middleware registered through router.use().',
    content: [
      'Controller actions are resolved from strings like UserController@index by importing app/controllers/UserController.js and binding either an instance method or a static class method.',
      'loadRoutes() imports every .js file in routes/ except console.js. In the example app, routes/api.js defines the API endpoints, while routes/web.js defines the home response.',
    ],
    bullets: [
      'Supported verbs: get, post, put, patch, delete.',
      'Route parameters use :param syntax and are exposed on req.params.',
      'middleware(name) attaches alias-based middleware, while additional handler functions can be passed directly into register calls.',
    ],
    codeExamples: [
      {
        title: 'Route definitions from routes/api.js',
        language: 'javascript',
        code: `Route.get('/users', 'UserController@index').name('users.index')
Route.get('/users/:id', 'UserController@show').name('users.show')
Route.delete('/users/:id', 'UserController@destroy', roleGuard('admin'))
  .middleware('auth')
  .name('users.destroy')`,
      },
      {
        title: 'Path compilation',
        language: 'javascript',
        code: `function compilePath(routePath) {
  const keys = []
  const pattern = routePath.replace(/:[^/]+/g, (segment) => {
    keys.push(segment.slice(1))
    return '([^/]+)'
  })
  return { regex: new RegExp(\`^\${pattern}$\`), keys }
}`,
      },
    ],
    sourceFiles: ['core/router.js', 'routes/api.js', 'routes/web.js'],
    keywords: ['routes', 'parameters', 'middleware', 'controller action', 'http methods'],
  },
  {
    id: 'controllers',
    eyebrow: 'Application',
    title: 'Controllers',
    summary:
      'Controllers live in app/controllers and can expose either static methods or instance methods. The example repository uses both patterns: UserController mostly uses static methods, while ProductController uses instance methods.',
    content: [
      'Controllers receive the parsed request and the ResponseFactory-enhanced response object. The response adds success, created, error, notFound, unauthorized, and paginated helpers.',
      'Because the router resolves controller strings dynamically, you can keep route files declarative and move request validation, model queries, auth behavior, and response formatting into controller methods.',
    ],
    bullets: [
      'UserController@index paginates with page and per_page query params.',
      'AuthController@register emits a UserRegistered event and returns a JWT token.',
      'ProductController normalizes numeric fields before writes and validates via StoreProductRequest.',
    ],
    codeExamples: [
      {
        title: 'UserController@index',
        language: 'javascript',
        code: `static async index(req, res) {
  const page = Number(req.query.page || 1)
  const perPage = Number(req.query.per_page || 10)
  const result = await User.query().orderBy('id', 'desc').paginate(page, perPage)
  return res.paginated(result.data, result.meta)
}`,
      },
      {
        title: 'Response helpers',
        language: 'javascript',
        code: `res.success(data, message)
res.created(data, message)
res.error(message, statusCode, errors)
res.notFound(message)
res.unauthorized(message)
res.paginated(items, meta)`,
      },
    ],
    sourceFiles: ['app/controllers/UserController.js', 'app/controllers/ProductController.js', 'app/controllers/AuthController.js', 'core/response.js'],
    keywords: ['controllers', 'response', 'paginated', 'usercontroller', 'authcontroller'],
  },
  {
    id: 'models',
    eyebrow: 'ORM',
    title: 'Models (ORM)',
    summary:
      'Backurus models extend the Model base class in core/model.js. A model declares static metadata such as table, primaryKey, timestamps, and softDeletes, then inherits query and persistence helpers.',
    content: [
      'The base class provides all, find, create, update, delete, query, with, where, orderBy, limit, and paginate. It also serializes object values as JSON and automatically manages created_at and updated_at when timestamps is enabled.',
      'The example repository defines User and Product with static table names and softDeletes enabled. Deleting those models updates deleted_at instead of physically removing the record.',
    ],
    bullets: [
      'Default primary key: id.',
      'Default timestamps: true.',
      'Soft deletes are opt-in through static softDeletes = true.',
    ],
    codeExamples: [
      {
        title: 'User model',
        language: 'javascript',
        code: `import Model from '../../core/model'

export default class User extends Model {
  static table = 'users'
  static softDeletes = true
}`,
      },
      {
        title: 'Common model calls',
        language: 'javascript',
        code: `const users = await User.all()
const user = await User.find(1)
const created = await User.create({ name: 'Rakha' })
const updated = await User.update(1, { name: 'Updated' })
await User.delete(1)`,
      },
    ],
    sourceFiles: ['core/model.js', 'app/models/User.js', 'app/models/Product.js'],
    keywords: ['model', 'orm', 'all', 'find', 'create', 'softDeletes'],
  },
  {
    id: 'query-builder',
    eyebrow: 'ORM',
    title: 'Query Builder',
    summary:
      'The QueryBuilder inside core/model.js supports chained where conditions, eager relation loading, ordering, limits, offsets, first, get, and paginate.',
    content: [
      'where accepts either where(column, value) or where(column, operator, value). orderBy stores a SQL ORDER BY clause, while paginate calculates LIMIT and OFFSET and also returns meta.total, perPage, currentPage, and lastPage.',
      'If a model enables softDeletes, buildWhere automatically adds deleted_at IS NULL to generated queries.',
    ],
    bullets: [
      'get returns an array of records and can hydrate relations through with(...).',
      'first returns a single record or null.',
      'paginate(page, perPage) returns { data, meta } and is used by UserController@index.',
    ],
    codeExamples: [
      {
        title: 'Repository and README query examples',
        language: 'javascript',
        code: `await User.where('age', '>', 18).get()
await User.where('email', 'rakha@email.com').first()
await User.orderBy('created_at', 'desc').limit(10).get()
await User.paginate(1, 10)
await User.with('posts').find(1)`,
      },
      {
        title: 'Paginate implementation',
        language: 'javascript',
        code: `const offset = (safePage - 1) * safePerPage
const items = await this.model.db().all(
  \`SELECT * FROM \${this.model.table}\${sql}\${this.orderByClause} LIMIT \${safePerPage} OFFSET \${offset}\`,
  params
)
const countRow = await this.model.db().get(
  \`SELECT COUNT(*) as total FROM \${this.model.table}\${sql}\`,
  params
)`,
      },
    ],
    sourceFiles: ['core/model.js', 'README.md', 'app/controllers/UserController.js'],
    keywords: ['query builder', 'where', 'orderBy', 'paginate', 'first', 'get'],
  },
  {
    id: 'relationships',
    eyebrow: 'ORM',
    title: 'Relationships',
    summary:
      'The Model base class includes hasMany, hasOne, belongsTo, and belongsToMany relation helpers plus a loadRelations hydrator. The sample application models do not define concrete relations yet, but the framework API is present and usable.',
    content: [
      'with(...relations) stores relation names on the query builder. After records load, Model.loadRelations resolves each relation by calling the relation method on the model class and fetching related rows using the relation metadata.',
      'belongsToMany performs a pivot-table join against the related model table using the configured pivot and key columns.',
    ],
    bullets: [
      'This section describes implemented framework capability from core/model.js.',
      'The repository does not currently ship a concrete model relation method like posts() or user(), so the example below is API-shaped rather than copied from app/models.',
    ],
    codeExamples: [
      {
        title: 'Supported relation helpers',
        language: 'javascript',
        code: `static hasMany(RelatedModel, foreignKey, localKey = this.primaryKey)
static hasOne(RelatedModel, foreignKey, localKey = this.primaryKey)
static belongsTo(RelatedModel, foreignKey, ownerKey = RelatedModel.primaryKey)
static belongsToMany(RelatedModel, pivotTable, foreignPivotKey, relatedPivotKey)`,
      },
      {
        title: 'Example relation usage based on the framework API',
        language: 'javascript',
        code: `export default class User extends Model {
  static table = 'users'

  static posts() {
    return this.hasMany(Post, 'user_id')
  }
}

const users = await User.with('posts').get()`,
        note: 'The relation helpers are implemented in core/model.js; this particular model example is illustrative because the checked-in sample app models do not define relations yet.',
      },
    ],
    sourceFiles: ['core/model.js'],
    keywords: ['relationships', 'hasMany', 'belongsTo', 'belongsToMany', 'with'],
  },
  {
    id: 'migrations',
    eyebrow: 'Database',
    title: 'Migrations',
    summary:
      'Backurus migrations are JavaScript modules in database/migrations. The Migrator reads migration filenames from the configured migrations directory, tracks applied migrations in a migrations table, runs up/down methods, and groups runs into batches.',
    content: [
      'migrate applies all unapplied files in sorted order and records batch metadata. rollback finds the last batch and runs the down methods in reverse order. reset keeps rolling back until no applied migrations remain.',
      'The repository demonstrates two migration styles: a compatibility createTable helper for users and the more expressive schema.create callback for products.',
    ],
    bullets: [
      'Configured migration directory: config.database.migrations, defaulting to database/migrations.',
      'Migration metadata table is created automatically by DatabaseManager.ensureMigrationsTable().',
      'migrate:fresh in the CLI is implemented by reset followed by migrate.',
    ],
    codeExamples: [
      {
        title: 'Schema-style migration',
        language: 'javascript',
        code: `export default {
  async up(schema) {
    await schema.create('products', (table) => {
      table.id()
      table.string('name')
      table.text('description').nullable()
      table.decimal('price', 12, 2)
      table.integer('stock').default(0)
      table.timestamp('deleted_at').nullable()
      table.timestamps()
    })
  }
}`,
      },
      {
        title: 'Migrator core flow',
        language: 'javascript',
        code: `const files = await this.files()
const applied = new Set((await this.applied()).map((item) => item.name))
const batch = (appliedItems.at(-1)?.batch || 0) + 1

for (const file of files) {
  if (applied.has(file)) continue
  const mod = await import(pathToFileURL(path.join(this.migrationsDir, file)).href)
  await mod.default.up(this.db.schema)
  await this.db.run('INSERT INTO migrations (name, batch, created_at) VALUES (?, ?, ?)', [file, batch, this.db.formatDate()])
}`,
      },
    ],
    sourceFiles: ['core/migrator.js', 'core/database.js', 'database/migrations/20260310000000_create_users_table.js', 'database/migrations/20260310010000_create_products_table.js'],
    keywords: ['migrations', 'batch', 'rollback', 'reset', 'schema', 'createTable'],
  },
  {
    id: 'schema-builder',
    eyebrow: 'Database',
    title: 'Schema Builder',
    summary:
      'The schema builder is implemented inside core/database.js. TableBlueprint exposes Laravel-like column helpers, while ColumnDefinition supports a set of column modifiers and optional foreign-key references.',
    content: [
      'Supported column types include id, string, text, integer, bigInteger, boolean, date, datetime, timestamp, enum, json, float, double, decimal, and foreignId. timestamps() adds nullable created_at and updated_at columns.',
      'Supported modifiers are nullable(), default(value), unique(), index(), unsigned(), and constrained(table, column). compileColumn() translates those definitions to either SQLite or MySQL SQL.',
    ],
    bullets: [
      'SQLite uses TEXT for string and timestamp-like columns where appropriate.',
      'Index creation is emitted after table creation for columns marked with index().',
      'foreignId creates the column type, and constrained() appends REFERENCES table(column).',
    ],
    codeExamples: [
      {
        title: 'Schema builder API',
        language: 'javascript',
        code: `table.id()
table.string('name')
table.text('description').nullable()
table.integer('stock').default(0)
table.enum('role', ['admin', 'user']).default('user')
table.foreignId('user_id').constrained('users')
table.timestamps()`,
      },
      {
        title: 'Column modifiers',
        language: 'javascript',
        code: `nullable()
default(value)
unique()
index()
unsigned()
constrained(table, column = 'id')`,
      },
    ],
    sourceFiles: ['core/database.js', 'README.md'],
    keywords: ['schema builder', 'table.id', 'table.string', 'nullable', 'default', 'index'],
  },
  {
    id: 'seeders',
    eyebrow: 'Database',
    title: 'Seeders',
    summary:
      'Seeders are plain modules in database/seeders that export a default object with an async run() method. The Seeder class loads and runs them in filename order, or runs a single named seeder when a CLI argument is provided.',
    content: [
      'The repository includes UserSeeder and ProductSeeder. UserSeeder ensures an admin user exists and hashes the default password with bcrypt. ProductSeeder inserts a small product catalog if the product names are missing.',
      'CLI usage is node urus db:seed or node urus db:seed SeederName, where SeederName maps to <SeederName>.js in the seeders directory.',
    ],
    bullets: [
      'Seeded files are logged as Seeded: <filename>.',
      'Seeders receive the application container when run through core/seeder.js.',
      'Seeders often use model queries to stay idempotent.',
    ],
    codeExamples: [
      {
        title: 'ProductSeeder',
        language: 'javascript',
        code: `export default {
  async run() {
    for (const item of products) {
      const existing = await Product.query().where('name', item.name).first()
      if (!existing) {
        await Product.create(item)
      }
    }
  }
}`,
      },
    ],
    sourceFiles: ['core/seeder.js', 'database/seeders/UserSeeder.js', 'database/seeders/ProductSeeder.js'],
    keywords: ['seeders', 'db:seed', 'UserSeeder', 'ProductSeeder'],
  },
  {
    id: 'validation',
    eyebrow: 'Requests',
    title: 'Validation',
    summary:
      'Validation is implemented in core/validator.js and driven by request classes under app/requests. A request class exposes rules(), and validate(req, RequestClass) applies those rules against req.body.',
    content: [
      'The built-in rule parser supports required, min:<length>, max:<length>, and email. Validation errors are accumulated per field, then thrown as an Error with statusCode 422 and an errors payload.',
      'Controllers call validate(req, StoreUserRequest) or validate(req, StoreProductRequest) before creating or updating models.',
    ],
    bullets: [
      'StoreUserRequest validates name, email, and password.',
      'StoreProductRequest validates name, price, and stock.',
      'Validation failures are returned by the server error handler through res.error(message, statusCode, errors).',
    ],
    codeExamples: [
      {
        title: 'StoreUserRequest',
        language: 'javascript',
        code: `export default class StoreUserRequest {
  rules() {
    return {
      name: 'required|min:3',
      email: 'required|email',
      password: 'required|min:6'
    }
  }
}`,
      },
      {
        title: 'Validator usage',
        language: 'javascript',
        code: `const data = await validate(req, StoreUserRequest)
const user = await User.create(data)
return res.created(user)`,
      },
    ],
    sourceFiles: ['core/validator.js', 'app/requests/StoreUserRequest.js', 'app/requests/StoreProductRequest.js'],
    keywords: ['validation', 'request classes', 'rules', 'required', 'email'],
  },
  {
    id: 'authentication',
    eyebrow: 'Security',
    title: 'Authentication',
    summary:
      'Authentication uses JWTs through core/auth.js and AuthController. Tokens are signed with config.auth.jwtSecret and a fixed 7d expiry, then verified by the auth middleware from the Authorization header.',
    content: [
      'AuthController@register creates a user, emits UserRegistered, signs a token containing id, email, and role, and returns both the user and token. AuthController@login performs the same token generation after checking the stored bcrypt password hash.',
      'bootstrap/app.js registers the auth alias with server.router.aliasMiddleware(\'auth\', authMiddleware(container)). Routes can then opt into authentication with .middleware(\'auth\').',
    ],
    bullets: [
      'Authorization header format: Bearer <token>.',
      'roleGuard(...roles) is a second middleware helper that rejects requests whose req.user.role is not allowed.',
      'JWT secret source: config/auth.js via process.env.JWT_SECRET.',
    ],
    codeExamples: [
      {
        title: 'Auth routes',
        language: 'javascript',
        code: `Route.post('/login', 'AuthController@login').name('auth.login')
Route.post('/register', 'AuthController@register').name('auth.register')
Route.get('/profile', 'UserController@profile').middleware('auth').name('users.profile')`,
      },
      {
        title: 'authMiddleware',
        language: 'javascript',
        code: `return async (req, res, next) => {
  const authHeader = req.headers.authorization
  if (!authHeader?.startsWith('Bearer ')) return res.unauthorized('Missing bearer token')
  try {
    req.user = jwt.verify(authHeader.slice(7), config.auth.jwtSecret)
    return next()
  } catch {
    return res.unauthorized('Invalid token')
  }
}`,
      },
    ],
    sourceFiles: ['core/auth.js', 'app/controllers/AuthController.js', 'bootstrap/app.js', 'config/auth.js', 'routes/api.js'],
    keywords: ['jwt', 'auth', 'login', 'register', 'Bearer', 'roleGuard'],
  },
  {
    id: 'middleware',
    eyebrow: 'Pipeline',
    title: 'Middleware',
    summary:
      'Backurus supports both global middleware and route-level middleware. Global middleware is attached with router.use(), while named aliases are registered with aliasMiddleware() and attached per route through .middleware(name). You can also pass inline middleware handlers directly to route definitions.',
    content: [
      'The server constructor already applies a built-in rate limiter using router.use(createRateLimiter(config.rateLimit)). The logger plugin adds another global middleware layer by calling server.router.use() inside plugins/logger-plugin/index.js.',
      'In routes/api.js, the delete users route combines both styles: it passes roleGuard(\'admin\') inline and also chains .middleware(\'auth\') to enforce JWT authentication.',
    ],
    bullets: [
      'Named auth middleware is registered in bootstrap/app.js.',
      'Middleware handlers use the async (req, res, next) => {} signature.',
      'The router merges global middleware, alias middleware, extra route handlers, and the final action into one execution stack.',
    ],
    codeExamples: [
      {
        title: 'Logger plugin middleware',
        language: 'javascript',
        code: `server.router.use(async (req, res, next) => {
  const startedAt = Date.now()
  res.on('finish', () => {
    console.log(\`\${req.method} \${req.url} \${res.statusCode} \${Date.now() - startedAt}ms\`)
  })
  return next()
})`,
      },
      {
        title: 'Protected route with inline role guard',
        language: 'javascript',
        code: `Route.delete('/users/:id', 'UserController@destroy', roleGuard('admin'))
  .middleware('auth')
  .name('users.destroy')`,
      },
    ],
    sourceFiles: ['core/router.js', 'bootstrap/app.js', 'plugins/logger-plugin/index.js', 'routes/api.js'],
    keywords: ['middleware', 'auth alias', 'router.use', 'roleGuard', 'logger plugin'],
  },
  {
    id: 'api-resources',
    eyebrow: 'Serialization',
    title: 'API Resources',
    summary:
      'API resources are lightweight wrappers around payload shaping. core/resource.js defines the Resource base class with toJSON() and resolve(), and the CLI can scaffold resource classes with make:resource.',
    content: [
      'The repository includes plugins/resources/ProductResource.js as a simple example that returns the wrapped resource unchanged. The generated resource template imports Resource from ../../core/resource and expects you to override toJSON() for custom output.',
      'Because resources are plain classes, they can be used anywhere a controller wants explicit response shaping before calling res.success() or res.created().',
    ],
    bullets: [
      'Resource.resolve() simply returns toJSON().',
      'The sample ProductResource is identity-shaped and demonstrates the extension point.',
    ],
    codeExamples: [
      {
        title: 'ProductResource',
        language: 'javascript',
        code: `import { Resource } from '../../core/resource'

export default class ProductResource extends Resource {
  toJSON() {
    return this.resource
  }
}`,
      },
    ],
    sourceFiles: ['core/resource.js', 'plugins/resources/ProductResource.js', 'cli/urus.js'],
    keywords: ['resource', 'serialization', 'make:resource', 'toJSON'],
  },
  {
    id: 'policies',
    eyebrow: 'Authorization',
    title: 'Policies',
    summary:
      'The repository includes a simple policy class and a GateRegistry implementation, but policy loading is still manual. That means policy-style authorization is supported as a framework primitive rather than as a fully auto-wired convention in this codebase.',
    content: [
      'GateRegistry provides define(name, callback), allows(name, ...args), and authorize(name, ...args). authorize() throws a 403 error when the ability returns false.',
      'The sample app contains app/policies/ProductPolicy.js with an update(user, model) rule, and the CLI can scaffold new policy classes with node urus make:policy Name.',
    ],
    bullets: [
      'A gate registry singleton is registered in bootstrap/app.js as gate.',
      'The repository does not currently auto-import policy files or connect ProductPolicy into the gate registry.',
      'For now, wire abilities explicitly through container.make(\'gate\').define(...) or use route middleware such as roleGuard where appropriate.',
    ],
    codeExamples: [
      {
        title: 'ProductPolicy',
        language: 'javascript',
        code: `export default class ProductPolicy {
  update(user, model) {
    return user.id === model.user_id
  }
}`,
      },
      {
        title: 'GateRegistry API',
        language: 'javascript',
        code: `gate.define('update-product', (user, product) => user.id === product.user_id)
await gate.allows('update-product', user, product)
await gate.authorize('update-product', user, product)`,
        note: 'This usage is based on the implemented GateRegistry methods in core/gate.js; the sample repo does not currently wire ProductPolicy automatically.',
      },
    ],
    sourceFiles: ['core/gate.js', 'app/policies/ProductPolicy.js', 'bootstrap/app.js', 'cli/urus.js'],
    keywords: ['policy', 'gate', 'authorize', 'allows', 'make:policy'],
  },
  {
    id: 'queue-system',
    eyebrow: 'Async',
    title: 'Queue System',
    summary:
      'The queue runtime is implemented in core/queue.js. It supports an in-memory sync mode and a Redis-backed mode powered by ioredis, with job handlers registered on the QueueManager.',
    content: [
      'dispatch(job) converts a class instance into a payload of { name, data }. In redis mode, it lpushes onto the jobs list and queue:work blocks on brpop. In sync mode, dispatch immediately processes the payload using the registered job handler map.',
      'The sample app wires a SendEmailJob handler in bootstrap/app.js. User registration emits UserRegistered, the listener imports SendEmailJob, and the queue then broadcasts a websocket notification when the job is handled.',
    ],
    bullets: [
      'Queue backend source: config/queue.js using QUEUE_CONNECTION, REDIS_HOST, and REDIS_PORT.',
      'queue:restart writes storage/framework/cache/queue-restart.json as a restart signal file.',
      'dispatchLater(job, delayMs) uses setTimeout around dispatch().',
    ],
    codeExamples: [
      {
        title: 'Queue registration and event listener',
        language: 'javascript',
        code: `events.listen(UserRegistered.name, SendWelcomeEmail)
queue.register('SendEmailJob', async (job, runtimeContainer) => {
  runtimeContainer.make('ws').emit('notification', {
    message: \`Queued welcome email for \${job.user.email}\`
  })
})`,
      },
      {
        title: 'Queue worker usage',
        language: 'bash',
        code: `node urus queue:work
node urus queue:restart`,
      },
    ],
    sourceFiles: ['core/queue.js', 'bootstrap/app.js', 'app/listeners/SendWelcomeEmail.js', 'app/jobs/SendEmailJob.js', 'config/queue.js'],
    keywords: ['queue', 'redis', 'dispatch', 'queue:work', 'SendEmailJob'],
  },
  {
    id: 'scheduler',
    eyebrow: 'Automation',
    title: 'Scheduler',
    summary:
      'Scheduling is handled by core/scheduler.js and routes/console.js. The Scheduler stores command entries, exposes fluent frequency helpers, and runs scheduled commands by spawning node urus <command> unless a direct handler function is supplied.',
    content: [
      'loadSchedule() checks for routes/console.js and imports it if present. That file receives the scheduler instance and can register command strings with daily(), hourly(), or everyMinute().',
      'The repository sample schedules route:list daily, which is a simple proof that the scheduler can execute Backurus CLI commands from code.',
    ],
    bullets: [
      'Manual scheduler entrypoint: node urus schedule:run.',
      'Frequencies stored in code are labels such as daily, hourly, and everyMinute rather than cron expressions.',
      'Scheduler.list() returns the in-memory entry array for inspection.',
    ],
    codeExamples: [
      {
        title: 'routes/console.js',
        language: 'javascript',
        code: `export default async function schedule(Schedule) {
  Schedule.command('route:list').daily()
}`,
      },
      {
        title: 'Scheduler API',
        language: 'javascript',
        code: `Schedule.command('queue:work').hourly()
Schedule.command('route:list').daily()
Schedule.command('custom', async () => {
  // custom logic
}).everyMinute()`,
        note: 'The fluent API and handler signature are from core/scheduler.js. The repository sample only registers route:list daily.',
      },
    ],
    sourceFiles: ['core/scheduler.js', 'routes/console.js', 'cli/urus.js'],
    keywords: ['scheduler', 'schedule:run', 'routes/console.js', 'daily', 'hourly'],
  },
  {
    id: 'plugins',
    eyebrow: 'Extensibility',
    title: 'Plugins',
    summary:
      'Plugins are auto-loaded from subdirectories inside plugins/. core/plugin.js scans each folder for index.js and invokes the default export with the runtime context containing container, config, events, queue, server, and ws.',
    content: [
      'Plugin loading happens during createApp() before routes are registered. This means plugins can add global middleware, register listeners, or otherwise modify the server and framework services early in boot.',
      'The repository ships logger-plugin, which attaches request timing logs to the router, and also includes a resources folder with ProductResource that shows how repository extensions can sit beside the plugin system.',
    ],
    bullets: [
      'Missing or incomplete plugins are ignored during development to reduce boot friction.',
      'Plugin entrypoint contract: export default async function plugin(context) {}.',
    ],
    codeExamples: [
      {
        title: 'Plugin loader',
        language: 'javascript',
        code: `const entries = await fs.readdir(pluginsDir, { withFileTypes: true }).catch(() => [])
for (const entry of entries) {
  if (!entry.isDirectory()) continue
  const pluginFile = path.join(pluginsDir, entry.name, 'index.js')
  const mod = await import(pathToFileURL(pluginFile).href)
  if (typeof mod.default === 'function') {
    await mod.default(context)
  }
}`,
      },
    ],
    sourceFiles: ['core/plugin.js', 'plugins/logger-plugin/index.js', 'bootstrap/app.js'],
    keywords: ['plugins', 'logger plugin', 'loadPlugins', 'extensibility'],
  },
  {
    id: 'configuration',
    eyebrow: 'Config',
    title: 'Configuration',
    summary:
      'Configuration is aggregated by core/config.js from the app, auth, database, queue, and storage config modules, then extended with CORS and rate limit objects derived from environment variables.',
    content: [
      'config:cache writes the fully resolved configuration object to storage/framework/cache/config.json. On later boots, loadConfig() uses that cached file if it exists and can be parsed.',
      'The runtime also exposes a config(key, fallback) helper in core/config.js that reads from appConfig after bootstrap sets the runtime config.',
    ],
    bullets: [
      'config/app.js: app name, port, env, and URL.',
      'config/database.js: default connection, sqlite filename, mysql credentials, migrations path, seeders path.',
      'config/auth.js, config/queue.js, and config/storage.js wire JWT, Redis/sync queues, and filesystem disks.',
    ],
    codeExamples: [
      {
        title: 'Key environment variables',
        language: 'env',
        code: `APP_NAME=Backurus
APP_PORT=3000
APP_ENV=development
APP_URL=http://127.0.0.1:3000
DB_CONNECTION=sqlite
DB_DATABASE=storage/database.sqlite
JWT_SECRET=supersecretkey
QUEUE_CONNECTION=sync
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
FILESYSTEM_DISK=local`,
      },
      {
        title: 'config:cache and config:clear',
        language: 'bash',
        code: `node urus config:cache
node urus config:clear`,
      },
    ],
    sourceFiles: ['core/config.js', 'config/app.js', 'config/database.js', 'config/auth.js', 'config/queue.js', 'config/storage.js', 'cli/urus.js'],
    keywords: ['config', 'env', 'app port', 'database', 'jwt', 'queue', 'storage'],
  },
  {
    id: 'cors-configuration',
    eyebrow: 'HTTP',
    title: 'CORS Configuration',
    summary:
      'Backurus applies CORS headers directly in core/server.js before route matching. The settings come from core/config.js, which reads dedicated CORS_* environment variables and resolves them into a config.cors object.',
    content: [
      'applyCorsHeaders() computes the allowed origin from a comma-separated whitelist, reflects the request origin when credentials are enabled, and sets allow-methods, allow-headers, expose-headers, and max-age headers.',
      'OPTIONS requests are handled centrally by the server and return HTTP 204 once the CORS headers are applied.',
    ],
    bullets: [
      'CORS_ORIGIN supports comma-separated origins.',
      'CORS_CREDENTIALS accepts truthy string values like 1, true, or yes.',
      'If Access-Control-Request-Headers is present on the request, the server echoes it back in Access-Control-Allow-Headers.',
    ],
    codeExamples: [
      {
        title: 'CORS environment variables',
        language: 'env',
        code: `CORS_ORIGIN=http://localhost:5173,http://127.0.0.1:5173
CORS_METHODS=GET,POST,PUT,PATCH,DELETE,OPTIONS
CORS_HEADERS=Content-Type, Authorization, X-Requested-With
CORS_EXPOSE_HEADERS=
CORS_MAX_AGE=86400
CORS_CREDENTIALS=false`,
      },
      {
        title: 'OPTIONS handling',
        language: 'javascript',
        code: `applyCorsHeaders(req, res, this.config.cors)

if (req.method === 'OPTIONS') {
  res.statusCode = 204
  res.end()
  return
}`,
      },
    ],
    sourceFiles: ['core/server.js', 'core/config.js', 'README.md'],
    keywords: ['cors', 'Access-Control-Allow-Origin', 'OPTIONS', 'CORS_ORIGIN'],
  },
  {
    id: 'deployment',
    eyebrow: 'Operations',
    title: 'Deployment',
    summary:
      'The repository does not include a dedicated deployment module, but the production path is clear from package.json, index.js, config files, and the runtime architecture: install dependencies, provide environment variables, run migrations, optionally seed, and start the Node server with npm start or node index.js.',
    content: [
      'For SQLite deployments, ensure the storage directory is writable and the database file path exists or can be created by the process. For MySQL deployments, set DB_CONNECTION=mysql and provide host, port, username, password, and database values.',
      'If the application uses public disk URLs, run node urus storage:link to create public/storage -> storage/app/public. If the queue backend is redis, run a separate queue worker process with node urus queue:work. The scheduler can be invoked by a cron-style external runner that calls node urus schedule:run on your desired cadence.',
    ],
    bullets: [
      'Production start command: npm start or node index.js.',
      'Required baseline env: APP_PORT, DB settings, JWT_SECRET, and any queue/storage/cors overrides.',
      'Node engine in package.json: >=20.',
    ],
    codeExamples: [
      {
        title: 'Suggested production bootstrap',
        language: 'bash',
        code: `npm install
node urus migrate
node urus storage:link
npm start`,
        note: 'If you use Redis-backed queues, run node urus queue:work in a separate worker process. If you use seed data in production-like environments, run node urus db:seed intentionally rather than by default.',
      },
    ],
    sourceFiles: ['package.json', 'index.js', 'config/*.js', 'cli/urus.js', 'core/server.js'],
    keywords: ['deployment', 'production', 'npm start', 'storage:link', 'queue worker'],
  },
]
