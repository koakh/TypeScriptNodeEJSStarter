"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const axios_1 = __importDefault(require("axios"));
const body_parser_1 = __importDefault(require("body-parser"));
// const viewsDirPath = path.join(__dirname, 'templates', 'views');
const app = express_1.default()
    .use(body_parser_1.default.urlencoded({ extended: false }))
    .set('view engine', 'ejs')
    // .set('views', viewsDirPath)
    .use(express_1.default.static(path_1.default.join(__dirname, '..', '/public')));
app.get('/', (req, res) => {
    // index refers to index.ejs
    res.render('index');
});
app.post('/login', (req, res) => {
    const { name, password } = req.body;
    if (name === 'admin' && password === 'admin') {
        res.render('success', {
            // passing as an object in second argument to the render method so it will be available inside that template
            username: name,
        });
    }
    else {
        res.render('failure');
    }
});
app.get('/repos', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.query.username || 'koakh';
    try {
        const result = yield axios_1.default.get(`https://api.github.com/users/${username}/repos`);
        const repos = result.data.map((repo) => ({
            name: repo.name,
            url: repo.html_url,
            description: repo.description,
        }));
        res.render('repos', {
            repos
        });
    }
    catch (error) {
        console.log(error);
        res.status(400).send('Error while getting list of repositories');
    }
}));
app.listen(3000, () => {
    console.log('server started on port http://localhost:3000');
});
//# sourceMappingURL=app.js.map