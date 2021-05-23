#An example of checking the features to see if they are relevant or not

#imports
import pandas as pd
import numpy as np
from matplotlib import pyplot as plt


#read the data
data = pd.read_table("sample.txt",sep="\t", header=None)
data.columns = ["label", "headline"] #give the data frame columns

#features
#length of useful things, letters/nums
#num captials, onion headlines appear to use capitals more frequently

#examining the length of the headlines
lens = []
caps = []
#apos = []

#getting the data
for headline in data["headline"]:
    count = 0
    ucount = 0
    #acount = 0
    for character in headline:
        if character.isalnum():
            count = count + 1
        if character.isupper():
            ucount = ucount + 1
    lens.append(count)
    caps.append(ucount)

#plotting the results
plt.hist(lens[0:799],np.linspace(0,180,50),density=True, label="Onion")
plt.hist(lens[800:],np.linspace(0,180,50),density=True, label="PBS")
plt.legend(loc = "upper right")
plt.suptitle('Aplhanumeric characters in headlines', fontsize=20)
plt.xlabel('Number of alphanumeric characters', fontsize=14)
plt.ylabel('Frequency', fontsize=14)
plt.show()



