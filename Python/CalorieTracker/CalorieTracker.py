#Tanish Shah
from mongoengine import *
import datetime
import matplotlib
import matplotlib.pyplot as plt

#connect to db
connect("Nutritack")

#user and entry classes, collections in db
class User(Document):
    username = StringField(unique=True, required=True)
    password = StringField(required=True)
    email = EmailField(unique=True, required=True)
    meta = {
        "indexes":["username", "email"]
    }

class Entry(Document):
    person = ReferenceField(User)
    calories = IntField()
    food = StringField()
    date = StringField()

    meta = {
        "indexes":["person", "food", "calories", "date"]
    }

#Functions

#make account
def createAccount():
    uname = input("Please enter your username ")
    email = input("Please enter your email ")
    pwd = input("Please enter your password ")
    user = User(
        username = uname,
        email = email,
        password = pwd
    ).save()

#getting the name
def getName():
    name = input("Please enter you username")
    pas = input("Please enter your password ")
    user = User.objects(username =name, password = pas ).get()
    return user

#making an entry
def makeEntry():
    foo = input("Please enter what you ate ")
    calo = int(input("Please enter how many calories the food was "))
    entry = Entry(
        calories = calo,
        person = pers,
        date = str(datetime.datetime.now()) ,
        food = foo
    ).save()


#viewing entries
def viewEntries():
    entries = Entry.objects(person = pers)
    cals = []
    dates = []
    for item in entries:
        print(item.food, " ", item.calories, " ",item.date)
        cals.append(item.calories)
        dates.append(item.date)
    graph = input("Would you like to see your progress? [Y/N] ").upper()
    if graph == "Y":
        print("For the optimal experience, make the graph full screen.")
        if len(dates) > 1:
            plt.plot(dates,cals)
            plt.gcf().autofmt_xdate()
            plt.title("Your Calorie Tracker!", fontsize = 18)
            plt.xlabel('Dates', fontsize=14)
            plt.ylabel('Calories', fontsize=14)
            plt.show()
        elif len(dates) == 1:
            plt.scatter(dates[0], cals[0])
            plt.gcf().autofmt_xdate()
        
            plt.show()
        else:
            print("Sorry you have no entries!")


#deleting entries
def delEntries():
    dele = input("What food item would you like to delete? ")
    Entry.objects(food=dele, person=pers).delete()

#updating entries
def updEntries():
    update = input("What food item would you like to change? ")
    change = int(input("Enter the new number of calories. "))
    Entry.objects(food = update).update(calories = change)

#introduction
print("Welcome to Nutritrack!")
reg = input("Do you have an account? [Y/N]").upper()

if reg == "N":
    mac = input("Would you like to make an account? [Y/N] ")
    if mac == "Y":
        createAccount()
        print("To make an entry please close restart the terminal. Thank You! ")
elif reg =="Y":
    valid = True
    try:
        pers = getName()
    except DoesNotExist:
        print("Invalid username and/or password.")
        valid = False
    if valid == True:
        ender = False
        while ender == False:
            cont = input("What would you like to do? [M]ake an entry? [V]iew your existing entries? [U]pdate an existing entry? [D]elete an existing entry? [E]xit?").upper()
            if cont == "M":
                makeEntry()
            elif cont == "V":
                viewEntries()
            elif cont == "D":
                delEntries()
            elif cont == "U":
                updEntries()
            elif cont == "E":
                ender = True
            else:
                print("Sorry. You did not enter a valid input. Please try again ")
else:
    print("Sorry. You did not enter a valid input. Please try again ")

print("Thank you for using Nutritrack!")
