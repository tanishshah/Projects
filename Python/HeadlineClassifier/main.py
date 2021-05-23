#imports
import nltk
import pandas as pd
import string
import re
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import KFold, cross_val_score

#read the data
data = pd.read_table("sample.txt",sep="\t", header=None)
data.columns = ["label", "headline"] #give the data frame columns
#print(data.head()) #check data to make sure its good
#print(data.tail())

#clean up the data
#remove punctuation
clean = []
lens = []
caps = []
for headline in data["headline"]:
    line = ""
    for character in headline:
        if character not in string.punctuation:
            line = line+character
    #tokenize the data (i.e break the sentence into words)
    line = re.split("\W+", line) #split on one or more non letter
    #get rid of unnecessary words using stopwords from nltk
    stopwords = nltk.corpus.stopwords.words("english")
    sLine = []
    for word in line:
        if word.lower() not in stopwords: #stopwords only has lower
            sLine.append(word.lower())
    #lemmatize
    lemmatizer = nltk.WordNetLemmatizer()
    lLine = ""
    for word in sLine:
        lLine = lLine + " " + lemmatizer.lemmatize(word)
    clean.append(lLine.strip())
    #features
    count = 0
    ucount = 0
    acount = 0
    for character in headline:
        if character.isalnum():
            count = count + 1
        if character.isupper():
            ucount = ucount + 1
    lens.append(count)
    caps.append(ucount)

#print(clean[0]) #checks
#print(clean[1])

#vectorize the data
vectorizer = TfidfVectorizer()
vectored = vectorizer.fit_transform(clean)
#print(vectored.shape) checks

#prep the data for the model
X = pd.DataFrame(vectored.toarray())
#add the features (caps makes a huge difference)
X["length"] = lens
X["caps"] = caps
#print(X.head()) check
randomForest = RandomForestClassifier(n_jobs=-1)
kFold = KFold(n_splits=8)
s = cross_val_score(randomForest, X, data['label'], cv=kFold, scoring="accuracy",n_jobs=-1)
#print(s) view the individual accuracies

n = 0
for num in s:
    n = n + num
#accuracy tends to be in the mid ninties based on the random split
print(n/8)
