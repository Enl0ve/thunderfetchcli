#!/usr/bin/env node 
//important,标记为node运行环境

const program = require('commander');
const shelljs = require('shelljs');
const path = require('path');
const fs = require('fs');

const fileFetchApi = require('./src/fileFetchAPI');
const fileFetch = fileFetchApi.fileFetch;
const fileFetchDiff = fileFetchApi.fileFetchDiff;

const VERSION = "1.3.3";

/**
 * show version
 */
program
    .version(`${VERSION}`, '-v, --version')

/**
 * set filesConfig.json
 * note: @param __dirname current floder directionary, e.g, E:\repository_enlove\firstCli
 *              __filename current file directionary, e.g, E:\repository_enlove\firstCli\index.js
 * 
 * change: 
 * 1. @changeLog:abstract the process of setting filsConfig to funciton abstractSetConfig
 *    @function: abstractSetConfig:void
 *    @param: dirName:string, required.  description: the file path to set
 *            pathType:string, required. desctiption: rootPath || destPath
 *    @description: set files config
 *    @date: 2019年5月5日14点21分
 */
const abstractSetConfig = (dirName, pathType) => {
    /**
     * to avoid the name of file has some invalid character, such as banksapce .etc.
     */
    if( process.argv.length > 5) {
        console.log("floder name contain invalid character!");
    }

    fs.readFile('filesConfig.json', { encoding: 'utf8'}, (err, data) => {
        if(err) {
            throw err;
        }

        /**
         * typeOf data is string, need to transform to json object
         */
        let config = JSON.parse(data);

        if(config.hasOwnProperty(pathType)) {
            config[pathType] = dirName;
            fs.writeFile('filesConfig.json', JSON.stringify(config), (err) => {
                if(err) {
                    throw err;
                }
            });
        }else {
            console.log('config file miss something, please init again!')
        }
    });
}

program
    .command("config")
    .alias('c')
    .description("set the origin of Config file")
    .usage("thunder config <options> val")
    .option("-o --origin <dirName>", "set the origin dir", (dirName) => {
        abstractSetConfig(dirName, "rootPath");
    })
    .option("-d --dest <dirNamer>", "set the dest dir", (dirName) => {
        abstractSetConfig(dirName, "destFloder");
    })
    .action( () => {
        let argv = process.argv;
        if(argv[2] == "config" && argv[2] == "c" && argv.length == 3) {
            shelljs.exec("thunder config --help");
        }
    });

/**
 * @description: show log, just fun
 */
program
    .command('logo')
    .description('show simple log(just fun)')
    .action( () => {
        console.log('  ________  __   __  __   __  ___  _  ____     _____  ___  ');
        console.log(' /__  ___/ / /__/ / / /  / / /   |/ / / __ \\  / ___/ / _ \\ ');
        console.log('   / /    /  __  / / /__/ / / /| | / / /_/ / / /=== / _ _/ ');
        console.log(`  /_/    /__/ /_/ /_____ / /_/ |__/ /_____/ /____/ /_/ \\_\\ © VERSION ${VERSION}`);
    });

/**
 * fetch file from origin, and put them into dest Accroding filesConfig
 */
program
    .command("fileFetch")
    .option("-a --all", "get all files", () => {
        fileFetch();
    })
    .option("-d --diff", "fetch files to diff floder", () => {
        fileFetchDiff();
    })
    .option("-p --part <floder>", "get part file according args <floder>")
    .description("get files, with options provided to select")
    .usage("thunder fileFetch [options] [floder]")
    .action( () => {
        
    });

/**
 * ES6 generator syntax to iterator
 */
function* _initManually(defaultConfig) {
    for(let i in defaultConfig) {
        console.log(`${i}:`);
        process.stdin.resume();
        yield ;
    }
}

/**
 * init Config file
 */
program
    .command("init")
    .description("init Config file")
    .option("-y --yes", "Config default", () => {
        let defaultConfig = {
            rootPath: "",
            filePath:[{
                floder: "",
                file: []
            }],
            destFloder: ""
        }
        
        fs.writeFile('filesConfig.json', JSON.stringify(defaultConfig), (err) => {
            if(err) {
                throw err;
            }

             console.log('init success!');
        });
    })
    .action( () => {
        /**
         * @commander: thunder init
         * @description: this is a expermental commander
         */
        if(process.argv[3].indexOf('--yes') == -1|| process.argv[3].indexOf('-y') == -1) {
             /**
             * config congileFile maturally
             */
            let defaultConfig = {
                rootPath: "",
                filePath:[{
                    floder: "",
                    file: []
                }],
                destFloder: ""
            }

            let _initManuallyGen =  _initManually(defaultConfig);

            process.stdin.on('data', (data) => {
                console.log(_initManuallyGen.next());
                if( _initManuallyGen.next().done) {
                    _initManuallyGen.return();
                }

                _initManuallyGen.next();
            })
        }
    });

program
    .on("command:*", function() {
        console.error("Invalid command $s\n Type --help for a list of command", process.argv.join(''));
        process.exit(1);
    });

program.parse(process.argv);