#Tanish Shah
#Code for Python Telegram Bot

#imports
from telegram.ext import Updater, CommandHandler, CallbackQueryHandler
from telegram import *
from bs4 import BeautifulSoup
import requests
import random

updater = Updater(token='Your ID here', use_context=True)

#intro function
def start(update, context):
    context.bot.send_message(chat_id=update.effective_chat.id, text=
                             "Hi there!" + "\n"
                             "You can interact with me using the following commands: " + "\n"
                             "/hello -> This command sends you a greeting\n"
                             "/news  -> This command allows you to access news headlines\n"
                             "/joke  -> This command will tell you a joke\n"
                             "/quote -> This command will tell you an inspirational quote\n"
                             "/music -> This command will give you a song recommendaton \n"
                             "/contact -> This command will give you my contact info",)
#Talk to the bot
def hello(update, context):
    context.bot.sendMessage(chat_id=update.message.chat_id, text="Hello there! I hope you have a wonderful day!")
    
#used for music and quotes, can't use for jokes as it keeps text in <p>
def items(results):
    items = []
    for r in results:
        items.append(r.text)
    x = random.randint(0, len(items)-1)
    return items[x]
  
#get a joke
def joke(update,context):
    try:
        req = requests.get("https://www.readersdigest.ca/culture/funny-jokes-national-tell-joke-day/")
        soup = BeautifulSoup(req.text, 'html.parser')
        results = soup.findAll("div", {"class": "listicle-page"})
        jokes = []
        for r in results:
           jokes.append(r.find('p').text)
        x = random.randint(0, len(jokes) - 1)
        context.bot.send_message(chat_id=update.effective_chat.id, text=jokes[x])

    except requests.exceptions.RequestException as e:
        context.bot.sendMessage(chat_id=update.message.chat_id, text="An error occured, please try again. If the error persists please contact me.")

#get a motivational quote
def quote(update,context):
    try:
        y = str(random.randint(0,90))
        req = requests.get("https://www.goodreads.com/quotes/tag/inspirational-life?page=" + y)
        soup = BeautifulSoup(req.text, 'html.parser')
        results = soup.findAll("div", {"class": "quoteText"})
        quote = items(results)
        context.bot.send_message(chat_id=update.effective_chat.id, text=quote)
    except requests.exceptions.RequestException as e:
        context.bot.sendMessage(chat_id=update.message.chat_id, text="An error occured, please try again. If the error persists please contact me.")

#get a song suggestions
def music(update,context):
    try:
        req = requests.get("https://open.spotify.com/playlist/37i9dQZF1DX5DfG8gQdC3F")
        soup = BeautifulSoup(req.text, 'html.parser')
        results = soup.findAll("span", {"class": "track-name"})
        music = items(results)
        context.bot.send_message(chat_id=update.effective_chat.id, text=music)
    except requests.exceptions.RequestException as e:
        context.bot.sendMessage(chat_id=update.message.chat_id, text="An error occured, please try again. If the error persists please contact me.")

#news headlines
#get the users choice for the type of news they want
def news(update, context):
    keyboard = [[InlineKeyboardButton("Federal News", callback_data='1'),
                 InlineKeyboardButton("Provincial News", callback_data='2')],
                [InlineKeyboardButton("World News", callback_data='3')]]
    reply_markup = InlineKeyboardMarkup(keyboard)
    update.message.reply_text('Please choose:', reply_markup=reply_markup)

#give the user the type of news they select
def button(update, context):
    query = update.callback_query
    query.answer()
    entry = str(query.data)
    cont = False
    if entry == "1":
        site = "https://globalnews.ca/canada/"
        cont = True
    elif entry =="2":
        site = "https://globalnews.ca/bc/"
        cont = True
    elif entry == "3":
        site = "https://globalnews.ca/world/"
        cont = True
    else:
        context.bot.send_message(chat_id=update.effective_chat.id, text="The entry was invalid. Please try again.")
    if cont == True:
        try:
            req = requests.get(site)
            soup = BeautifulSoup(req.text, 'html.parser')
            results = soup.findAll("div", {"class": "c-posts__headline"})
            num = 0
            for r in results:
                if r.text[0] in "ABCDEFGHIJKLIMNOPQRSTUVWXYZ" and num < 3:
                    context.bot.send_message(chat_id=update.effective_chat.id, text=r.text)
                    num = num + 1
        except requests.exceptions.RequestException as e:
            context.bot.sendMessage(chat_id=update.message.chat_id, text="An error occured, please try again. If the error persists please contact me.")

#function give the user my contact information
def contact(update, context):
    context.bot.sendMessage(chat_id=update.message.chat_id, text="Email me: tanish01@gmail.com")
    context.bot.sendMessage(chat_id=update.message.chat_id, text="Website: tanishshah.github.io")

#set up handlers
start_handler = CommandHandler('start', start)
hello_handler = CommandHandler('hello', hello)
news_handler = CommandHandler('news',news)
joke_handler = CommandHandler('joke',joke)
quote_handler = CommandHandler('quote',quote)
music_handler = CommandHandler('music', music)
contact_handler = CommandHandler('contact', contact)

#add handlers
dispatcher = updater.dispatcher
dispatcher.add_handler(start_handler)
dispatcher.add_handler(hello_handler)
dispatcher.add_handler(news_handler)
dispatcher.add_handler(joke_handler)
dispatcher.add_handler(quote_handler)
dispatcher.add_handler(music_handler)
dispatcher.add_handler(contact_handler)
dispatcher.add_handler(CallbackQueryHandler(button))
updater.start_polling()
