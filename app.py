import flask
#from flask_pymongo import PyMongo

import pymongo
from pymongo import MongoClient
import json

from flask import Flask
from flask import render_template
from flask import request
from flask import jsonify
app = Flask(__name__)

#This is to connect to the database on python flask

client = MongoClient()

db = client['test_db']

chars = db['Characters']

#may want to rename in the future from posts to something else
#or I could just use "collection"
posts = db.posts

@app.route("/")
def hello():
    return "Welcome to Python Flask!"

@app.route("/signUp") 
def signUp():
    return render_template('signUp.html')

@app.route('/signUpUser', methods=['POST'])
def signUpUser():
    user =  request.form['username'];
    password = request.form['password'];
    return json.dumps({'status':'OK','user':user,'pass':password});

@app.route("/DBtest")
def DBtest():
    return render_template("buttontest.html")

@app.route("/DBtest/getone/", methods=['POST'])
def getOne():

    name = request.form["name1"]
    dude = chars.find_one({"name":name},{"_id":0})
    
    #need fail case for when you can't dude
    
    return jsonify(dude)

@app.route("/DBtest/gettwo/", methods=['POST'])
def getTwo():

    name = request.form["name2"]
    dude = chars.find_one({"name":name},{"_id":0})
    
    #need fail case for when you can't dude
    
    return jsonify(dude)

@app.route("/DBtestLoad", methods=['GET'])
def DBtestLoad():
    #finds the names of all entries
    alldudes = chars.find(None,{"_id":0})

    namelist = []
    
    #shownames = '<select name="characters">'
    for dude in alldudes:
        name = dude["name"]
        namelist.append(name)
        #shownames += '<option value="' + name + '">'
        #shownames += name + "</option>"

    #shownames += "</select>"
    count = alldudes.retrieved
    #if count == 0:
        #shownames = ""
    
    return jsonify(names=namelist, count=count)

#Button should try to grab data from database and pass it to front end

@app.route("/DBtestButton")
def DBtestButton():
    #finds the names of all entries
    alldudes = chars.find(None,{"_id":0})

    namelist = []
    
    #shownames = '<select name="characters">'
    for dude in alldudes:
        name = dude["name"]
        namelist.append(name)
        #shownames += '<option value="' + name + '">'
        #shownames += name + "</option>"

    #shownames += "</select>"
    count = alldudes.retrieved
    #if count == 0:
        #shownames = ""
    
    return jsonify(names=namelist, count=count)

@app.route('/addchar/')
def addchar_load():
    return render_template("addchar.html")

@app.route('/addchar/add/', methods=["POST"])
def addchar():
    charinfo = request.form
    post = {}
    for info in charinfo:
        print(info)
        print(charinfo[info])
        post[info] = charinfo[info]

    chars.insert_one(post)

    return jsonify(charinfo)


if __name__ == "__main__":
    app.debug = True
    app.run()
