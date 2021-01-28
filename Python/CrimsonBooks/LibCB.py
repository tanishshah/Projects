#Tanish Shah
#CrimsonBooks

#imports
import mongoengine
import datetime
from mongoengine import *

#connect to the database
'''
def connectToDB():
    client = youur db here
    connect(host=client)
'''
#Class for users
class User(Document):
    username = StringField(unique=True, required=True)
    password = StringField(required=True)
    email = EmailField(unique=True, required=True)
    meta = {
        "indexes":["username", "email"]
    }

#class for books
class Book(Document):
    title = StringField(max_length=50, required=True)
    author = StringField(max_length=200, required=True)
    genres = ListField(StringField(max_length = 10),reqiured = False)
    creator = StringField(max_length = 50,required = True)
    myList = ListField(StringField(max_length=50),required = False)
    dat = DateTimeField(default=datetime.datetime.utcnow)
    meta = {
        "indexes":['title','author','genres','myList','creator']
    }

#comments class
class Comments(Document):
    comm = StringField(max_length=150,required=True)
    dat = DateTimeField(default=datetime.datetime.utcnow)
    book = StringField(max_length=50, required=True)
    poster = StringField(max_length=50,required=True)
    mega = {
        "indexes":['comm','book','poster']
    }

#Creating a user
def createAccount():
    uname = input("Please enter your username ")
    email = input("Please enter your email ")
    pwd = input("Please enter your password ")
    user = User(
        username = uname,
        email = email,
        password = pwd
    ).save()

#--Functions for books--
#creating a book
def createBook(User):
    t = input("Please enter the name of the book ")
    a = input("Please enter the author ")
    y = input("Do you know the genres of this book? [Y/N] ").upper()
    u = []
    while y == "Y":
        u.append(input("what is the genre? "))
        y =input("Are there more genres? [Y/N] ").upper()
    book = Book( 
        title = t,
        author = a,
        genres = u,
        creator = User.username
    ).save()

#find all books 
def findBooks():
    books = Book.objects()
    for item in books:
        print(item.title, " ", item.author)

#Do this one once you understand how they fit together
#def updateBook():

#delete books
def delBook(User):
    dele = input("What book would you like to delete? ")
    if Book.objects(creator=User.username):
        Book.objects(title=dele).delete()
    else:
        print("you did not create the book so you can't delete it")

#==Functions for comments--
#create comment
def createComment(User):
    b = input("Enter your the book title ")
    c = input("Enter your comment ")
    co = Comments(
        comm = c,
        book = b,
        poster = User.username
    ).save()

def viewComments():
    b = input("Enter the title of the book ")
    c = Comments.objects(book = b)
    for item in c:
        print(item.comm)

def viewMyComments(User):
    c = Comments.objects(poster=User.username)
    for item in c:
        print(item.comm)

#have to think about this because someone could have multiple comments for one book
#def updateMyComment(user):
#def deleteMyComment(user,comment) pass it the comment to delete from pressing a button or smthing

#--Other functions--
#user validation
def getName():
    name = input("Please enter you username")
    pas = input("Please enter your password ")
    user = User.objects(username =name, password = pas).get()
    return user

#--Functions for genres--
#updating genre
def addGenre():
    t = input("Enter the title of the book (case sensitive) ")
    u = input("Enter the genre this book is used in ")
    Book.objects(title = t).update(add_to_set__genres=u)

#find by school
def findByGenres():
    g = input("what genre are you looking for? ")
    bs = Book.objects(genres = g)
    for item in bs:
        print(item.title, " ", item.author)
#remove a genre
def deleteGenre():
    b = input("what book would you like to remove ")
    g = input("what genre would you like to remove ")
    Book.objects(title = b).update(pull__genres=g)   

#--Functions for myList--
#add name to reading list
def addList(User):
    t = input("Enter the title of the book (case sensitive) ")
    Book.objects(title = t).update(add_to_set__myList=User.username)

#get books in reading list of user
def getMyList(User):
    books = Book.objects(myList = User.username)
    for item in books:
        print(item.title, " ", item.author) 

#removing a name from the reading list
def deleteMyList(User):
    b = input("what book would you like to remove ")
    Book.objects(title = b).update(pull__myList=User.username)

#Testing
