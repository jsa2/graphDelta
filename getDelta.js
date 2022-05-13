

const { default: axios } = require('axios')
const {exec} =require('child_process')
const { writeFileSync, readFileSync } = require('fs')
const {argv} = require('yargs')
const { graphList } = require('./src/graph')
const wexc = require('util').promisify(exec)
const beautify = require('js-beautify').js


main()
async function main () {

    try {
        require('./accepted.json').value.find(entity => entity.name.toLowerCase() == argv.type.toLowerCase() )} catch(error) {

        console.log(`missing proper argument for --type=${argv.type}, example: node getDelta.js --type=applications`)
        return;
    } 
    

    let {stdout} = await wexc('az account get-access-token --scope=https://graph.microsoft.com/Directory.AccessAsUser.All --query accessToken --output json')


    let at 
        try {
        at = JSON.parse(stdout)
        //console.log(at)
        } catch(error) {
            console.log(error)
        }

       let rC = {
           delta:"",
           data:[]
        }

       let url = `https://graph.microsoft.com/v1.0/${argv.type}/delta`

       try {
           url = JSON.parse(readFileSync(`delta/${argv.type}.json`))?.delta
       } catch(error) {
        console.log('no existing deltaLink')
       }

       await graphList(at,url,undefined,rC)

       if (rC?.data.length > 0) {
        writeFileSync(`delta/${argv.type}.json`, beautify(JSON.stringify(rC),{ indent_size: 2, space_in_empty_paren: true }))
        console.log(rC?.data.length)
       } else {
           console.log('no changes')
       }
     
     
    
}

