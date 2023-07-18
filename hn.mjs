#!/usr/bin/env node
import chalk from 'chalk'
import open from 'open'
import fetch from 'node-fetch'
import yargs from 'yargs'
import inquirer from 'inquirer'
function f(){
  console.log('..⏳')
}
const {argv}=yargs(process.argv);
const res=await fetch('https://hacker-news.firebaseio.com/v0/topstories.json');
const data =await res.json();
const postId=data[Math.floor(Math.random()*data.length)] ;
fetch(`https://hacker-news.firebaseio.com/v0/item/${postId}.json`)
  .then(response => response.json())
  .then(data => {
    const link = data.url;
    if (argv.print){
        console.log (chalk.bgRed(data.title));

          const answer = inquirer.prompt({
            name:'q1',
            type:'list' ,
            message:'do you want to take the url',
            choices:[
              'yes',
              'no',
            ],
          }).then((answers) => {
            if (answers.q1 === 'yes') {
              console.log(link);
            }
          }) ;
    }
    else {open(data.url);}
  })
