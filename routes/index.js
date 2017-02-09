var requires = require('requirejs');

requires.config({
  nodeRequire: require
});

requires(['express'],
    function(express) {
        var router = express.Router();
        router.get('/', function(req, res, next) {
            res.render('index', { title: 'KerFlux - Online' });
        });
        module.exports = router;

    }
);
