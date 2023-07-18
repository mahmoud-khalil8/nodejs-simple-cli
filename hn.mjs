#!/usr/bin/env node
import open from 'open'
import fetch from 'node-fetch'
import yargs from 'yargs'

const {argv}=yargs(process.argv);
const res=await fetch('https://hacker-news.firebaseio.com/v0/topstories.json');
const data =await res.json();
const postId=data[Math.floor(Math.random()*data.length)] ;
fetch(`https://hacker-news.firebaseio.com/v0/item/${postId}.json`)
  .then(response => response.json())
  .then(data => {
    const link = data.url;
    if (argv.print){
        console.log (data.title);
    }
    else {open(data.url);}
  })
