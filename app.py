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
moves = db['Moves']

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

@app.route("/getmoveinfo/", methods=['POST'])
def getmoveinfo():

    minput = request.form["move1"]
    move = moves.find_one({"input":minput},{"_id":0,"name":0})

    return jsonify(move)

@app.route("/getmoveinfo2/", methods=['POST'])
def getmoveinfo2():

    minput = request.form["move2"]
    move = moves.find_one({"input":minput},{"_id":0,"name":0})

    return jsonify(move)

@app.route("/DBtestLoad", methods=['GET'])
def DBtestLoad():
    #finds the names of all entries
    alldudes = chars.find(None,{"_id":0}).sort("name")

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

@app.route("/loadmoves/", methods=['POST'])
def loadmoves():
    
    name = request.form["name1"]
    
    allmoves = moves.find({"name":name},{"_id":0}).sort("input")

    movelist = []
    
    #shownames = '<select name="characters">'
    for move in allmoves:
        minput = move["input"]
        movelist.append(minput)
        #shownames += '<option value="' + name + '">'
        #shownames += name + "</option>"

    #shownames += "</select>"
    count = allmoves.retrieved
    #if count == 0:
        #shownames = ""
    
    return jsonify(moves=movelist, count=count)

@app.route("/loadmoves2/", methods=['POST'])
def loadmoves2():
    
    name = request.form["name2"]
    
    allmoves = moves.find({"name":name},{"_id":0}).sort("input")

    movelist = []
    
    #shownames = '<select name="characters">'
    for move in allmoves:
        minput = move["input"]
        movelist.append(minput)
        #shownames += '<option value="' + name + '">'
        #shownames += name + "</option>"

    #shownames += "</select>"
    count = allmoves.retrieved
    #if count == 0:
        #shownames = ""
    
    return jsonify(moves=movelist, count=count)

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

@app.route('/addmove/')
def addmove_load():
    return render_template("addmove.html")

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

@app.route('/addmove/add/', methods=["POST"])
def addmove():
    moveinfo = request.form
    post = {}
    for info in moveinfo:
        print(info)
        print(moveinfo[info])
        post[info] = moveinfo[info]

    moves.insert_one(post)

    return jsonify(moveinfo)

@app.route('/editchar/', methods=["GET","POST"])
def editchar_load():
    return render_template("editchar.html")

@app.route('/editchoose/', methods=["POST"])
def editchoose():
    print(request)

    test = request.form
    name = test['undefined']
    
    print(test)
    print(name)

    dude = chars.find_one({"name":name},{"_id":0,"name":0})

    return jsonify(dude)

@app.route('/editsubmit/', methods=["POST"])
def editsubmit():
    charinfo = request.form
    post = {}
    for info in charinfo:
        print(info)
        print(charinfo[info])
        post[info] = charinfo[info]

    name = post['name']
    print(name)

    edit = chars.find_one_and_update({"name":name},{"$set":post})
        
    return "abc"

@app.route('/testdelete/')
def testdelete():
    return render_template("testdelete.html")

@app.route('/deldbentry/',methods=["POST"])
def deletefromdb():
    print(request)

    test = request.form
    name = test['undefined']
    
    print(test)
    print(name)

    myquery = {"name":name}

    chars.delete_one(myquery)

    message = "Deleted " + name + " from database"

    return message

if __name__ == "__main__":
    app.debug = True
    app.run()
