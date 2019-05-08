const shelljs = require('shelljs');
const fs = require('fs');
const async = require('async');
const log4js = require('log4js');
const colors = require('colors')

log4js.configure({
    appenders: { fileFetch: { type: "file", filename: "fileFetch.log"}},
    categories: {default: { appenders: ['fileFetch'], level: 'info'}}
})
const logger = log4js.getLogger('fileFetch');

//override by "Async" module
const CONFIG_FILE = "filesConfig.json"

const fileFetch = () => {async.waterfall([
    function readConfig(callback) {
        fs.readFile(CONFIG_FILE, 'utf8', (err, filesConfig) => {
            callback(err, filesConfig);
        })
    },
    function str2Json(filesConfig, callback) {
        callback(null, JSON.parse(filesConfig));
    },
    function fileEach(filesConfig, callback) {
        let rootPath = filesConfig.rootPath;
        let destFloder = filesConfig.destFloder;
        
        filesConfig.filePath.map( (filePath) => {
            logger.info(`current floder is ${rootPath + '/'+ filePath.floder}`);
            var floder = filePath.floder;
            var file = filePath.file;
            if(floder == undefined){
                console.log(`rootPath ${rootPath} don't have such ${floder}`.red);
                logger.error(`rootPath ${rootPath} don't have such ${floder}`);
            }else{
                file.map((file) => {
                   try {
                        shelljs.cp(`${rootPath}/${floder}/${file}`, `${destFloder}\ `);
                        logger.info(`cp file ${file} to ${destFloder}`);
                   } catch (error) {
                        logger.error(err.stack);
                   }
                });   
            }
        });
        console.log('fetch files success!');
        callback();
    }
], function callback(err, data) {
    if(err) logger.error(err);
});};

//mkdir diff floder
const fileFetchDiff = (custom) => {
    async.waterfall([
        function readConfig(callback) {
            fs.readFile(CONFIG_FILE, 'utf8', (err, filesConfig) => {
                callback(err, JSON.parse(filesConfig));
            })
        }, function mkdirDepth(filesConfig, callback) {
            let diffFilePath = custom || [];
            let ConfigFilePath = filesConfig.filePath;
            let destFloder = filesConfig.destFloder;
            const before =  destFloder + "/" +"before/src/";
            const after = destFloder + "/" + "after/src/";
            if(ConfigFilePath && !custom) {
                ConfigFilePath.map( floderName => {
                    var tempBefore = before + floderName.floder;
                    var tempAfter = after + floderName.floder;
                    logger.info('before floder structure:' + tempBefore);
                    logger.info('after floder structure:' + tempAfter);
                    diffFilePath.push(tempBefore, tempAfter);
                })
            }
            callback(null, diffFilePath, filesConfig);
        }, function mkdir(diffFilePath, filesConfig, callback) {
            shelljs.mkdir('-p', diffFilePath);
            callback(null, diffFilePath, filesConfig)
        }, function fileFetch(diffFilePath, filesConfig, callback) {
            const origin = filesConfig.rootPath;
            diffFilePath.map( filePath => {
                var filePathSplit = filePath.split('/');
                var destFloder = filePathSplit[filePathSplit.length - 1]; 
                filesConfig.filePath.map( fileObj => {
                    if(fileObj.floder == destFloder) {
                        try {
                            fileObj.file.map( file => {
                                shelljs.cp(`${origin}/${destFloder}/${file}`, `${filePath}\ `);
                                logger.info(`cp ${origin}/${destFloder}/${file} to ${filePath}`);
                            })
                        } catch (error) {
                            logger.error(error);
                        }
                    }
                })
            })

            console.log('fetch files diff success!');
        }
    ], (err, data) => {
        if(err) throw err;

        console.log(data);
    })
}

const fileFetchAPI = {
    fileFetch : fileFetch,
    fileFetchDiff : fileFetchDiff
}
exports = module.exports= fileFetchAPI;





