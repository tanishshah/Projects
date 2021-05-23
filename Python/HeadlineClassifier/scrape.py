#An example of how the data was collected -> similar approach used for onion

#imports
from bs4 import BeautifulSoup
import requests

i  = 1
#get the data
for i in range(200):
    #make the requests
    req = requests.get("https://www.pbs.org/newshour/politics/page/" + str(i))
    print(req.status_code)
    #parse the html
    soup = BeautifulSoup(req.text, 'html.parser')
    results = soup.findAll("a", {"class": "card-horiz__title"})
    #write the contents
    with open("test.txt", "a") as f:
        for r in results:
            r = str(r.get_text()).lstrip()
            f.write("Real" + "\t" + r + "\n" )

